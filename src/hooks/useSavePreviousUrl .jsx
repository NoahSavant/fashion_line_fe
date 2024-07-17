import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useSavePreviousUrl = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.pathname !== '/login') {
            localStorage.setItem('previousUrl', location.pathname + location.search);
        } 
    }, [location]);
};

export default useSavePreviousUrl;
