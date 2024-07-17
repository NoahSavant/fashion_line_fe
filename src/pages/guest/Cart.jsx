import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { InputNumber, Button, Divider, IconButton, SelectPicker, RadioGroup, Radio, Input, Checkbox, MaskedInput } from 'rsuite';
import { IoCloseOutline } from '@/components/icons.js';
import { Loading } from '@/components';
import { CartContext } from "@/contexts/CartContext";
import SelectedAddress from '@/components/selects/SelectAddress';
import SelectedDiscount from '@/components/selects/SelectDiscount';
import { useApi } from '@/hooks';
import { orderEndpoints } from '@/apis';
import { getAuthentication } from '@/helpers/authenHelpers';
import { UserRole } from '@/constants';

const Cart = () => {
    const navigate = useNavigate();
    const [cartData, setCartData] = useState([]);
    const [order, setOrder] = useState({
        transportation_method: 0,
        product_price: 0,
        transport_price: 30000,
        product_discount: '',
        transport_discount: null,
        payment_method: 0,
        status: '',
        phonenumber: '',
        address: '',
        note: '',
        address_link: ''
    });

    useEffect(() => {
        if(!getAuthentication() || getAuthentication()?.user?.role !== UserRole.CUSTOMER) {
            navigate('/m');
        }
    }, []);

    const { cartItems, confirmDeleteCartItems, deleteCartItemLoading, setFetchCart } = useContext(CartContext);
    const { data: createOrderData, callApi: handleCreateOrder, loading: createOrderLoading } = useApi();

    useEffect(() => {
        const updatedCartData = cartItems.map(item => ({
            ...item,
            checked: false
        }));
        setCartData(updatedCartData);
    }, [cartItems]);

    useEffect(() => {
        if (!createOrderData?.successMessage) return;
        setFetchCart(true);
        window.open(`/order-detail?id=${createOrderData?.data?.id}`);
    }, [createOrderData]);

    const handleCheck = (index, value) => {
        console.log(value);
        setCartData(prevCartData => {
            const newCartData = [...prevCartData];
            newCartData[index].checked = !value;
            return newCartData;
        })
    };

    const getItemPrice = (id) => {
        const item = cartData.find(item => item.id == id);
        return item ? item.variant.price * item.amount : 0;
    };

    const getAllItemPrice = () => {
        let totalPrice = 0;
        cartData.forEach(item => {
            if(item.checked) {
                totalPrice += item.variant.price * item.amount;
            }   
        });
        return totalPrice;
    }

    const getProductPrice = () => {
        return getAllItemPrice() - calculateDiscountedPrice(getAllItemPrice(), getAllItemPrice(), order.product_discount);
    }

    const totalTransportFee = () => {
        return order.transport_price - calculateDiscountedPrice(getAllItemPrice(), order.transport_price, order.transport_discount);
    }

    const total = () => {
        return getProductPrice() + totalTransportFee();
    }

    const toThousands = (value) => {
        return value ? `${value}`.replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&.') : value;
    }

    const handleOrder = () => {
        handleCreateOrder(orderEndpoints.create, {
            method: "POST",
            data: {
                total_price: total(),
                transportation_method: order.transportation_method,
                product_price: getProductPrice(),
                transport_price: totalTransportFee(),
                product_discount: calculateDiscountedPrice(getAllItemPrice(), getAllItemPrice(), order.product_discount),
                transport_discount: calculateDiscountedPrice(getAllItemPrice(), order.transport_price, order.transport_discount),
                payment_method: order.payment_method,
                phonenumber: order.phonenumber,
                address: order.address
                    ? order.address.content
                        ? order.address.detail
                            ? `${order.address.content} (${order.address.detail})`
                            : order.address.content
                        : ''
                    : '',
                note: order.note,
                address_link: order.address?.url,
                orderItems: cartData
                    .filter(item => item.checked)
                    .map(item => {
                        return { id: item.id, amount: item.amount };
                    })
            }
        })
    }

    const calculateDiscountedPrice = (order_price, price, discount) => {
        if(!discount) return 0;
        const { min_price, value, condition, max_price } = discount;

        if (order_price < min_price) {
            return 0;
        }

        let discountedPrice = price;
        let discountAmount = 0;

        if (condition === 0) {
            discountAmount = value;
        } else if (condition === 1) {
            discountAmount = (value / 100) * price;
        } else {
            return 0;
        }

        if (max_price > 0 && discountAmount > max_price) {
            discountAmount = max_price;
        }

        if (discountAmount > discountedPrice) {
            discountAmount = discountedPrice;
        }

        if (discountAmount < 0) {
            discountAmount = 0;
        }

        return discountAmount;
    };

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

            {cartData.length > 0 ? (
                <div className='flex flex-col gap-5'>
                    <div className='flex flex-col gap-10'>
                        <div className='flex flex-col gap-5'>
                            {cartData.map((item, index) => (
                                <div key={item.id} className='flex md:flex-row flex-col justify-between items-center p-4 border-b gap-5'>
                                    <div className='flex gap-5'>
                                        <img src={item.variant.product_color.image_url} alt={item.variant.product.name} className='w-36 h-36 object-cover' />
                                        <div className='flex-1 ml-4'>
                                            <h3 className="text-lg font-bold text-sapphire">{item.variant.product.name}</h3>
                                            <div className="text-base text-boston_blue font-bold line-clamp-1">
                                                <span className="line-through text-gray-400 font-normal text-xs">
                                                    {item.variant.original_price > 0 ? item.variant.original_price.toLocaleString('de-DE') + 'đ̲ ' : ''}
                                                </span>
                                                {item.variant.price.toLocaleString('de-DE')}đ̲
                                            </div>
                                            <div className='flex flex-col'>
                                                <div className='text-sm font-medium'>Kích cỡ: {item.variant.product_size.size}</div>
                                                <div className='text-sm font-medium'>Màu sắc: {item.variant.product_color.color}</div>
                                            </div>
                                            <div className='flex md:flex-row flex-col gap-2 md:items-center'>
                                                <div className='text-sm font-medium'>Số lượng</div>
                                                <InputNumber
                                                    postfix={item.variant.stock_limit ? '/' + item.variant.stock : ''}
                                                    max={item.variant.stock_limit ? item.variant.stock : undefined}
                                                    value={item.amount}
                                                    onChange={(value) => setCartData(prevCartData => {
                                                        const newCartData = [...prevCartData];
                                                        newCartData[index].amount = Math.ceil(value);
                                                        return newCartData;
                                                    })}
                                                    min={1}
                                                    className='w-36'
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex gap-5 items-center'>
                                        <div className='flex gap-3'>
                                            <div className='text-lg font-medium md:hidden'>Tổng: </div>
                                            <div className='text-lg font-medium'>{toThousands(getItemPrice(item.id))}đ̲</div>
                                        </div>
                                        <div className="cursor-pointer px-2 py-1 bg-red-600 rounded-md justify-center items-center flex p-btn gap-2 shadow-full w-fit" onClick={() => confirmDeleteCartItems([item.id])}>
                                            {deleteCartItemLoading && <Loading size={15} />}
                                            <div className="text-white text-sm font-normal capitalize leading-normal">Xóa</div>
                                        </div>
                                        <Checkbox value={item.checked} onChange={(value) => handleCheck(index, value)}></Checkbox>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='flex flex-col gap-5'>
                            <div className='flex flex-col gap-1.5'>
                                <div className='flex justify-between'>
                                    <div className='text-lg font-medium'>Tổng giá sản phẩm:</div>
                                    <div className='text-lg font-medium'>{getAllItemPrice().toLocaleString('de-DE')}đ̲</div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <label>Mã giảm giá đơn hàng</label>
                                <div className='flex flex-col gap-3'>
                                    <div className='grid grid-cols-2 gap-5 items-center'>
                                        <SelectedDiscount onChange={(value) => setOrder({ ...order, product_discount: value })} subject={0} />
                                        <div className='flex justify-end'>
                                            <div className='text-lg font-medium'>-{toThousands(calculateDiscountedPrice(getAllItemPrice(), getAllItemPrice(), order.product_discount))}đ̲</div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <div className='flex justify-between'>
                                    <div className='text-lg font-medium'>Tổng:</div>
                                    <div className='text-lg font-medium'>{toThousands(getProductPrice())}đ̲</div>
                                </div>
                            </div>

                            <Divider />
                            <div className='flex flex-col gap-1.5'>
                                <label>Địa chỉ giao hàng</label>
                                <SelectedAddress onChange={(value) => setOrder({ ...order, address: value })}/>
                            </div>
                            <Divider />
                            
                            <div className='flex flex-col gap-5'>
                                <div className='flex flex-col gap-1.5'>
                                    <label>Phương thức giao hàng</label>
                                    <div className='flex flex-col gap-3'>
                                        <div className='grid grid-cols-2 gap-5 items-center'>
                                            <SelectPicker
                                                className={`w-full h-full`}
                                                data={[
                                                    {
                                                        label: "Giao hàng 5 ngày",
                                                        value: 0
                                                    },
                                                    {
                                                        label: "Giao hàng nhanh 3 ngày",
                                                        value: 1
                                                    }
                                                ]}
                                                value={order.transportation_method}
                                                onChange={(value) => setOrder({ ...order, transportation_method: value, transport_price: 30000 + value * 20000 })}
                                                defaultValue={0}
                                                onClean={() => setOrder({ ...order, transportation_method: 0, transport_price: 30000 })}
                                            />
                                            <div className='flex justify-end'>
                                                <div className='text-lg font-medium'>{toThousands(order.transport_price)}đ̲</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-1.5'>
                                    <label>Mã giảm giá giao hàng</label>
                                    <div className='flex flex-col gap-3'>
                                        <div className='grid grid-cols-2 gap-5 items-center'>
                                            <SelectedDiscount onChange={(value) => setOrder({ ...order, transport_discount: value })} subject={1} />
                                            <div className='flex justify-end'>
                                                <div className='text-lg font-medium'>-{toThousands(calculateDiscountedPrice(getAllItemPrice(), order.transport_price, order.transport_discount))}đ̲</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-1.5'>
                                    <div className='flex justify-between'>
                                        <div className='text-lg font-medium'>Tổng:</div>
                                        <div className='text-lg font-medium'>{toThousands(totalTransportFee())}đ̲</div>
                                    </div>
                                </div>
                            </div>
                            <Divider />
                            <div className='flex flex-col gap-1.5'>
                                <div className='flex justify-between'>
                                    <div className="text-lg text-boston_blue font-bold line-clamp-1">
                                        Tổng:
                                    </div>
                                    <div className="text-lg text-boston_blue font-bold line-clamp-1">
                                        {toThousands(total())}đ̲
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <label>Ghi chú đơn hàng</label>
                                <Input
                                    as="textarea"
                                    rows={3}
                                    placeholder="Ghi chú đơn hàng"
                                    value={order.note}
                                    onChange={(value) => setOrder({ ...order, note: value })}
                                    block
                                />
                            </div>
                            <div className='grid md:grid-cols-2 grid-cols-1 gap-5'>
                                <div className='flex flex-col gap-1.5'>
                                    <label>Số điện thoại</label>
                                    <MaskedInput
                                        value={order?.phonenumber}
                                        onChange={(value) => setOrder({ ...order, phonenumber: value })}
                                        mask={[/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/]}
                                        guide={true}
                                        showMask={false}
                                        keepCharPositions={true}
                                        placeholder="Số điện thoại"
                                    />
                                </div>
                                <div className='flex flex-col gap-1.5'>
                                    <label>Phương thức thanh toán</label>
                                    <SelectPicker
                                        className={`w-full h-full`}
                                        data={[
                                            {
                                                label: "Thanh toán khi nhận hàng",
                                                value: 0
                                            },
                                            {
                                                label: "Thanh toán qua ngân hàng",
                                                value: 1
                                            }
                                        ]}
                                        value={order.payment_method}
                                        onChange={(value) => setOrder({ ...order, payment_method: value })}
                                        defaultValue={0}
                                        onClean={() => setOrder({ ...order, payment_method: 0 })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <Divider />
                    <div className='flex justify-end'>
                        <div className="cursor-pointer px-4 py-2 bg-sapphire rounded-md justify-center items-center flex p-btn gap-2 shadow-full w-fit" onClick={handleOrder}>
                            {createOrderLoading && <Loading size={20} />}
                            <div className="text-white text-sm font-normal capitalize leading-normal">Đặt hàng ngay</div>
                        </div>
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
