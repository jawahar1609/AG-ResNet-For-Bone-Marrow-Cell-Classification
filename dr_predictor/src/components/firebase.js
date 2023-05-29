import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
} from "firebase/auth";

import {
    getFirestore,
    collection,
    addDoc,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA9dv2wZz8agv_HHgJi1Zkyz8R-tyV_jAI",
    authDomain: "dr-predictor.firebaseapp.com",
    projectId: "dr-predictor",
    storageBucket: "dr-predictor.appspot.com",
    messagingSenderId: "948163189430",
    appId: "1:948163189430:web:9aa5ac7a5e5feb4314e417",
    measurementId: "G-5RMYLBYQCB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email, password) => {
try {
    await signInWithEmailAndPassword(auth, email, password);
} catch (err) {
    console.error(err);
    alert(err.message);
}
};

const registerWithEmailAndPassword = async (name, email, password, dob, gender, medical_history) => {
try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    console.log("registered");
    await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        dob,
        gender,
        medical_history,
        email
    });
} catch (err) {
    console.error(err);
    alert(err.message);
}
};

const logout = () => {
    signOut(auth); 
};

export {
    auth,
    db,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    logout,
};