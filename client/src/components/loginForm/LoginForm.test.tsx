import React, { act } from 'react';
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
    (useAuth as jest.Mock).mockReturnValue({
      userLoggedIn: false,
      currentUser: null,
      loading: false
    });
    act(() => { 
      render(
        <Router>
          <LoginForm />
        </Router>
      );
    });

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    // expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    // expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();
  });
})