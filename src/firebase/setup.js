import { firebase } from '@react-native-firebase/app';
import { auth } from '@react-native-firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBe2LrldEkmliScfqYmZik06tjfJzqvSqA",
    authDomain: "btaskee-demo.firebaseapp.com",
    projectId: "btaskee-demo",
    storageBucket: "btaskee-demo.appspot.com",
    messagingSenderId: "137297420245",
    appId: "1:137297420245:web:d55c0522da749d3e6d675c",
    measurementId: "G-YPCXHM8XC8"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export default () => {
    return { firebase, auth }
}