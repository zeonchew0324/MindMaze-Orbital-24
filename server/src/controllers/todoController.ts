import { Request, Response } from "express";
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
const { firestoreDb } = require("../firebase/firebase-config") 


export async function handleGetTodos(req: Request, res: Response) {
  try {
    const db = firestoreDb;
    const { id } = req.params;

    // Get the user document using the provided UID
    const userRef = doc(db, 'users', id);
    const userDoc = await getDoc(userRef)
    const userData = userDoc.data();
    
    if (!userData) {
        return res.status(404).json({ error: 'User not found' });
    }

    // Get the todos subcollection
    const todosColRef = collection(db, `users/${id}/todosCollection`);
    const todosSnapshot = await getDocs(todosColRef);
    const habits = todosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return res.json(habits)
} catch (error: any) {
    res.status(500).json({ error: error.message });
}
}

export async function handleAddTodos(req: Request, res: Response) {
    try {
      const db = firestoreDb
      const { id } = req.params;
      const newTodos = req.body
  
      // Get the user document using the provided UID
      const userRef = doc(db, 'users', id)
      const userDoc = await getDoc(userRef)
      const userData = userDoc.data()
  
      if (!userData) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Get the habits subcollection
      const habitsDocRef = collection(db, `users/${id}/todosCollection`);
      await addDoc(habitsDocRef, newTodos);
  
      return res.json({ message: 'Added todo successfully!' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
}

export async function handleDeleteTodos(req: Request, res: Response) {
    try {
      const db = firestoreDb
      const { id, todoId } = req.params;
  
      // Get the user document using the provided UID
      const userRef = doc(db, 'users', id);
      const userDoc = await getDoc(userRef)
      const userData = userDoc.data();
  
      if (!userData) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Get the todos subcollection
      const todosDocRef = doc(collection(db, `users/${id}/habitsCollection`), todoId);
      await deleteDoc(todosDocRef);
  
      return res.json({ message: 'Deleted habit successfully!' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
