import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Divider, Input, SelectPicker } from 'rsuite';
import { IoCloseOutline } from '@/components/icons.js';
import { Loading } from '@/components';

const fakeOrderData = {
    items: [
        {
            id: 1,
            name: 'Áo Thun Nam Họa Tiết Thêu Nổi Awesome Bear',
            price: 150000,
            quantity: 2,
            image_url: 'https://res.cloudinary.com/dvcdmxgyk/image/upload/v1720271150/files/os5ijvjlp7wivwxcfllt.jpg',
        },
        {
            id: 2,
            name: 'Áo Polo AIRism (Kẻ Sọc)',
            price: 20000,
            quantity: 1,
            image_url: 'https://res.cloudinary.com/dvcdmxgyk/image/upload/v1720322783/files/odpnn2glluuaplouqkzy.jpg',
        },
        {
            id: 3,
            name: 'Quần Jeans Nam Slimfit Coolmax All Season',
            price: 250000,
            quantity: 3,
            image_url: 'https://res.cloudinary.com/dvcdmxgyk/image/upload/v1720354216/files/mz7fjtg03xzw2vgknneq.jpg',
        },
    ],
    status: 'Đang giao hàng',
    deliveryType: 'express',
};

const fakeDeliveryTypes = [
    { label: '3 ngày giao hàng nhanh', value: 'express' },
    { label: '7 ngày giao hàng thường', value: 'standard' },
];

const OrderStatus = () => {
    const navigate = useNavigate();
    const [orderData, setOrderData] = useState(null);
    const [orderLoading, setOrderLoading] = useState(true);
    const [orderNotes, setOrderNotes] = useState('');

    useEffect(() => {
        // Simulate an API call
        setTimeout(() => {
            setOrderData(fakeOrderData);
            setOrderLoading(false);
        }, 1000);
    }, []);

    const handleDeliveryTypeChange = (value) => {
        // Handle change in delivery type
    };

    const toThousands = (value) => {
        return value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.') : value;
    };

    if (orderLoading) {
        return <Loading />;
    }

    return (
        <div className='custom-padding flex flex-col'>
            <div className='bg-gray-100 p-2 mb-4 -mt-3 flex gap-2 items-center'>
                <a href='/' className='text-base font-medium text-blue-500 cursor-pointer'>
                    Trang chủ
                </a>
                <div>/</div>
                <div className='text-base font-medium text-black'>Trạng thái đơn hàng</div>
            </div>

            {orderData ? (
                <div>
                    <div className='flex items-center justify-between p-4 border-b'>
                        <div className='flex items-center gap-5'>
                            <div className='flex-shrink-0 w-20 h-20'>
                                <img src={orderData.items[0].image_url} alt={orderData.items[0].name} className='w-full h-full object-cover' />
                            </div>
                            <div>
                                <div className='text-lg font-medium'>{orderData.items[0].name}</div>
                                <div className='text-gray-500'>{toThousands(orderData.items[0].price)}đ̲</div>
                            </div>
                        </div>
                        <div className='text-lg font-medium'>{toThousands(orderData.items[0].price * orderData.items[0].quantity)}đ̲</div>
                    </div>
                    <Divider />
                    <div className='mb-4'>
                        <Input
                            as='textarea'
                            rows={3}
                            placeholder='Ghi chú đơn hàng'
                            value={orderNotes}
                            onChange={(value) => setOrderNotes(value)}
                            block
                        />
                    </div>
                    <Divider />
                    <div className='flex justify-between items-center mb-2'>
                        <div className='text-base font-medium'>Thời gian giao hàng:</div>
                        <SelectPicker
                            data={fakeDeliveryTypes}
                            placeholder='Chọn loại giao hàng'
                            onChange={handleDeliveryTypeChange}
                            defaultValue={orderData.deliveryType}
                            block
                        />
                    </div>
                    <Divider />
                    <div className='flex justify-between items-center mb-2'>
                        <div className='text-base font-medium'>Trạng thái:</div>
                        <div className='text-base font-medium'>{orderData.status}</div>
                    </div>
                    <Divider />
                    <Button appearance='primary' onClick={() => navigate('/')} block className='w-fit'>
                        Quay lại trang chủ
                    </Button>
                </div>
            ) : (
                <div className='flex items-center justify-center h-48'>
                    <div className='text-lg text-gray-500'>Không tìm thấy thông tin đơn hàng.</div>
                </div>
            )}
        </div>
    );
};

export default OrderStatus;
