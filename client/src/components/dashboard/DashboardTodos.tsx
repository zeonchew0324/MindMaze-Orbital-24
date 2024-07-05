import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTodos } from '../../contexts/TodoProvider';

const DashboardTodos: React.FC = () => {
  const navigate = useNavigate();
  const { todos } = useTodos();
  //get todos
  const sortedTodos = todos.slice().sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
  const upcomingTodos = sortedTodos.slice(0, 5); // Show top 5 upcoming todos

  //render todo page when clicked
  const handleClick = () => {
    navigate('/todo');
  };

  return (
    <div 
      className="bg-white p-6 rounded-lg shadow cursor-pointer hover:bg-gray-200 transition-colors h-full"
      onClick={handleClick}
    >
      <h2 className="text-2xl font-bold text-black mb-6">Upcoming Todos</h2>
      {upcomingTodos.length === 0 ? (
        <p className="text-lg text-black">No upcoming todos.</p>
      ) : (
        <ul className="space-y-4">
          {upcomingTodos.map((todo) => (
            <li key={todo.id} className="text-lg">
              <span className="font-semibold text-black">{todo.name}</span>
              <br />
              <span className="text-base text-gray-600">
                Due: {new Date(todo.deadline).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-6 text-base text-blue-600">Click to view all todos</p>
    </div>
  );
};

export default DashboardTodos;