import React from 'react'
import { FaPencil, FaTrash } from 'react-icons/fa6'
import { Todo } from '../../types/todo'

type PropType = {
  todo: Todo;
  handleEditTodo: (todo: Todo) => void;
  handleDeleteTodo: (id: string) => void;
}

function TodoBlock({todo, handleEditTodo, handleDeleteTodo}: PropType) {
  return (
    <li key={todo.id} className="flex items-center justify-between my-1 p-3 bg-white rounded-lg">
      <div className='ml-[10px]'>
        <h3 className="font-bold text-3xl text-black pb-1">{todo.name}</h3>
        <p className="text-md text-gray-700 mb-2 max-w-[300px]">{todo.description}</p>
        <div className='flex border-t-[1px] pt-2'>
          <p className="text-sm text-gray-700 mr-[20px]">Deadline: {todo.deadline ? new Date(todo.deadline).toLocaleDateString() : 'No deadline'}</p>
          <p className="text-sm text-gray-700">Priority: {todo.priority}</p>
        </div>
      </div>
      <div className="flex items-center mr-[10px]">
        <button 
          aria-label='Pencil-Icon'
          onClick={() => handleEditTodo(todo)}
          className="text-green-500 hover:text-green-700 mr-[10px]"
        >
          <FaPencil />
        </button>
        <button 
          aria-label='Trash-Icon'
          onClick={() => handleDeleteTodo(todo.id)}
          className="text-red-500 hover:text-red-700"
        >
          <FaTrash />
        </button>
      </div>
    </li>
  )
}

export default TodoBlock