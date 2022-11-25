import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '~/components/Loading';

function Logout() {
    const navigate = useNavigate();
    const timer = useRef();

    useEffect(() => {
        timer.current = setTimeout(() => navigate('/login'), 500);

        return () => clearTimeout(timer.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <Loading />;
}

export default Logout;
