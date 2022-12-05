import {
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from 'firebase/auth';
import { query, where, collection, getDocs } from 'firebase/firestore';
import { addDocument } from '~/utils/manageData';
import { db } from '~/store/firebase';
import { auth } from '~/store/firebase';

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, 'users'), where('uid', '==', user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            addDocument('users', {
                uid: user.uid,
                displayName: user.displayName,
                authProvider: 'google',
                photoURL: user.photoURL,
                email: user.email,
            });
        }
    } catch (error) {
        console.error(error);
    }
};

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        const q = query(collection(db, 'users'), where('uid', '==', user.uid));
        const docs = await getDocs(q);
        const currentUser = auth.currentUser;
        await updateProfile(currentUser, {
            displayName: `${name}`,
        });

        if (docs.docs.length === 0) {
            addDocument('users', {
                uid: user.uid,
                displayName: name,
                photoURL: user.photoURL,
                authProvider: 'local',
                email: email,
            });
        }
    } catch (error) {
        console.error(error);
    }
};

const logInWithEmailAndPassword = async (email, password) => {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        return user.user;
    } catch (error) {
        console.error(error);
    }
};

const logout = async () => {
    try {
        signOut(auth);
    } catch (error) {
        console.error(error);
    }
};

export { signInWithGoogle, registerWithEmailAndPassword, logInWithEmailAndPassword, logout };
