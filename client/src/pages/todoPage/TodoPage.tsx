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

  // Function to filter and sort todos based on priority and date
  const filteredTodos = todos.slice().sort((a, b) => {
    if (a.priority === 'High' && b.priority !== 'High') return -1;
    if (a.priority === 'Middle' && b.priority == 'Low') return -1;
    if (a.priority !== 'High' && b.priority === 'High') return 1;

    // When priority is the same, sort by date
    if (a.priority === b.priority) {
      return a.deadline.getTime() - b.deadline.getTime();
    }

    return 0;
  });

  return (
    <div className="p-4 bg-gray-300 rounded-md">
      <h1 className="text-3xl text-black font-semibold mb-6">Todo List</h1>
      
      {showAddForm ? (
        <div className="flex flex-col space-y-6 text-black">
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
          <select
            value={todoPriority}
            onChange={(e) => setTodoPriority(e.target.value as 'High' | 'Middle' | 'Low')}
            className="border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="">Select your priority level</option>
            <option value="High">High</option>
            <option value="Middle">Middle</option>
            <option value="Low">Low</option>
          </select>
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
      ) : (
        <div>
          {filteredTodos.length === 0 ? (
            <p className="text-gray-700 text-2xl">No todos yet. Add a new todo!</p>
          ) : (
            <ul className="space-y-4">
              {filteredTodos.map((todo) => (
                <li key={todo.id} className="flex items-center justify-between border-b py-2">
                  <div>
                    <h3 className="font-bold text-xl text-amber-950 pb-1">{todo.name}</h3>
                    <p className="text-lg text-gray-600">{todo.description}</p>
                    <p className="text-lg text-gray-600">Deadline: {todo.deadline?.toLocaleDateString()}</p>
                    <p className="text-lg text-gray-600">Priority: {todo.priority}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="pl-8 text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className ='pt-4'>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md mb-4"
            >
              Add Todo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoPage;
