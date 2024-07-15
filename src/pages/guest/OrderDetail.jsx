import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from "react-router-dom";
import { orderEndpoints } from '@/apis';
import { Avatar, Carousel, Divider, InputNumber } from 'rsuite';
import { useApi } from '@/hooks';
import { variantEndpoints } from '@/apis';
import { IoCartOutline } from '@/components/icons.js';
import { convertStringToArray } from '@/helpers/dataHelpers';
import Loading from '@/components/Loading';
import { CartContext } from '@/contexts/CartContext';
import { Comments } from './components';
import CommentType from '@/constants/CommentType';
import { getConstantTitle } from '@/helpers/constantHelpers';
import { OrderStatus, OrderPaymentMethod } from '@/constants';

const OrderDetail = () => {
    const { addToCart, addToCartLoading } = useContext(CartContext);

    const [searchParams, setSearchParams] = useSearchParams();
    const [id, setId] = useState(null);

    useEffect(() => {
        if (searchParams.has('id')) {
            setId(searchParams.get('id'));
        } else {
            navigate('/');
        }
    }, []);

    useEffect(() => {
        if (id == null) return;
        handleGetOrder(orderEndpoints.getSingle + id, {})
    }, [id]);

    const { data: orderData, callApi: handleGetOrder, loading: orderLoading } = useApi();
    
    const [selectedVariant, setSelectedVariant] = useState({})
    const navigate = useNavigate();
    const [number, setNumber] = useState(1)

    useEffect(() => {
        console.log(orderData);
        if (Array.isArray(orderData)) {
            navigate('/');
        }
    }, [orderData]);

    return (
        <div className='custom-padding flex flex-col gap-10'>
            <div className='bg-gray-100 p-2 mb-4 -mt-3 flex gap-2 items-center'>
                <a href='/' className='text-base font-medium text-blue-500 cursor-pointer'>
                    Home
                </a>
                <div>/</div>
                <div className='text-base font-medium text-black'>
                    Order
                </div>
                <div>/</div>
                <div className='text-base font-medium text-black'>
                    {orderData?.code}
                </div>
            </div>
            {
                orderData && <div className='p-5 shadow-lg rounded-lg bg-blue-100'>
                    <h1 className="text-4xl font-bold mb-6 text-center text-sapphire">Chi tiết đơn hàng</h1>
                    <div className='grid md:grid-cols-2 grid-cols-1'>
                        <div className='flex flex-col gap-5'>
                            <div className='flex flex-col gap-1.5 w-full'>
                                <label className='font-bold'>Khách hàng:</label>
                                <div className="flex flex-row items-center gap-3 w-full h-full">
                                    <Avatar
                                        size="sm"
                                        circle
                                        src={orderData?.user.image_url}
                                    />
                                    <p className='text-base'>{orderData?.user.username}</p>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1.5 w-full'>
                                <label className='font-bold'>Mã đơn hàng:</label>
                                <p>{orderData?.code}</p>
                            </div>
                            <div className='flex flex-col gap-1.5 w-full'>
                                <label className='font-bold'>Địa chỉ:</label>
                                <p>{orderData?.address}</p>
                            </div>
                            <div className='flex flex-col gap-1.5 w-full'>
                                <label className='font-bold'>Ghi chú:</label>
                                <p>{orderData?.note}</p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <div className='flex flex-col gap-1.5 w-full'>
                                <label className='font-bold'>Trạng thái đơn hàng:</label>
                                <div>{getConstantTitle(OrderStatus, orderData?.status)}</div>
                            </div>
                            <div className='flex flex-col gap-1.5 w-full'>
                                <label className='font-bold'>Phương thức vận chuyển:</label>
                                <p>{orderData?.transport_method ? 'Vận chuyển nhanh 3 ngày' : 'Vận chuyển 3 ngày'}</p>
                            </div>
                            <div className='flex flex-col gap-1.5 w-full'>
                                <label className='font-bold'>Phương thức thanh toán:</label>
                                {
                                    orderData?.payment_method ?
                                        <div className='flex flex-col gap-5'>
                                            <p>Thanh toán qua chuyển khoản ngân hàng</p>
                                            <div className='flex flex-col gap-5 pl-5'>
                                                <div>Ngân hàng: <strong>Vietcombank</strong></div>
                                                <div>Tên tài khoản: <strong>FashionLine</strong></div>
                                                <div>Số tài khoản: <strong>0123456789123</strong></div>
                                                <div>Nội dung chuyển khoản: <strong>{orderData?.user.username} - {orderData?.code}</strong></div>
                                                <div>Lưu ý: <strong>Đơn hàng sẽ bị hủy sau hai ngày</strong></div>
                                            </div>
                                        </div> :
                                        <p>Thanh toán khi giao hàng</p>
                                }
                            </div>
                        </div>
                    </div>
                    <Divider />
                    <div className='flex flex-col gap-5'>
                        {orderData?.order_items.map((item, index) => (
                            <div key={item.id} className='flex md:flex-row flex-col justify-between items-center p-4 border-b gap-5'>
                                <div className='flex gap-5'>
                                    <img src={item.image_url} alt={item.name} className='w-36 h-36 object-cover' />
                                    <div className='flex-1 ml-4'>
                                        <h3 className="text-lg font-bold text-sapphire">{item.name}</h3>
                                        <div className="text-base text-boston_blue font-bold line-clamp-1">
                                            <span className="line-through text-gray-400 font-normal text-xs">
                                                {item.original_price > 0 ? item.original_price.toLocaleString('de-DE') + 'đ̲ ' : ''}
                                            </span>
                                            {item.price.toLocaleString('de-DE')}đ̲
                                        </div>
                                        <div className='flex flex-col'>
                                            <div className='text-sm font-medium'>Kích cỡ: {item.size}</div>
                                            <div className='text-sm font-medium'>Màu sắc: {item.color}</div>
                                        </div>
                                        <div className='flex md:flex-row flex-col gap-2 md:items-center'>
                                            <div className='text-sm font-medium'>Số lượng: {item.amount}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex gap-5 items-center'>
                                    <div className='flex gap-3'>
                                        <div className='text-lg font-medium md:hidden'>Tổng: </div>
                                        <div className='text-lg font-medium'>{(item.price * item.amount).toLocaleString('de-DE')}đ̲</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Divider />
                    <div className='flex flex-col gap-1.5'>
                        <div className='flex justify-between'>
                            <div className='text-lg font-medium'>Tổng đơn hàng:</div>
                            <div className='text-lg font-medium'>{(orderData?.product_price + orderData?.product_discount).toLocaleString('de-DE')}đ̲</div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-1.5'>
                        <div className='flex justify-between'>
                            <div className='text-lg font-medium'>Giảm giá đơn hàng:</div>
                            <div className='text-lg font-medium'>-{orderData?.product_discount.toLocaleString('de-DE')}đ̲</div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-1.5'>
                        <div className='flex justify-between'>
                            <div className='text-lg font-medium'>Phí vận chuyển:</div>
                            <div className='text-lg font-medium'>{(orderData?.transport_price + orderData?.transport_discount).toLocaleString('de-DE')}đ̲</div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-1.5'>
                        <div className='flex justify-between'>
                            <div className='text-lg font-medium'>Giảm giá vận chuyển:</div>
                            <div className='text-lg font-medium'>-{orderData?.transport_discount.toLocaleString('de-DE')}đ̲</div>
                        </div>
                    </div>
                    <Divider />
                    <div className='flex flex-col gap-1.5'>
                        <div className='flex justify-between'>
                            <div className="text-lg text-boston_blue font-bold line-clamp-1">
                                Tổng:
                            </div>
                            <div className="text-lg text-boston_blue font-bold line-clamp-1">
                                {orderData?.total_price.toLocaleString('de-DE')}đ̲
                            </div>
                        </div>
                    </div>
                </div>
            }
            
        </div>
    );
};

export default OrderDetail;
