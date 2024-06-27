import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import ProfilePage from '../../src/pages/profilePage/ProfilePage';
import { getCurrentUser, updateUsername, doPasswordChange, deleteAccount, getMazeCompleted } from '../../src/firebase/auth';

// Mock the functions from firebase/auth
vi.mock('../../src/firebase/auth', () => ({
  getCurrentUser: vi.fn(),
  updateUsername: vi.fn(),
  doPasswordChange: vi.fn(),
  deleteAccount: vi.fn(),
  getMazeCompleted: vi.fn(),
}));

describe('ProfilePage', () => {
  //create fake user
  const mockUser = { displayName: 'Central Cee', email: 'central@example.com' };

  beforeEach(() => {
    // Mock return values for the async functions
    (getCurrentUser as vi.Mock).mockReturnValue(mockUser);
    (getMazeCompleted as vi.Mock).mockResolvedValue(0); 
    vi.clearAllMocks();
  });

  it('renders the profile page with user data', async () => {
    render(<ProfilePage />);

    // Wait for the user data to be fetched and displayed
    await waitFor(() => expect(screen.getByText('Profile Info')).toBeInTheDocument());
    expect(screen.getByText('Username: Central Cee')).toBeInTheDocument();
    expect(screen.getByText('Mazes Completed: 0')).toBeInTheDocument();
  });

  it('updates username when "changes username" button is clicked', async () => {
    render(<ProfilePage />);

    // Show the username input
    fireEvent.click(screen.getByText('Change Username'));

    // Change the username
    fireEvent.change(screen.getByPlaceholderText('New Username'), { target: { value: 'Central Doe' } });

    // Mock the updateUsername function to resolve successfully
    (updateUsername as vi.Mock).mockResolvedValueOnce(undefined);

    // Click "Save" button
    fireEvent.click(screen.getByText('Save'));

    // Wait for the username to be updated
    await waitFor(() => expect(screen.getByText('Username updated successfully')).toBeInTheDocument());

    // Verify that updateUsername was called with the correct argument
    expect(updateUsername).toHaveBeenCalledWith('Central Doe');

    // Verify that the new username is displayed
    expect(screen.getByText('Username: Central Doe')).toBeInTheDocument();
  });

  it('changes the password when "change password" button is clicked', async () => {
    render(<ProfilePage />);

    // Show the password input
    fireEvent.click(screen.getByText('Change Password'));

    // Change the password
    fireEvent.change(screen.getByPlaceholderText('New Password'), { target: { value: 'newpassword123' } });

    // Mock the doPasswordChange function to resolve successfully
    (doPasswordChange as vi.Mock).mockResolvedValueOnce(undefined);

    // Click "Save" button
    fireEvent.click(screen.getByText('Save'));

    // Wait for the password to be updated
    await waitFor(() => expect(screen.getByText('Password changed successfully')).toBeInTheDocument());

    // Verify that doPasswordChange was called with the correct argument
    expect(doPasswordChange).toHaveBeenCalledWith('newpassword123');
  });

  it('deletes the account when "Delete Account" button is clicked', async () => {
    render(<ProfilePage />);

    // Mock the deleteAccount function to resolve successfully
    (deleteAccount as vi.Mock).mockResolvedValueOnce(undefined);

    // Click "Delete Account" button
    fireEvent.click(screen.getByText('Delete Account'));

    // Wait for the account to be deleted
    await waitFor(() => expect(screen.getByText('Account deleted successfully')).toBeInTheDocument());

    // Verify that deleteAccount was called
    expect(deleteAccount).toHaveBeenCalled();
  });
});
