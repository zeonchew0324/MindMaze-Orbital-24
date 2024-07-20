import { Request, Response } from "express";
import { collection, doc, getDoc, query, updateDoc, where, setDoc, addDoc, getDocs, deleteDoc } from "firebase/firestore";
const { firestoreDb } = require("../firebase/firebase-config") 

export async function handleGetMaze(req: Request, res: Response) {
  try {
    const db = firestoreDb
    const { id } = req.params;

    // Get the user document using the provided UID
    const mazeRef = doc(db, 'mazes', id);
    const mazeDoc = await getDoc(mazeRef)
    const mazeData = mazeDoc.data();

    if (!mazeData) {
      return res.status(200).json({ warning: 'Maze not found' });
    } else {
      return res.json(mazeData)
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function handleUpdateMaze(req: Request, res: Response) {
  try {
    const db = firestoreDb
    const { id } = req.params;
    const mazeState = req.body

    const mazeRef = doc(db, 'mazes', id);
    const mazeDoc = await getDoc(mazeRef)

    if (!mazeDoc.exists()) {
      await setDoc(mazeRef, mazeState)
    } else {
      await updateDoc(mazeRef, mazeState);
    }
    res.status(200).json({ message: `User ${id} updated successfully.` });
    
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function handleCompleteMaze(req: Request, res: Response) {
  try {
    const db = firestoreDb
    const { id } = req.params;

    const userRef = doc(db, 'users', id);
    const userDoc = await getDoc(userRef)
    const userData = userDoc.data();

    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }

    const completedNumber = userData.mazeCompleted

    if (!completedNumber) {
      await updateDoc(userRef, {
        mazeCompleted: 1
      })
    }  else {
      await updateDoc(userRef, {
        mazeCompleted: completedNumber + 1
      })
    }

  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}