import React, { createContext, useState } from 'react';
import { useConfirmation } from '@/hooks';
import { PopupConfirm } from '@/components/popups';

export const PopupConfirmContext = createContext();

export const PopupConfirmContextProvider = ({ children }) => {
    const {
        isConfirmationOpen,
        openConfirmation,
        handleConfirm,
        handleCancel,
        confirmType,
        confirmData,
        confirmValue,
        setConfirmValue,
        message
    } = useConfirmation();

    return (
        <PopupConfirmContext.Provider value={{
            isConfirmationOpen,
            openConfirmation,
            handleConfirm,
            handleCancel,
            confirmType,
            confirmData,
            confirmValue,
            setConfirmValue,
            message
        }}>
            {children}
            <PopupConfirm
                handleConfirm={handleConfirm}
                handleCancel={handleCancel}
                type={confirmType}
                data={confirmData}
                message={() => message()}
                setValue={setConfirmValue}
                open={isConfirmationOpen}
            />
        </PopupConfirmContext.Provider>
    );
};
