import { useState, useEffect, createContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '~/store/firebase';

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState({});
    const [admin, setAdmin] = useState({});

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                if (user.uid === 'bZ7IEtsdnifP67VxY2sVWdklXxT2') {
                    const { uid, email } = user;
                    setAdmin({ uid, email });
                } else {
                    const { uid, displayName, authProvider, photoURL, email } = user;
                    setUser({ uid, displayName, authProvider, photoURL, email });
                }
            }
        });

        return () => unsub();
    }, []);

    return <AuthContext.Provider value={{ setUser, user, setAdmin, admin }}>{children}</AuthContext.Provider>;
}

export { AuthContext };
export default AuthProvider;
