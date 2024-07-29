import { Request, Response } from "express";
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  addDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
const { firestoreDb } = require("../firebase/firebase-config");

export async function handleGetHabits(req: Request, res: Response) {
  try {
    const db = firestoreDb;
    const { id } = req.params;

    // Get the user document using the provided UID
    const userRef = doc(db, "users", id);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();

    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }

    // Get the habits subcollection
    const habitsColRef = collection(db, `users/${id}/habitsCollection`);
    const habitsSnapshot = await getDocs(habitsColRef);
    const habits = habitsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.json(habits);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function handleDeleteHabits(req: Request, res: Response) {
  try {
    const db = firestoreDb;
    const { id, habitId } = req.params;

    // Get the user document using the provided UID
    const userRef = doc(db, "users", id);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();

    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }

    // Get the habits subcollection
    const habitsDocRef = doc(
      collection(db, `users/${id}/habitsCollection`),
      habitId
    );
    await deleteDoc(habitsDocRef);

    return res.json({ message: "Deleted habit successfully!" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function handleAddHabits(req: Request, res: Response) {
  try {
    const db = firestoreDb;
    const { id } = req.params;
    const newHabit = req.body;

    // Get the user document using the provided UID
    const userRef = doc(db, "users", id);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();

    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }

    // Get the habits subcollection
    const habitsDocRef = collection(db, `users/${id}/habitsCollection`);
    const addedDoc = await addDoc(habitsDocRef, newHabit);

    return res.json({ id: addedDoc.id });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function handleUpdateHabits(req: Request, res: Response) {
  try {
    const db = firestoreDb;
    const { id, habitId } = req.params;
    const updatedHabit = req.body;

    // Get the user document using the provided UID
    const userRef = doc(db, "users", id);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();

    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }

    // Get the specific habit document reference
    const habitDocRef = doc(
      collection(db, `users/${id}/habitsCollection`),
      habitId
    );

    // Check if the habit exists
    const habitDoc = await getDoc(habitDocRef);
    if (!habitDoc.exists()) {
      return res.status(404).json({ error: "Habit not found" });
    }

    // Update the habit document
    await updateDoc(habitDocRef, updatedHabit);

    return res.json({ message: "Habit updated successfully!" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
