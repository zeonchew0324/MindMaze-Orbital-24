import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { Todo, TodoContextType } from '../types/todo';
import { useAuth } from './AuthProvider';
import { unpackTodoData } from '../utils/todo';

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodos = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
};

export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { currentUser, token } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const getUid = async () => currentUser?.uid;
    const fetchTodos = async (token: string) => {
      try {
        const uid = await getUid();
        const response = await axios.get(`/api/todos/${uid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const todos = unpackTodoData(response.data);
        console.log('Fetch Todos Response:', response.data);
        setTodos(todos); 
        console.log('Successfully fetched todos');
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    
    fetchTodos(token);
    
  }, [currentUser, token]);

  const addTodo = (todo: Todo) => {
    setTodos((prevTodos) => [...prevTodos, todo]);
  };
 
  const updateTodo = async (updatedTodo: Todo) => {
    const getUid = async () => currentUser?.uid;
    try {
      const uid = await getUid();
      await axios.put(`/api/todos/${uid}/${updatedTodo.id}`, updatedTodo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTodos((prevTodos) => prevTodos.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      ));
      console.log(`${updatedTodo.id} Todo updated successfully!`);
    } catch (error) {
      console.error('Error updating todo:', error);
      alert('Failed to update todo. Please try again.');
    }
  };

  const deleteTodo = async (id: string) => {
    const getUid = async () => currentUser?.uid;
    try {
      const uid = await getUid();
      await axios.delete(`/api/todos/${uid}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      console.log(`${id} Todo deleted successfully!`);
    } catch (error) {
      console.error('Error deleting todo:', error);
      alert('Failed to delete todo. Please try again.');
  }
  }
  
  


  return (
    <TodoContext.Provider value={{ todos, addTodo, deleteTodo, updateTodo}}>
      {children}
    </TodoContext.Provider>
  );
};