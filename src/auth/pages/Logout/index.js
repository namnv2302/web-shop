import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '~/components/Loading';

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => navigate('/login'), 500);

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <Loading />;
}

export default Logout;
