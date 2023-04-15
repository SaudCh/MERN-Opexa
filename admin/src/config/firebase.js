import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

export const firebaseConfig = {
    apiKey: "AIzaSyCAukR_SsOKADb2N1YmOEyRwFGKWZTwmOo",
    authDomain: "opxa-b11c7.firebaseapp.com",
    projectId: "opxa-b11c7",
    storageBucket: "opxa-b11c7.appspot.com",
    messagingSenderId: "664946986532",
    appId: "1:664946986532:web:121ae4d774d13661a192b1"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getDatabase(app);
