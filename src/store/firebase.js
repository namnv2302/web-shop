import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyA5uFIhGx2u4edd1LdmFILfWnw_zxCS2F0',
    authDomain: 'web-shop-c8cdd.firebaseapp.com',
    projectId: 'web-shop-c8cdd',
    storageBucket: 'web-shop-c8cdd.appspot.com',
    messagingSenderId: '653870425843',
    appId: '1:653870425843:web:0374df5e5941a0a46a3986',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, db, storage, auth };
