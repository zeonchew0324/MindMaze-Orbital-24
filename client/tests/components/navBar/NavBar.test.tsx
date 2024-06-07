import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import NavBar from '../../../src/components/navBar/NavBar';

describe('NavBar', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );
  });

  it('contains links to all the expected routes', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    expect(screen.getByText('Home')).toHaveAttribute('href', '/home');
    expect(screen.getByText('Habits')).toHaveAttribute('href', '/habits');
    expect(screen.getByText('Timetable')).toHaveAttribute('href', '/timetable');
    expect(screen.getByText('To-Do')).toHaveAttribute('href', '/todo');
    expect(screen.getByText('Profile')).toHaveAttribute('href', '/profile');
  });

  it('applies active class to the active link', () => {
    render(
      <MemoryRouter initialEntries={['/home']}>
        <Routes>
          <Route path="*" element={<NavBar />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Home')).toHaveClass('active');

    userEvent.click(screen.getByText('Habits'));
    expect(screen.getByText('Habits')).toHaveClass('active');

    userEvent.click(screen.getByText('Timetable'));
    expect(screen.getByText('Timetable')).toHaveClass('active');

    userEvent.click(screen.getByText('To-Do'));
    expect(screen.getByText('To-Do')).toHaveClass('active');

    userEvent.click(screen.getByText('Profile'));
    expect(screen.getByText('Profile')).toHaveClass('active');
  });
});