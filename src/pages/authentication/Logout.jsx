import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { signOut } from '@/helpers/authenHelpers';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        signOut();
        navigate('/login');
    }, []);

    return (
        <div></div>
    );
};

export default Logout;
