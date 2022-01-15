import { initializeApp } from "firebase/app";

export const initFirebase = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyCiV7_izEHum97QGuwKevxATKdwM8lrfIc",
        authDomain: "mini-netflix-mvg.firebaseapp.com",
        projectId: "mini-netflix-mvg",
        storageBucket: "mini-netflix-mvg.appspot.com",
        messagingSenderId: "913553905671",
        appId: "1:913553905671:web:24a1756019e8068d1732a2"
      };

      initializeApp(firebaseConfig);
}


// Initialize Firebase
// const app = initializeApp(firebaseConfig);