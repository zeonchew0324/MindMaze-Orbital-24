import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { afterAll, vi } from "vitest";
import userEvent from '@testing-library/user-event';
import { doSignInWithEmailAndPassword } from '../../../src/firebase/auth';
import LoginPage from '../../../src/pages/loginPage/LoginPage';
import LoginForm from '../../../src/components/loginForm/LoginForm';
import SignupPage from '../../../src/pages/signupPage/SignupPage';
import ResetPasswordPage from '../../../src/pages/resetPasswordPage/ResetPasswordPage';

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

const { mockNavigate } = vi.hoisted(() => {
  return { mockNavigate: vi.fn() }
})
vi.mock('react-router-dom', async (importOriginal) => {
  const actual: Record<string, any> = await importOriginal()
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Login', () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Routes>
      </MemoryRouter>
    );
  });

  afterAll(() => {
    vi.clearAllMocks()
  })

  it('Renders the login form', () => {
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();
  });

  it('Renders the title', () => {
    expect(screen.getByText(/MindMaze/i)).toBeInTheDocument()
  });

  it('Renders the links', () => {
    const signUpLink = screen.getByRole('link', { name: /sign up/i });
    const resetPasswordLink = screen.getByRole('link', { name: /reset password/i });
    expect(screen.getByText(/Sign up/i)).toBeInTheDocument();
    expect(screen.getByText(/Reset Password/i)).toBeInTheDocument();
    expect(signUpLink).toBeInTheDocument();
    expect(resetPasswordLink).toBeInTheDocument();
  })

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

  it('Redirects to Sign up', () => {
    const signUpLink = screen.getByRole('link', { name: /sign up/i });
    userEvent.click(signUpLink);
  
    expect(screen.getByText(/Create an account/i)).toBeInTheDocument();
  });

  it('Redirects to Reset Password', () => {
    const resetPasswordLink = screen.getByRole('link', { name: /reset password/i });
    userEvent.click(resetPasswordLink);
  
    expect(screen.getByText(/Reset your password/i)).toBeInTheDocument();
  });
});