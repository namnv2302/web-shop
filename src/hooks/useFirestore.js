import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '~/store/firebase';

function useFirestore(nameCollection, condition) {
    const [value, setValue] = useState([]);

    useEffect(() => {
        const colRef = collection(db, nameCollection);
        const q = query(colRef, where(condition.fieldName, condition.operator, condition.compareValue));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const documents = [];
            querySnapshot.forEach((doc) => {
                documents.push(doc.data());
            });
            setValue(documents);
        });

        return unsubscribe;
    }, [nameCollection, condition]);

    return value;
}

export default useFirestore;
