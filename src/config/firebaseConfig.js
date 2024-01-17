import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { collection, getDocs, addDoc, getFirestore, doc, deleteDoc, query, where, updateDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
    databaseURL: process.env.EXPO_PUBLIC_DATABASE_URL,
    projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_APP_ID,
    measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);

const db = getFirestore(app);

export const getContents = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "Contents"));
        let contents = []
        querySnapshot.forEach((doc) => {
            contents.push(doc.data())
        });
        return contents;
    } catch (error) {
        return error.message;
    }
}

export const getContentsByType = async (type) => {
    try {
        const typeQuery = query(
            collection(db, "Contents"),
            where("tip", "==", type),
        );
        const querySnapshot = await getDocs(typeQuery);
        let contents = []
        querySnapshot.forEach((doc) => {
            contents.push(doc.data())
        });
        return contents;
    } catch (error) {
        return error.message;
    }
}