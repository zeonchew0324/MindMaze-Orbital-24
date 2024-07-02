export interface Todo {
    id: string; 
    name: string;
    description: string; 
    deadline: Date;
    priority: 'High' | 'Middle' | 'Low'; 
}

export interface TodoContextType {
    todos: Todo[]; 
    addTodo: (todo: any) => void;
    deleteTodo: (id: string) => void;
}

export interface TodoData {
    id: string; 
    name: string;
    description: string; 
    deadline: string;
    priority: 'High' | 'Middle' | 'Low'; 
}
