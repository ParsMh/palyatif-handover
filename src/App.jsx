import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  databaseURL: 'YOUR_DATABASE_URL',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID'
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const dbRef = firebase.database().ref('/your/data/path');
    dbRef.on('value', (snapshot) => {
      const newData = snapshot.val();
      setData(newData ? Object.values(newData) : []);
    });

    // Cleanup subscription on unmount
    return () => dbRef.off();
  }, []);

  return (
    <div>
      <h1>Real-time Data Sync with Firebase</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;