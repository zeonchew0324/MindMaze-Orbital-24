import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import axios from 'axios';
import { useAuth } from '../../src/contexts/AuthProvider';
import { TodoProvider, useTodos } from '../../src/contexts/TodoProvider';
import { unpackTodoData } from '../../src/utils/todo';
import { ReactNode } from 'react';

// Mocking dependencies
vi.mock('axios');
vi.mock('./AuthProvider');
vi.mock('../utils/todo');

describe('TodoProvider', () => {
  const mockTodos = [
    { id: '1', name: 'Test Todo', description: 'Test Description', deadline: new Date().toISOString(), priority: 'Low' },
  ];
  const mockCurrentUser = { uid: '123' };
  const mockToken = 'mock-token';

  beforeEach(() => {
    (useAuth as vi.Mock).mockReturnValue({
      currentUser: mockCurrentUser,
      token: mockToken,
    });
    (axios.get as vi.Mock).mockResolvedValue({ data: mockTodos });
    (unpackTodoData as vi.Mock).mockReturnValue(mockTodos);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const TestComponent = ({ children }: { children: ReactNode }) => (
    <TodoProvider>{children}</TodoProvider>
  );

  it('fetches and provides todos on mount', async () => {
    const ConsumerComponent = () => {
      const { todos } = useTodos();
      return (
        <div>
          {todos.map((todo) => (
            <div key={todo.id}>
              <h3>{todo.name}</h3>
              <p>{todo.description}</p>
            </div>
          ))}
        </div>
      );
    };

    render(
      <TestComponent>
        <ConsumerComponent />
      </TestComponent>
    );

    await waitFor(() => expect(axios.get).toHaveBeenCalledWith(`/api/todos/123`, {
      headers: {
        Authorization: `Bearer ${mockToken}`,
      },
    }));

    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('adds a new todo', () => {
    const newTodo = { id: '2', name: 'New Todo', description: 'New Description', deadline: new Date().toISOString(), priority: 'High' };

    const ConsumerComponent = () => {
      const { todos, addTodo } = useTodos();
      return (
        <div>
          <button onClick={() => addTodo(newTodo)}>Add Todo</button>
          {todos.map((todo) => (
            <div key={todo.id}>
              <h3>{todo.name}</h3>
              <p>{todo.description}</p>
            </div>
          ))}
        </div>
      );
    };

    render(
      <TestComponent>
        <ConsumerComponent />
      </TestComponent>
    );

    fireEvent.click(screen.getByText('Add Todo'));

    expect(screen.getByText('New Todo')).toBeInTheDocument();
    expect(screen.getByText('New Description')).toBeInTheDocument();
  });

  it('deletes a todo', async () => {
    const ConsumerComponent = () => {
      const { todos, deleteTodo } = useTodos();
      return (
        <div>
          <button onClick={() => deleteTodo('1')}>Delete Todo</button>
          {todos.map((todo) => (
            <div key={todo.id}>
              <h3>{todo.name}</h3>
              <p>{todo.description}</p>
            </div>
          ))}
        </div>
      );
    };

    (axios.delete as vi.Mock).mockResolvedValue({});

    render(
      <TestComponent>
        <ConsumerComponent />
      </TestComponent>
    );

    fireEvent.click(screen.getByText('Delete Todo'));

    await waitFor(() => expect(axios.delete).toHaveBeenCalledWith(`/api/todos/123/1`, {
      headers: {
        Authorization: `Bearer ${mockToken}`,
      },
    }));

    expect(screen.queryByText('Test Todo')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Description')).not.toBeInTheDocument();
  });
});
