// contexts/TodoProvider.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Todo {
  id: number; 
  name: string;
  description: string; 
  deadline: Date;
  priority: 'High' | 'Middle' | 'Low'; 
}
export interface TodoContextType {
  todos: Todo[]; 
  addTodo: (todo: any) => void;
  deleteTodo: (id: number) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodos = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
};

export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<any[]>([]); // Replace `any` with a specific type if needed

  const addTodo = (todo: any) => {
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