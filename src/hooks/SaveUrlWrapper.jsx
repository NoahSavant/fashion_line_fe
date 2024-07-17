import React from 'react';
import useSavePreviousUrl from './useSavePreviousUrl ';

const SaveUrlWrapper = ({ children }) => {
    useSavePreviousUrl();
    return <>{children}</>;
};

export default SaveUrlWrapper;
