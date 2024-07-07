import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { InputNumber, Button, Divider, IconButton, SelectPicker, RadioGroup, Radio, Input } from 'rsuite';
import { IoCloseOutline } from '@/components/icons.js';
import { Loading } from '@/components';

const fakeCartData = {
    items: [
        {
            id: 1,
            name: "Áo Thun Nam Họa Tiết Thêu Nổi Awesome Bear",
            price: 150000,
            quantity: 2,
            image_url: "https://res.cloudinary.com/dvcdmxgyk/image/upload/v1720271150/files/os5ijvjlp7wivwxcfllt.jpg"
        },
        {
            id: 2,
            name: "Áo Polo AIRism (Kẻ Sọc)",
            price: 20000,
            quantity: 1,
            image_url: "https://res.cloudinary.com/dvcdmxgyk/image/upload/v1720322783/files/odpnn2glluuaplouqkzy.jpg"
        },
        {
            id: 3,
            name: "Quần Jeans Nam Slimfit Coolmax All Season",
            price: 250000,
            quantity: 3,
            image_url: "https://res.cloudinary.com/dvcdmxgyk/image/upload/v1720354216/files/mz7fjtg03xzw2vgknneq.jpg"
        }
    ],
};

const fakeAddresses = [
    { label: 'Vận chuyển 7 ngày', value: 'address1', shippingCost: 30000 },
    { label: 'Vận chuyển nhanh 3 ngày', value: 'address2', shippingCost: 50000 },
];

const fakeDiscountCodes = [
    { label: 'Giảm giá 10%', value: 0.1 },
    { label: 'Giảm giá 20%', value: 0.2 },
];

const fakeShippingDiscountCodes = [
    { label: 'Giảm giá vận chuyển 5%', value: 0.05 },
    { label: 'Giảm giá vận chuyển 10%', value: 0.1 },
];

