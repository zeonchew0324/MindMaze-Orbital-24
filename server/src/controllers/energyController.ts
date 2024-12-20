import { Request, Response } from "express";
import { collection, doc, getDoc, query, updateDoc, where, setDoc, addDoc, getDocs, deleteDoc } from "firebase/firestore";
const { firestoreDb } = require("../firebase/firebase-config") 

export async function handleGetEnergy(req: Request, res: Response) {
  try {
    const db = firestoreDb
    const { id } = req.params;

    // Get the user document using the provided UID
    const userRef = doc(db, 'users', id);
    const userDoc = await getDoc(userRef)
    const userData = userDoc.data();

    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }

    let replyEnergy = userData.energy || 0
    let replyCompletedNum = userData.completedNum || 0

    return res.json({ energy: replyEnergy, completedNum: replyCompletedNum })

  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function handleUpdateEnergy(req: Request, res: Response) {
  try {
    const db = firestoreDb
    const { id } = req.params;
    const { value, completedNum } = req.body

    const userRef = doc(db, 'users', id);
    await updateDoc(userRef, {
      energy: value,
      completedNum: completedNum
    });

    res.status(200).send(`User ${id} updated successfully.`);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}