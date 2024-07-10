import { getAuthentication } from "@/helpers/authenHelpers";
import React, { useEffect } from 'react';
import { UserRole } from '@/constants';
import { BaseProfile } from "../guest";
import { useNavigate } from "react-router-dom";

const MProfile = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = getAuthentication()?.user ?? null;
        if (currentUser) {
            if (currentUser.role == UserRole.CUSTOMER) {
                navigate('/profile')
            }
        } else {
            navigate('/');
        }
    }, []);

    return (
        <BaseProfile />
    );
};

export default MProfile;
