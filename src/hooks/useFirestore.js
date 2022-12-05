import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '~/store/firebase';

function useFirestore(nameCollection, condition) {
    const [value, setValue] = useState([]);

    useEffect(() => {
        let colRef = collection(db, nameCollection);
        if (condition) {
            colRef = query(colRef, where(condition.fieldName, condition.operator, condition.compareValue));
        }
        const unsubscribe = onSnapshot(colRef, (querySnapshot) => {
            const documents = [];
            querySnapshot.forEach((doc) => {
                documents.push(doc.data());
            });
            setValue(documents);
        });

        return unsubscribe;
    }, [nameCollection, condition]);

    return value ? value : [];
}

export default useFirestore;
