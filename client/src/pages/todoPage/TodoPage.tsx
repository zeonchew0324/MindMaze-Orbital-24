import React, { useState } from 'react';
import { useTodos, Todo } from '../../contexts/TodoProvider';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';

const TodoPage: React.FC = () => {
  const { addTodo, deleteTodo, todos } = useTodos();
  const [showAddForm, setShowAddForm] = useState(false);
  const [todoName, setTodoName] = useState('');
  const [todoDescription, setTodoDescription] = useState('');
  const [todoDeadline, setTodoDeadline] = useState<Date | null>(null);
  const [todoPriority, setTodoPriority] = useState<'High' | 'Middle' | 'Low'>('Low');

  axios.defaults.baseURL = 'http://localhost:5000'; // Replace with your backend URL

  const handleSubmitTodo = async () => {
    if (todoName.trim() !== '' && todoDeadline && todoPriority.trim() !== '') {
      const newTodo: Omit<Todo, 'id'> = {
        name: todoName,
        description: todoDescription,
        deadline: todoDeadline,
        priority: todoPriority,
      };

      try {
        const response = await axios.post('/api/todos', newTodo);
        addTodo(response.data);
      } catch (error) {
        console.error('Error adding todo:', error);
        alert('Failed to add todo. Please try again.');
      }

      setTodoName('');
      setTodoDescription('');
      setTodoDeadline(null);
      setTodoPriority('Low');
      setShowAddForm(false);
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      deleteTodo(id);
    } catch (error) {
      console.error('Error deleting todo:', error);
      alert('Failed to delete todo. Please try again.');
    }
  };

  const filteredTodos = todos.slice().sort((a, b) => {
    if (a.priority === 'High' && b.priority !== 'High') return -1;
    if (a.priority === 'Middle' && b.priority === 'Low') return -1;
    if (a.priority !== 'High' && b.priority === 'High') return 1;
    return a.deadline.getTime() - b.deadline.getTime();
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
            <option value="Low">Low</option>
            <option value="Middle">Middle</option>
            <option value="High">High</option>
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
                    <p className="text-lg text-gray-600">Deadline: {new Date(todo.deadline).toLocaleDateString()}</p>
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
          <div className='pt-4'>
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
