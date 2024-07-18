import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useSavePreviousUrl = () => {
    const location = useLocation();
    const paths = [
        '/login',
        '/signup',
        '/verify-account',
        '/logout'
    ];

    useEffect(() => {
        if (!paths.includes(location.pathname)) {
            localStorage.setItem('previousUrl', location.pathname + location.search);
        }
    }, [location]);
};

export default useSavePreviousUrl;
