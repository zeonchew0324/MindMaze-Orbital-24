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