import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import TodoPage from '../../src/pages/todoPage/TodoPage';
import { useTodos } from '../../src/contexts/TodoProvider';
import { useAuth } from '../../src/contexts/AuthProvider';

// Mock the useTodos and useAuth hooks
vi.mock('../../src/contexts/TodoProvider', () => ({
  useTodos: vi.fn(),
}));

vi.mock('../../src/contexts/AuthProvider', () => ({
  useAuth: vi.fn(),
}));

describe('TodoPage', () => {
  const mockAddTodo = vi.fn();
  const mockDeleteTodo = vi.fn();
  //mock todos
  const mockTodos = [
    { id: '1', name: 'Test Todo', description: 'Test Description', deadline: new Date().toISOString(), priority: 'Low' },
  ];
  const mockCurrentUser = { uid: '123' };
  const mockToken = 'mock-token';

  beforeEach(() => {
    (useTodos as unknown as vi.Mock).mockReturnValue({
      addTodo: mockAddTodo,
      deleteTodo: mockDeleteTodo,
      todos: mockTodos,
    });

    (useAuth as unknown as vi.Mock).mockReturnValue({
      currentUser: mockCurrentUser,
      token: mockToken,
    });

    // Ensure to clear all mocks before each test
    vi.clearAllMocks();
  });

  it('renders the TodoPage with todos', () => {
    render(<TodoPage />);

    // Verify TodoList header
    expect(screen.getByText('Todo List')).toBeInTheDocument();

    // Verify rendered todos
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();

    // Verify add todo button
    const addTodoButton = screen.getByText('Add Todo');
    expect(addTodoButton).toBeInTheDocument();

    // Simulate clicking on add todo button to toggle form
    fireEvent.click(addTodoButton);

    // Verify form elements
    expect(screen.getByPlaceholderText('Todo Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
    expect(screen.getByText('Add')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });
});
