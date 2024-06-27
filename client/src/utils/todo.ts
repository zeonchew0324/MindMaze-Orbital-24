import { Todo, TodoData } from "../types/todo";

export function unpackTodoData(res: TodoData[]): Todo[] {
    return res.map(data => ({
      id: data.id,
      name: data.name,
      description: data.description,
      deadline: new Date(data.deadline),
      priority: data.priority
    }));
    
}

export {}