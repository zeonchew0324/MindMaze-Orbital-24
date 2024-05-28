"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAnalytics } = require("firebase/analytics");
const { getAuth } = require("firebase/auth");
const { getFirestore, doc, setDoc } = require("firebase/firestore");
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
const app = initializeApp(firebaseConfig);
const firestoreDb = getFirestore();
// Upload test data to db
const uploadTestData = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        id: 2,
        info: "2",
    };
    try {
        const document = doc(firestoreDb, "test", "testDoc2");
        let dataUpdated = yield setDoc(document, data);
        return dataUpdated;
    }
    catch (error) {
        console.log("FIRESTORE ERROR!!!!!!!!!!!!!!!!!");
    }
});
const auth = getAuth(app);
module.exports = { app, auth, uploadTestData };
