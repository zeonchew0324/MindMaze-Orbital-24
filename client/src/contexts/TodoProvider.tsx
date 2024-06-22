
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Todo, TodoContextType } from '../types/todo';

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodos = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
};

export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]); 

  const addTodo = (todo: Todo) => {
    setTodos((prevTodos) => [...prevTodos, todo]);
  };

  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};