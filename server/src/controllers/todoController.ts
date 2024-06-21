import { Request, Response } from "express";
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
const { firestoreDb } = require("../firebase/firebase-config") 



export async function createTodo(req: Request, res: Response) {
  try {
    const db = firestoreDb;
    const { name, description, deadline, priority } = req.body;

    // Validate required fields
    if (!name || !deadline || !priority) {
      return res.status(400).json({ error: 'Please provide name, deadline, and priority' });
    }

    const newTodo = {
      name,
      description: description || '',
      deadline: new Date(deadline),
      priority,
    };

    const todoRef = await addDoc(collection(db, 'todos'), newTodo);
    const todo = { id: todoRef.id, ...newTodo };

    return res.status(201).json(todo);
  } catch (error: any) {
    console.error('Error creating todo:', error);
    res.status(500).json({ error: 'Failed to create todo' });
  }
}

// Function to fetch all todos
export async function getTodos(req: Request, res: Response) {
  try {
    const db = firestoreDb;
    const todosSnapshot = await getDocs(collection(db, 'todos'));
    const todos = todosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return res.json(todos);
  } catch (error: any) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
}

// Function to fetch a specific todo by ID
export async function getTodoById(req: Request, res: Response) {
  try {
    const db = firestoreDb;
    const { id } = req.params;
    const todoDoc = await getDoc(doc(db, 'todos', id));

    if (!todoDoc.exists()) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    const todo = { id: todoDoc.id, ...todoDoc.data() };
    return res.json(todo);
  } catch (error: any) {
    console.error('Error fetching todo:', error);
    res.status(500).json({ error: 'Failed to fetch todo' });
  }
}

// Function to update a todo by ID
export async function updateTodo(req: Request, res: Response) {
  try {
    const db = firestoreDb;
    const { id } = req.params;
    const updatedTodo = req.body;

    // Validate required fields
    if (!updatedTodo.name || !updatedTodo.deadline || !updatedTodo.priority) {
      return res.status(400).json({ error: 'Please provide name, deadline, and priority' });
    }

    const todoRef = doc(db, 'todos', id);
    await updateDoc(todoRef, updatedTodo);

    return res.json({ message: 'Todo updated successfully', updatedTodo });
  } catch (error: any) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Failed to update todo' });
  }
}

// Function to delete a todo by ID
export async function deleteTodo(req: Request, res: Response) {
  try {
    const db = firestoreDb;
    const { id } = req.params;
    await deleteDoc(doc(db, 'todos', id));
    return res.status(204).end();
  } catch (error: any) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
}
