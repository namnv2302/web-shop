import {
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    updateEmail,
    updatePassword,
    EmailAuthProvider,
    reauthenticateWithCredential,
} from 'firebase/auth';
import { query, where, collection, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';
import { addDocument } from '~/utils/manageData';
import { db, storage, auth } from '~/store/firebase';

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

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

const signInWithFacebook = async () => {
    try {
        const res = await signInWithPopup(auth, facebookProvider);
        const user = res.user;
        const q = query(collection(db, 'users'), where('uid', '==', user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            addDocument('users', {
                uid: user.uid,
                displayName: user.displayName,
                authProvider: 'facebook',
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

        await updateProfile(auth.currentUser, {
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
        toast.error('Email or password incorrect');
    }
};

const logout = async () => {
    try {
        signOut(auth);
    } catch (error) {
        console.error(error);
    }
};

const updateInfo = async (data) => {
    await updateProfile(auth.currentUser, {
        ...data,
    });
};

const updateEmailAdress = async (newEmail, currentPwd) => {
    try {
        const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPwd);
        await reauthenticateWithCredential(auth.currentUser, credential);
        await updateEmail(auth.currentUser, newEmail);
    } catch (error) {
        toast.error('Wrong password');
    }
};

const updatePwd = async (newPwd, currentPwd) => {
    try {
        const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPwd);
        await reauthenticateWithCredential(auth.currentUser, credential);
        await updatePassword(auth.currentUser, newPwd);
        toast.info('Update successfully!');
    } catch (error) {
        toast.error('Wrong password');
    }
};

const upload = async (displayName, file, setPhotoUrl, user, setUser) => {
    const fileRef = ref(storage, auth.currentUser.uid + '.png');
    await uploadBytes(fileRef, file);
    const photoUrl = await getDownloadURL(fileRef);
    setUser({ ...user, displayName: displayName, photoURL: photoUrl });
    setPhotoUrl(photoUrl);
    await updateInfo({
        displayName: displayName,
        photoURL: photoUrl,
    });
};

export {
    signInWithGoogle,
    signInWithFacebook,
    registerWithEmailAndPassword,
    logInWithEmailAndPassword,
    logout,
    updateInfo,
    updateEmailAdress,
    updatePwd,
    upload,
};
