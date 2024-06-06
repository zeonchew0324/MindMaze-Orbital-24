import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import LoginForm from '../../../src/components/loginForm/LoginForm';
import { vi } from "vitest";
import userEvent from '@testing-library/user-event';
import { doSignInWithEmailAndPassword } from '../../../src/firebase/auth';

vi.mock("../../../src/contexts/AuthProvider", () => {
  return {
    default: () => ({
      useAuth: vi.fn(() => {
        return {
          userLoggedIn: false,
          currentUser: null,
          loading: false,
          token: '',
        }
      }),
    }),
  };
});

describe('LoginForm', () => {
  beforeEach(() => {
    render(
      (
        <LoginForm />
      ), 
      {
        wrapper: ({children}) => (
          <MemoryRouter initialEntries={["/"]}>
            {children}
          </MemoryRouter>
     ),
   });
  });

  afterAll(() => {
    vi.clearAllMocks()
  })

  it('Renders the login form', () => {
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();
  });

  it('Calls the sign-in function with email and password', async () => {
    vi.mock('../../../src/firebase/auth', () => ({
      doSignInWithEmailAndPassword: vi.fn(),
    }));
    
    userEvent.type(screen.getByPlaceholderText(/Email/i), 'test@example.com');
    userEvent.type(screen.getByPlaceholderText(/Password/i), 'password123');
    userEvent.click(screen.getByText(/Login/i));

    await screen.findByText(/Welcome Back/i);

    expect(doSignInWithEmailAndPassword).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(doSignInWithEmailAndPassword).toHaveBeenCalledTimes(1); 
  });
});