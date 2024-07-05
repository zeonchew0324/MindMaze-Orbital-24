import React, { useEffect, useState } from 'react';
import { useTodos } from '../../contexts/TodoProvider';
import { FaTrash, FaPencil } from 'react-icons/fa6';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthProvider';

const TodoPage: React.FC = () => {
  const { addTodo, deleteTodo, updateTodo, todos } = useTodos();
  const [showAddForm, setShowAddForm] = useState(false);
  const [todoId, setTodoId] = useState<string | null>(null);
  const [todoName, setTodoName] = useState('');
  const [todoDescription, setTodoDescription] = useState('');
  const [todoDeadline, setTodoDeadline] = useState<Date | null>(null);
  const [todoPriority, setTodoPriority] = useState<'High' | 'Middle' | 'Low'>('Low');
  const { currentUser, token } = useAuth();

  useEffect(() => {
    fetchTodos()
  }, [])

  // axios.defaults.baseURL = 'http://localhost:5000'; // Replace with your backend URL

  const handleSubmitTodo = async () => {
    if (todoName.trim() === '' || !todoDeadline || todoPriority.trim() === '') {
      alert('Please fill in all fields');
      return;
    }

    const getUid = async () => currentUser?.uid;
    const dbAddOrUpdateTodo = async (token: string) => {
      try {
        const uid = await getUid();
        if (!uid) {
          console.error('User ID is not available.');
          return;
        }

        const reqBody = {
          name: todoName,
          description: todoDescription,
          deadline: todoDeadline.toISOString(), // Ensure deadline is a string
          priority: todoPriority,
        };

        if (todoId) {
          // Update todo
          await axios.put(`/api/todos/${uid}/${todoId}`, reqBody, {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          });
          updateTodo({ ...reqBody, id: todoId });
          console.log('Todo updated successfully!');
        } else {
          // Add new todo
          const response = await axios.put(`/api/todos/${uid}`, reqBody, {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          });
          addTodo({ ...reqBody, id: response.data.id });
          console.log('Todo added successfully!');
        }

        setShowAddForm(false);
      } catch (error) {
        console.log(todoId);
        console.error('Error adding/updating todo:', error);
      }
    };

    dbAddOrUpdateTodo(token);
  };

  const handleEditTodo = (todo: any) => {
    setTodoId(todo.id);
    setTodoName(todo.name);
    setTodoDescription(todo.description);
    setTodoDeadline(new Date(todo.deadline));
    setTodoPriority(todo.priority);
    setShowAddForm(true);
  };

  const handleDeleteTodo = async (id: string) => {
    deleteTodo(id);
  };

  const filteredTodos = todos.slice().sort((a, b) => {
    if (a.priority === 'High' && b.priority !== 'High') return -1;
    if (a.priority === 'Middle' && b.priority === 'Low') return -1;
    if (a.priority !== 'High' && b.priority === 'High') return 1;
    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
  });

  return (
    <div className="p-4 bg-gray-300 rounded-md max-h-[80vh] overflow-y-auto">
      <h1 className="text-3xl text-black font-semibold mb-6">Todo List</h1>
      {showAddForm ? (
        <div className="flex flex-col space-y-6 text-black">
          <label htmlFor="todoName">Todo Name</label>
          <input
            type="text"
            id="todoName"
            placeholder="Todo Name"
            value={todoName}
            onChange={(e) => setTodoName(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2"
          />
          <label htmlFor="todoDescription">Description</label>
          <textarea
            id="todoDescription"
            placeholder="Description"
            value={todoDescription}
            onChange={(e) => setTodoDescription(e.target.value)}
            rows={3}
            className="border border-gray-300 rounded-md px-3 py-2"
          ></textarea>
          <label htmlFor="todoDeadline">Deadline</label>
          <input
            type="date"
            id="todoDeadline"
            value={todoDeadline ? todoDeadline.toISOString().substr(0, 10) : ''}
            onChange={(e) => setTodoDeadline(new Date(e.target.value))}
            className="border border-gray-300 rounded-md px-3 py-2"
          />
          <label htmlFor="todoPriority">Priority</label>
          <select
            id="todoPriority"
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
              {todoId ? 'Update' : 'Add'}
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
        <div className="overflow-y-auto max-h-full">
          {filteredTodos.length === 0 ? (
            <p className="text-gray-700 text-2xl">No todos yet. Add a new todo!</p>
          ) : (
            <ul className="space-y-4">
              {filteredTodos.map((todo) => (
                <li key={todo.id} className="flex items-center justify-between border-b py-2">
                  <div>
                    <h3 className="font-bold text-xl text-amber-950 pb-1">{todo.name}</h3>
                    <p className="text-lg text-gray-600">{todo.description}</p>
                    <p className="text-lg text-gray-600">Deadline: {todo.deadline ? new Date(todo.deadline).toLocaleDateString() : 'No deadline'}</p>
                    <p className="text-lg text-gray-600">Priority: {todo.priority}</p>
                  </div>
                  <button 
                    aria-label='Pencil-Icon'
                    onClick={() => handleEditTodo(todo)}
                    className="pl-8 text-green-500 hover:text-green-700"
                  >
                    <FaPencil />
                  </button>
                  <button 
                    aria-label='Trash-Icon'
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
              onClick={() => {
                setTodoId(null);
                setTodoName('');
                setTodoDescription('');
                setTodoDeadline(null);
                setTodoPriority('Low');
                setShowAddForm(true);
              }}
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