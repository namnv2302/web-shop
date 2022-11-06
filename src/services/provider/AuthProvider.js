import { useState, useEffect, createContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '~/store/firebase';

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState({});

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { displayName, photoURL, uid, email } = user;
                setUser({ displayName, photoURL, uid, email });
            }
        });

        return () => unsub();
    }, []);

    return <AuthContext.Provider value={{ setUser, user }}>{children}</AuthContext.Provider>;
}

export { AuthContext };
export default AuthProvider;
