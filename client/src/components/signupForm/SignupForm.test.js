import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
//import SignupForm from './SignupForm';
import { doCreateUserWithEmailAndPassword } from '../../firebase/auth';

jest.mock('../../firebase/auth');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('SignupForm', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
  });

  test('renders the form', () => {
    render(
      <MemoryRouter>
        <SignupForm />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Continue')).toBeInTheDocument();
    expect(screen.getByText('Already have an account?')).toBeInTheDocument();
  });

  test('submits the form with valid email and password', async () => {
    const mockEmail = 'test@example.com';
    const mockPassword = 'password123';
    doCreateUserWithEmailAndPassword.mockResolvedValue();

    render(
      <MemoryRouter>
        <SignupForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: mockEmail } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: mockPassword } });
    fireEvent.click(screen.getByText('Continue'));

    await waitFor(() => expect(doCreateUserWithEmailAndPassword).toHaveBeenCalledWith(mockEmail, mockPassword));
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/home'));
  });

  test('displays error message on failed submission', async () => {
    const mockEmail = 'test@example.com';
    const mockPassword = 'password123';
    const errorMessage = 'Error creating user';
    doCreateUserWithEmailAndPassword.mockRejectedValue(new Error(errorMessage));

    render(
      <MemoryRouter>
        <SignupForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: mockEmail } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: mockPassword } });
    fireEvent.click(screen.getByText('Continue'));

    await waitFor(() => expect(doCreateUserWithEmailAndPassword).toHaveBeenCalledWith(mockEmail, mockPassword));
    await waitFor(() => expect(window.alert).toHaveBeenCalledWith(errorMessage));
  });

  test('prevents submission if already signing up', async () => {
    const mockEmail = 'test@example.com';
    const mockPassword = 'password123';
    doCreateUserWithEmailAndPassword.mockResolvedValue();

    render(
      <MemoryRouter>
        <SignupForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: mockEmail } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: mockPassword } });
    fireEvent.click(screen.getByText('Continue'));
    fireEvent.click(screen.getByText('Continue'));

    await waitFor(() => expect(doCreateUserWithEmailAndPassword).toHaveBeenCalledTimes(1));
  });
});

