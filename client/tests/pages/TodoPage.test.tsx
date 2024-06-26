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
  const mockTodos = [
    { id: '1', name: 'Test Todo 1', description: 'Test Description 1', deadline: new Date().toISOString(), priority: 'Low' },
    { id: '2', name: 'Test Todo 2', description: 'Test Description 2', deadline: new Date().toISOString(), priority: 'High' },
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
    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Test Description 1')).toBeInTheDocument();
    expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
    expect(screen.getByText('Test Description 2')).toBeInTheDocument();

    // Verify add todo button
    const addTodoButton = screen.getByText('Add Todo');
    expect(addTodoButton).toBeInTheDocument();

    // Click Add todo button to toggle form
    fireEvent.click(addTodoButton);

    // Verify form elements
    expect(screen.getByPlaceholderText('Todo Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
    expect(screen.getByText('Add')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('cancels adding a new todo when "Cancel" button is clicked', () => {
    render(<TodoPage />);

    // Click "Add Todo" to show the form
    fireEvent.click(screen.getByText('Add Todo'));

    // Click "Cancel" button
    fireEvent.click(screen.getByText('Cancel'));

    // Ensure the form is no longer visible
    expect(screen.queryByPlaceholderText('Todo Name')).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Description')).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Deadline/i)).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Priority')).not.toBeInTheDocument();
  });

  it('adds a new todo when "Add" button is clicked', () => {
    render(<TodoPage />);

    // Click "Add Todo" to show the form
    fireEvent.click(screen.getByText('Add Todo'));

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText('Todo Name'), { target: { value: 'New Todo' } });
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'New Description' } });
    fireEvent.change(screen.getByLabelText(/Deadline/i), { target: { value: '2024-12-31' } });
    fireEvent.change(screen.getByDisplayValue('Low'), { target: { value: 'High' } });

    // Click "Add" button
    fireEvent.click(screen.getByText('Add'));

    // Verify that addTodo function was called with the correct arguments
    expect(mockAddTodo).toHaveBeenCalledWith({
      name: 'New Todo',
      description: 'New Description',
      deadline: '2024-12-31T00:00:00.000Z',
      priority: 'High',
    });

    // Update the mockTodos array to include the new todo for subsequent tests
    mockTodos.push({
      id: '3',
      name: 'New Todo',
      description: 'New Description',
      deadline: '2024-12-31T00:00:00.000Z',
      priority: 'High',
    });
  });

  it('deletes a todo when trash icon is clicked', () => {
    // Update the mockTodos array to include both todos
    (useTodos as unknown as vi.Mock).mockReturnValue({
      addTodo: mockAddTodo,
      deleteTodo: mockDeleteTodo,
      todos: mockTodos,
    });

    render(<TodoPage />);

    // Click the trash icon to delete the first todo
    fireEvent.click(screen.getAllByLabelText('Trash-Icon')[0]);

    // delete high priority todo
    expect(mockDeleteTodo).toHaveBeenCalledWith('2');

    // Click the trash icon to delete the second todo
    fireEvent.click(screen.getAllByLabelText('Trash-Icon')[1]);

    // delete low priority todo
    expect(mockDeleteTodo).toHaveBeenCalledWith('1');
  });

  it('renders high priority todos above low priority todos', () => {
    render(<TodoPage />);

    // Get the todo items
    const todos = screen.getAllByRole('listitem');

    // high priority todo over low priority
    expect(todos[0]).toHaveTextContent('Test Todo 2');
    expect(todos[1]).toHaveTextContent('Test Todo 1');
  });
});
