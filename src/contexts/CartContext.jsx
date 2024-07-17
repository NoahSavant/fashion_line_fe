import React, { createContext, useContext, useState, useEffect } from 'react';
import { useApi } from '@/hooks';
import { cartEndpoints } from '@/apis';
import { getAuthentication } from '@/helpers/authenHelpers';
import { PopupConfirmContext } from './PopupConfirmContext';

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
    const user = getAuthentication()?.user ?? null;
    const [fetchCart, setFetchCart] = useState(true);
    const [fetchCartFirst, setFetchCartFirst] = useState(false);
    const [updateUser, setUpdateUser] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const { data: addToCartData, callApi: handleAddToCart, loading: addToCartLoading } = useApi();
    const { data: cartItemData, callApi: handleGetCartItem, loading: getCartItemLoading } = useApi();
    const { data: deleteCartItemData, callApi: handleDeleteCartItem, loading: deleteCartItemLoading } = useApi();

    const { openConfirmation } = useContext(PopupConfirmContext);

    const unAuthen = () => {
        openConfirmation(() => {
            window.location.href = `/login`;
        }, [], "Bạn cần đăng nhập để dùng giỏ hàng");
    };

    const addToCart = (variant_id, amount) => {
        if (!(getAuthentication()?.user ?? null)) {
            unAuthen();
            return;
        }
        handleAddToCart(cartEndpoints.create, {
            method: "POST",
            data: {
                variant_id,
                amount
            }
        })
    };

    useEffect(() => {
        if (!fetchCart || !(getAuthentication()?.user ?? null)) return;
        handleGetCartItem(cartEndpoints.get, {
            params: {
                all: 1
            }
        });
        setFetchCart(false);
    }, [fetchCart, fetchCartFirst]);

    useEffect(() => {
        if (!cartItemData || !Array.isArray(cartItemData)) return;
        setCartItems(cartItemData);
    }, [cartItemData]);

    useEffect(() => {
        if (!deleteCartItemData?.successMessage) return;
        setFetchCart(true);
    }, [deleteCartItemData]);

    useEffect(() => {
        if (!addToCartData?.successMessage) return;
        setFetchCart(true);
    }, [addToCartData]);

    const confirmDeleteCartItems = (ids) => {
        openConfirmation(deleteCartItems, [ids], "Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng ?");
    };

    const deleteCartItems = async (ids) => {
        await handleDeleteCartItem(
            cartEndpoints.delete,
            {
                method: 'DELETE',
                data: { ids }
            }
        );
    };

    return (
        <CartContext.Provider value={{ setFetchCartFirst, setFetchCart, cartItems, addToCart, addToCartLoading, getCartItemLoading, updateUser, setUpdateUser, confirmDeleteCartItems, deleteCartItemLoading }}>
            {children}
        </CartContext.Provider>
    );
};
