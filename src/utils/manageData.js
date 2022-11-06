import {
    setDoc,
    getDocs,
    getDoc,
    updateDoc,
    collection,
    deleteField,
    doc,
    query,
    serverTimestamp,
} from 'firebase/firestore';
import { db } from '~/store/firebase';

const addDocument = async (collectionName, data) => {
    const q = query(doc(db, collectionName, data.itemId || data.id || data.uid));
    await setDoc(q, {
        ...data,
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
    const q = query(collection(db, collectionName), condition);
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

export { addDocument, getADocument, getMultiDocuments, getAllDocuments, updateDocument, deleteFieldsDoc };
