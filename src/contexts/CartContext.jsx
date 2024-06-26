import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
    const [isUpdateCart, setIsUpdateCart] = useState(false);

    return (
        <CartContext.Provider value={{ isUpdateCart, setIsUpdateCart }}>
            {children}
        </CartContext.Provider>
    );
};
