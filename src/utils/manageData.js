import {
    setDoc,
    getDocs,
    getDoc,
    updateDoc,
    collection,
    deleteField,
    deleteDoc,
    doc,
    where,
    query,
    serverTimestamp,
} from 'firebase/firestore';
import { db } from '~/store/firebase';

const addZero = (num) => {
    return num >= 0 && num < 10 ? '0' + num : num + '';
};

const timer = () => {
    var now = new Date();
    var strDateTime = [
        [addZero(now.getDate()), addZero(now.getMonth() + 1), now.getFullYear()].join('/'),
        [addZero(now.getHours()), addZero(now.getMinutes()), addZero(now.getSeconds() + 1)].join(':'),
        now.getHours() >= 12 ? 'PM' : 'AM',
    ].join(' ');
    var sec = now.getTime() / 1000;
    sec = Math.floor(sec);

    return [strDateTime, sec];
};

const addDocument = async (collectionName, data) => {
    const q = query(doc(db, collectionName, data.id || data.uid));
    await setDoc(q, {
        ...data,
        timeStamp: timer(),
        createdAt: serverTimestamp(),
    });
};

const getADocument = async (collectionName, id) => {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
};

const getMultiDocuments = async (collectionName, condition) => {
    const data = [];
    const q = query(
        collection(db, collectionName),
        where(condition.fieldName, condition.operator, condition.compareValue),
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        data.push(doc.data());
    });
    return data;
};

const getAllDocuments = async (collectionName) => {
    const data = [];
    const q = query(collection(db, collectionName));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        data.push(doc.data());
    });

    return data;
};

const updateDocument = async (collectionName, id, fieldsData) => {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, fieldsData);
};

const deleteFieldsDoc = async (collectionName, id, fieldsName) => {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, {
        [fieldsName]: deleteField(),
    });
};

const deleteDocument = async (collectionName, id) => {
    await deleteDoc(doc(db, collectionName, id));
};

export {
    addDocument,
    getADocument,
    getMultiDocuments,
    getAllDocuments,
    updateDocument,
    deleteFieldsDoc,
    deleteDocument,
};
