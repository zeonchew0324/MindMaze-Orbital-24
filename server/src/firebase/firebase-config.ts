import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  // Your Firebase configuration
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const addHabitToDatabase = async (habit: { id: string; name: string; day: string }) => {
  try {
    const docRef = await addDoc(collection(db, 'habits'), habit);
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
    throw e;
  }
};
