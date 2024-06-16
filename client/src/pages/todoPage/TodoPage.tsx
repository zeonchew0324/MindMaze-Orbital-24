// pages/todoPage/TodoPage.tsx

import React, { useState } from 'react';
import { useTodos } from '../../contexts/TodoProvider';
import { FaTrash } from 'react-icons/fa';

const TodoPage: React.FC = () => {
  const { todos, addTodo, deleteTodo } = useTodos();
  const [showAddForm, setShowAddForm] = useState(false);
  const [todoName, setTodoName] = useState('');
  const [todoDescription, setTodoDescription] = useState('');
  const [todoDeadline, setTodoDeadline] = useState<Date | null>(null);
  const [todoPriority, setTodoPriority] = useState('');

  const handleSubmitTodo = () => {
    if (todoName.trim() !== '' && todoDeadline && todoPriority.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        name: todoName,
        description: todoDescription,
        deadline: todoDeadline,
        priority: todoPriority,
      };

      addTodo(newTodo);

      setTodoName('');
      setTodoDescription('');
      setTodoDeadline(null);
      setTodoPriority('');
      setShowAddForm(false); // Hide the add form after adding todo
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleDeleteTodo = (id: number) => {
    deleteTodo(id);
  };

  return (
    <div className="p-4 bg-gray-200 rounded-md">
      <h2 className="text-lg font-semibold mb-4">Todo List</h2>
      <button
        onClick={() => setShowAddForm(true)}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mb-4"
      >
        Add Todo
      </button>
      {showAddForm && (
        <div className="flex flex-col space-y-2">
          <input
            type="text"
            placeholder="Todo Name"
            value={todoName}
            onChange={(e) => setTodoName(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2"
          />
          <textarea
            placeholder="Description"
            value={todoDescription}
            onChange={(e) => setTodoDescription(e.target.value)}
            rows={3}
            className="border border-gray-300 rounded-md px-3 py-2"
          ></textarea>
          <input
            type="date"
            value={todoDeadline ? todoDeadline.toISOString().substr(0, 10) : ''}
            onChange={(e) => setTodoDeadline(new Date(e.target.value))}
            className="border border-gray-300 rounded-md px-3 py-2"
          />
          <input
            type="text"
            placeholder="Priority"
            value={todoPriority}
            onChange={(e) => setTodoPriority(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2"
          />
          <div className="flex">
            <button
              onClick={handleSubmitTodo}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md mr-2"
            >
              Add
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <div>
        <h2 className="text-lg font-semibold mb-4">Todo List</h2>
        {todos.length === 0 ? (
          <p>No todos yet. Add a new todo above!</p>
        ) : (
          <ul className="space-y-4">
            {todos.map((todo) => (
              <li key={todo.id} className="flex items-center justify-between border-b py-2">
                <div>
                  <h3 className="font-semibold">{todo.name}</h3>
                  <p className="text-sm text-gray-600">{todo.description}</p>
                  <p className="text-sm text-gray-600">Deadline: {todo.deadline?.toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600">Priority: {todo.priority}</p>
                </div>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TodoPage;
