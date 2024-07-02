import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTodos } from '../../contexts/TodoProvider';

const DashboardTodos: React.FC = () => {
    const navigate = useNavigate();
    const { todos } = useTodos();
    const sortedTodos = todos.slice().sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
    // Show top 5 upcoming todos
    const upcomingTodos = sortedTodos.slice(0, 5);
    //render habits page when clicked
    const handleClick = () => { navigate('/todos') };

    return (
        <div 
      className="bg-white p-4 rounded-lg shadow cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={handleClick}
    >
      <h2 className="text-xl font-bold mb-4">Upcoming Todos</h2>
      {upcomingTodos.length === 0 ? (
        <p>No upcoming todos.</p>
      ) : (
        <ul>
          {upcomingTodos.map((todo) => (
            <li key={todo.id} className="mb-2">
              <span className="font-semibold">{todo.name}</span>
              <br />
              <span className="text-sm text-gray-600">
                Due: {new Date(todo.deadline).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-4 text-sm text-blue-600">Click to view all todos</p>
    </div>
    );
};

export default DashboardTodos;