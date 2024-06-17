import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import SignupForm from '../../../src/components/signupForm/SignupForm';
import { doCreateUserWithEmailAndPassword } from '../../../src/firebase/auth';

vi.mock('../../../src/firebase/auth', () => ({
  doCreateUserWithEmailAndPassword: vi.fn(),
}));

describe('SignupForm', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('Renders the signup form', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <SignupForm />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Create an account/i)).toBeInTheDocument();
  });

  it('Calls the sign-up function with email and password', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <SignupForm />
      </MemoryRouter>
    );

    userEvent.type(screen.getByPlaceholderText(/Email/i), 'test@example.com');
    userEvent.type(screen.getByPlaceholderText(/Password/i), 'password123');
    userEvent.click(screen.getByText(/Continue/i));

    expect(doCreateUserWithEmailAndPassword).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(doCreateUserWithEmailAndPassword).toHaveBeenCalledTimes(1); 
  });

  it('Shows an error message if sign-up fails', async () => {
    const mockDoCreateUserWithEmailAndPassword = vi.mocked(doCreateUserWithEmailAndPassword);
    mockDoCreateUserWithEmailAndPassword.mockRejectedValueOnce(new Error('Sign-up failed'));

    render(
      <MemoryRouter initialEntries={['/']}>
        <SignupForm />
      </MemoryRouter>
    );

    userEvent.type(screen.getByPlaceholderText(/Email/i), 'test@example.com');
    userEvent.type(screen.getByPlaceholderText(/Password/i), 'password123');
    userEvent.click(screen.getByText(/Continue/i));

    const alertMessage = await screen.findByText('Sign-up failed');
    expect(alertMessage).toBeInTheDocument();
    expect(mockDoCreateUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });
});
