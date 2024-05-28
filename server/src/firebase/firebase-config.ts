// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app") 
const { getAnalytics } = require("firebase/analytics")
const { getAuth } = require("firebase/auth")
const { getFirestore, doc, setDoc } = require("firebase/firestore")

const firebaseConfig = {
  apiKey: "AIzaSyBN_RFLOMZo8hp-26J9Fzqztpo0gMGsr-I",
  authDomain: "mind-maze-8dc62.firebaseapp.com",
  databaseURL: "https://mind-maze-8dc62.firebaseio.com",
  projectId: "mind-maze-8dc62",
  storageBucket: "mind-maze-8dc62.appspot.com",
  messagingSenderId: "1024085963293",
  appId: "1:1024085963293:web:82a00bd585e3fbf4d00cf4",
  measurementId: "G-SP0XY1XD28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const firestoreDb = getFirestore()


// Upload test data to db
const uploadTestData = async () => {
  const data = {
    id: 2,
    info: "2",
  }
  try {
    const document = doc(firestoreDb, "test", "testDoc2")
    let dataUpdated = await setDoc(document, data)
    return dataUpdated
  } catch (error) {
    console.log("FIRESTORE ERROR!!!!!!!!!!!!!!!!!")
  }
}

const auth = getAuth(app)

module.exports = { app, auth, uploadTestData }