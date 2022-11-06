import { useContext } from 'react';
import { AuthContext } from '~/services/provider/AuthProvider';

function useAuth() {
    return useContext(AuthContext);
}

export default useAuth;
