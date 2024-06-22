import { time } from "console";
import { Request, Response } from "express";
import { collection, doc, getDoc, query, updateDoc, where, setDoc, addDoc } from "firebase/firestore";
const { firestoreDb } = require("../firebase/firebase-config") 



export async function handleGetTimetables(req: Request, res: Response) {
  try {
    const db = firestoreDb
    const { id, index } = req.params;

    // Get the user document using the provided UID
    const userRef = doc(db, 'users', id);
    const userDoc = await getDoc(userRef)
    const userData = userDoc.data();

    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!userData.timetables) {
      // If timetables field doesn't exist, initialize with a default timetable
      const defaultTimetable = { name: 'default' }
      const ttColRef = collection(db, `users/${id}/timetableCollection`)
      const newDocRef = await addDoc(ttColRef, defaultTimetable)
      const newDocId = newDocRef.id

      await updateDoc(userRef, {
        timetables: {
          timetable1: newDocId
        }
      })
    }

    const timetableMap = userData.timetables;
    const timetableIdArr = Object.values(timetableMap) as string[]

    if (Number(index) >= timetableIdArr.length || Number(index) < 0) {
      return res.status(404).json({ error: 'Invalid timetable index!' });
    }
    const timetableId = timetableIdArr[Number(index)]

    // Get the timwtable document using the provided UID
    const ttbRef = doc(db, `users/${id}/timetableCollection`, timetableId);
    const ttbDoc = await getDoc(ttbRef)
    const ttbData = ttbDoc.data();

    if (!ttbData) {
      return res.status(404).json({ error: 'Timetable not found' });
    }
    const ttbArray = Object.keys(ttbData)
      .filter(k => k !== 'name')
      .map(k => ttbData[k])

    return res.json(ttbArray)
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function handleUpdateTimetables(req: Request, res: Response) {
  try {
    const db = firestoreDb
    const { id, index } = req.params
    const updatedTimetable = req.body

    // Get the user document using the provided UID
    const userRef = doc(db, 'users', id);
    const userDoc = await getDoc(userRef)
    const userData = userDoc.data();

    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!userData.timetables) {
      return res.status(404).json({ error: 'Timetables not found for this user' });
    }

    const timetableMap = userData.timetables;
    const timetableIdArr = Object.values(timetableMap) as string[]

    if (Number(index) >= timetableIdArr.length || Number(index) < 0) {
      return res.status(404).json({ error: 'Invalid timetable index!' });
    }
    const timetableId = timetableIdArr[Number(index)]

    // Get the timwtable document using the provided UID
    // Expensive and inefficient, implement real CRUD later to optimize
    const ttbRef = doc(db, `users/${id}/timetableCollection`, timetableId);
    const ttbDoc = await getDoc(ttbRef)
    const ttbData = ttbDoc.data();

    if (!ttbData) {
      return res.status(404).json({ error: 'Timetable not found' });
    }
    const updatedDoc = {
      name: `${ttbData.name}`,
      ...updatedTimetable
    }
    await setDoc(ttbRef, updatedDoc);
    return res.json({ message: 'Timetable updated successfully', updatedTimetable });
  } catch (error: any) {
    console.error('Error updating timetable:', error);
    res.status(500).json({ error: 'Error updating timetable: ' + error.message });
  }
}