const Cart = () => {
    const navigate = useNavigate();
    const [cartData, setCartData] = useState(null);
    const [cartLoading, setCartLoading] = useState(true);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [orderDiscountCode, setOrderDiscountCode] = useState(0);
    const [shippingDiscountCode, setShippingDiscountCode] = useState(0);
    const [orderNotes, setOrderNotes] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [shippingCost, setShippingCost] = useState(0);
    const [orderDiscount, setOrderDiscount] = useState(0);
    const [shippingDiscount, setShippingDiscount] = useState(0);
    const [deliveryTime, setDeliveryTime] = useState('');

    useEffect(() => {
        // Simulate an API call
        setTimeout(() => {
            setCartData(fakeCartData);
            setTotalPrice(fakeCartData.total);
            setCartLoading(false);
        }, 1000);
    }, []);

    const updateQuantity = (itemId, quantity) => {
        const updatedItems = cartData.items.map(item =>
            item.id === itemId ? { ...item, quantity } : item
        );
        const updatedTotal = updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setCartData({ items: updatedItems, total: updatedTotal });
        calculateTotal(updatedTotal, shippingCost, orderDiscount, shippingDiscount);
    };

    const removeItem = (itemId) => {
        const updatedItems = cartData.items.filter(item => item.id !== itemId);
        const updatedTotal = updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setCartData({ items: updatedItems, total: updatedTotal });
        calculateTotal(updatedTotal, shippingCost, orderDiscount, shippingDiscount);
    };

    const applyDiscount = () => {
        const orderDiscountCodeObj = fakeDiscountCodes.find(code => code.value === orderDiscountCode);
        const shippingDiscountCodeObj = fakeShippingDiscountCodes.find(code => code.value === shippingDiscountCode);

        const orderDiscountAmount = orderDiscountCodeObj ? orderDiscountCodeObj.discount * cartData.total : 0;
        const shippingDiscountAmount = shippingDiscountCodeObj ? shippingDiscountCodeObj.discount * shippingCost : 0;

        setOrderDiscount(orderDiscountAmount);
        setShippingDiscount(shippingDiscountAmount);

        calculateTotal(cartData.total, shippingCost, orderDiscountAmount, shippingDiscountAmount);
    };

    const calculateTotal = (cartTotal, shippingCost, orderDiscount, shippingDiscount) => {
        const discountedShippingCost = shippingCost - shippingDiscount;
        const discountedOrderTotal = cartTotal - orderDiscount;
        const finalTotal = discountedOrderTotal + discountedShippingCost;
        setTotalPrice(finalTotal);
    };

    const handleAddressChange = (value) => {
        const selected = fakeAddresses.find(address => address.value === value);
        setSelectedAddress(value);
        setShippingCost(selected ? selected.shippingCost : 0);
        calculateTotal(cartData.total, selected ? selected.shippingCost : 0, orderDiscount, shippingDiscount);
    };

    const handleDeliveryTypeChange = (value) => {
        // Assume delivery time based on selected value
        if (value === 'express') {
            setDeliveryTime('3 ngày giao hàng nhanh');
        } else if (value === 'standard') {
            setDeliveryTime('7 ngày giao hàng thường');
        }
    };

    const toThousands = (value) => {
        return value ? `${value}`.replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&.') : value;
    }

    if (cartLoading) {
        return <Loading />;
    }

    return (
        <div className='custom-padding flex flex-col'>
            <div className='bg-gray-100 p-2 mb-4 -mt-3 flex gap-2 items-center'>
                <a href='/' className='text-base font-medium text-blue-500 cursor-pointer'>
                    Trang chủ
                </a>
                <div>/</div>
                <div className='text-base font-medium text-black'>
                    Giỏ hàng
                </div>
            </div>

            {cartData && cartData.items.length > 0 ? (
                <div>
                    {cartData.items.map(item => (
                        <div key={item.id} className='flex justify-between items-center p-4 border-b gap-5'>
                            <img src={item.image_url} alt={item.name} className='w-20 h-20 object-cover' />
                            <div className='flex-1 ml-4'>
                                <div className='text-lg font-medium whitespace-nowrap'>{item.name}</div>
                                <div className='text-gray-500'>{toThousands(item.price)}đ̲</div>
                            </div>
                            <InputNumber
                                min={1}
                                value={item.quantity}
                                onChange={(value) => updateQuantity(item.id, value)}
                            />
                            <div className='text-lg font-medium ml-4'>{toThousands(item.price * item.quantity)}đ̲</div>
                            <IconButton
                                icon={<IoCloseOutline />}
                                appearance="subtle"
                                onClick={() => removeItem(item.id)}
                            />
                        </div>
                    ))}
                    <Divider />
                    <div className='mb-4'>
                        <Input
                            as="textarea"
                            rows={3}
                            placeholder="Ghi chú đơn hàng"
                            value={orderNotes}
                            onChange={value => setOrderNotes(value)}
                            block
                        />
                    </div>
                    <Divider />
                    <div className='p-4'>
                        <div className='flex justify-between items-center mb-2'>
                            <SelectPicker
                                data={fakeAddresses}
                                placeholder="Chọn địa chỉ"
                                onChange={handleAddressChange}
                                block
                            />
                            <div className='text-base font-medium flex justify-between w-[190px]'>
                                <div>Phí vận chuyển:</div>
                                <div>{toThousands(shippingCost)}đ̲</div>
                            </div>
                        </div>
                        <div className='flex justify-between items-center mb-2'>
                            <SelectPicker
                                data={fakeShippingDiscountCodes}
                                placeholder="Chọn mã giảm giá vận chuyển"
                                onChange={value => setShippingDiscountCode(value)}
                                block
                            />
                            <div className='text-base font-medium flex justify-between w-[190px]'>
                                <div>Giảm giá:</div>
                                <div>-{toThousands(shippingDiscountCode * shippingCost)}đ̲</div>
                            </div>
                        </div>
                        <div className='flex justify-between items-center mb-2'>
                            <div className='text-base font-medium'>Tổng:</div>
                            <div className='text-base font-medium'>
                                <div>{toThousands(shippingCost - shippingDiscountCode * shippingCost)}đ̲</div>
                            </div>
                        </div>
                        <Divider />
                        <div className='flex justify-between items-center mb-2'>
                            <div className='text-base font-medium'>Đơn hàng:</div>
                            <div className='text-base font-medium'>
                                <div>{toThousands(cartData.items.reduce((acc, item) => {
                                    return acc + (item.price * item.quantity);
                                }, 0))}đ̲</div>
                            </div>
                        </div>
                        <div className='flex justify-between items-center mb-2'>
                            <SelectPicker
                                data={fakeDiscountCodes}
                                placeholder="Chọn mã giảm giá đơn hàng"
                                onChange={value => setOrderDiscountCode(value)}
                                block
                            />
                            <div className='text-base font-medium flex justify-between w-[190px]'>
                                <div>Giảm giá:</div>
                                <div>-{toThousands(orderDiscountCode * cartData.items.reduce((acc, item) => {
                                    return acc + (item.price * item.quantity);
                                }, 0))}đ̲</div>
                            </div>
                        </div>
                        <div className='flex justify-between items-center mb-2'>
                            <div className='text-base font-medium'>Tổng:</div>
                            <div className='text-base font-medium'>
                                <div>{toThousands((1 - orderDiscountCode) * cartData.items.reduce((acc, item) => {
                                    return acc + (item.price * item.quantity);
                                }, 0))}đ̲</div>
                            </div>
                        </div>
                        <Divider />
                        <div className='flex justify-between items-center mt-2'>
                            <div className='text-lg font-bold'>Tổng tiền:</div>
                            <div className='text-lg font-bold'>{toThousands((1 - orderDiscountCode) * cartData.items.reduce((acc, item) => {
                                return acc + (item.price * item.quantity);
                            }, 0) + shippingCost - shippingDiscountCode * shippingCost)}đ̲</div>
                        </div>
                        <Divider />
                        <Button appearance="primary">Hoàn tất đơn hàng</Button>
                    </div>
                </div>
            ) : (
                <div className='flex items-center justify-center h-48'>
                    <div className='text-lg text-gray-500'>Giỏ hàng của bạn trống.</div>
                </div>
            )}
        </div>
    );
};

export default Cart;
