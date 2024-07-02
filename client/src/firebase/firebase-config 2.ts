import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBN_RFLOMZo8hp-26J9Fzqztpo0gMGsr-I",
  authDomain: "mind-maze-8dc62.firebaseapp.com",
  projectId: "mind-maze-8dc62",
  storageBucket: "mind-maze-8dc62.appspot.com",
  messagingSenderId: "1024085963293",
  appId: "1:1024085963293:web:82a00bd585e3fbf4d00cf4",
  measurementId: "G-SP0XY1XD28"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const addHabitToDatabase = async (habit: { id: number; name: string; day: string }) => {
  try {
    const docRef = await addDoc(collection(db, 'habits'), habit);
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
    throw e;
  }
};

const getHabitsByDay = async (day: string) => {
  try {
    const q = query(collection(db, 'habits'), where('day', '==', day));
    const querySnapshot = await getDocs(q);
    const habits = querySnapshot.docs.map(doc => doc.data());
    return habits;
  } catch (e) {
    console.error('Error getting documents: ', e);
    throw e;
  }
};

export { app, auth, db, addHabitToDatabase, getHabitsByDay };
