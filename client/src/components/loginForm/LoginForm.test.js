import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginForm from './LoginForm';
import { doSignInWithEmailAndPassword } from '../../firebase/auth';
import { useAuth } from '../../contexts/AuthProvider';

jest.mock('../../firebase/auth');
jest.mock('../../contexts/AuthProvider');

describe('LoginForm', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders the login form', () => {
    useAuth.mockReturnValue({ userLoggedIn: false });
    render(
      <Router>
        <LoginForm />
      </Router>
    );

    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();
  });

  it('calls the sign-in function with email and password', async () => {
    useAuth.mockReturnValue({ userLoggedIn: false });
    const mockSignIn = doSignInWithEmailAndPassword.mockResolvedValueOnce();

    render(
      <Router>
        <LoginForm />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText(/Login/i));

    expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  it('navigates to home on successful sign-in', async () => {
    useAuth.mockReturnValue({ userLoggedIn: false });
    doSignInWithEmailAndPassword.mockResolvedValueOnce();

    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate,
    }));

    render(
      <Router>
        <LoginForm />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText(/Login/i));

    expect(await screen.findByText(/Welcome Back/i)).toBeInTheDocument();
    expect(mockNavigate).toHaveBeenCalledWith('/home');
  });

  it('shows an error message on sign-in failure', async () => {
    useAuth.mockReturnValue({ userLoggedIn: false });
    const errorMessage = 'Invalid credentials';
    doSignInWithEmailAndPassword.mockRejectedValueOnce(new Error(errorMessage));

    render(
      <Router>
        <LoginForm />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText(/Login/i));

    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
  });
});
