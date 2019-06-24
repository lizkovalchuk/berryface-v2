import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDgcX52LdXXB3-ufgNqcJiPS24lLyh_-54",
  authDomain: "raspberrypi-2019.firebaseapp.com",
  databaseURL: "https://raspberrypi-2019.firebaseio.com",
  projectId: "raspberrypi-2019",
  storageBucket: "raspberrypi-2019.appspot.com",
  messagingSenderId: "787791272772",
  appId: "1:787791272772:web:86a826edbe100a6d"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
export default fire;