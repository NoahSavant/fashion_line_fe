import React, { useState, useEffect, useContext } from 'react';
import PaginationDefault from '@/constants/PaginationDefault';
import { Input, Button, Modal, InputNumber } from "rsuite";
import { TableOrder, BasePagination } from './components'; // Assuming you have TableOrder and BasePagination components
import { orderEndpoints } from '@/apis'; // Adjust based on your API endpoints
import { useApi } from '@/hooks';
import { Loading } from '@/components';
import { PopupConfirmContext } from '@/contexts/PopupConfirmContext';
import { getIds } from '@/helpers/dataHelpers';
import { UploadFile } from '@/components/inputs';
import { SelectConstant } from '@/components/selects'
import { OrderStatus, OrderPaymentMethod } from '@/constants';
import { current } from '@reduxjs/toolkit';

const MOrder = ({user_id=0}) => {
    const { openConfirmation } = useContext(PopupConfirmContext);

    const [pagination, setPagination] = useState({
        page: PaginationDefault.PAGE,
        limit: PaginationDefault.LIMIT,
        order: PaginationDefault.ORDER,
        column: PaginationDefault.COLUMN,
        search: PaginationDefault.SEARCH
    });
    const [checkedKeys, setCheckedKeys] = useState([]);
    const handlePagination = (data) => {
        setPagination({
            ...pagination,
            ...data
        });
        setFetchOrder(true);
    };

    const [order, setOrder] = useState(null);

    const [fetchOrder, setFetchOrder] = useState(true);
    const { data: orderData, callApi: handleGetOrder, loading: orderLoading } = useApi();
    const { data: editOrderData, callApi: handleEditOrder, loading: editOrderLoading } = useApi();

    useEffect(() => {
        if (!fetchOrder) return;
        handleGetOrder(orderEndpoints.get, {
            params: {
                ...pagination,
                user_id
            }
        });
        setFetchOrder(false);
        setCheckedKeys([]);
    }, [fetchOrder]);

    useEffect(() => {
        if (!editOrderData?.successMessage) return;
        setFetchOrder(true);
        setOrder(null);
    }, [editOrderData]);

    const onEdit = (rowData) => {
        if (rowData.status > OrderStatus.SHIPED) {
            openConfirmation(() => { }, [], 'Bạn không thể cập nhật trạng thái cho đơn hàng này nữa');
        } else {
            setOrder({ ...rowData, old_status: rowData.status });
        }
    }

    const confirmEditOrder = () => {
        if(order.status < order.old_status && order.old_status != OrderStatus.PAYING) {
            setOrder({...order, status: order.old_status});
            openConfirmation(() => { }, [], 'Bạn không thể cập nhật trạng thái ngược lại');
        } else {
            openConfirmation(editOrder, [], 'Bạn có chắc muốn cập nhật trạng thái cho đơn hàng này này');
        }
    }

    const editOrder = () => {
        handleEditOrder(
            orderEndpoints.update + order.id,
            {
                method: 'PUT',
                data: { 
                    status: order.status,
                    paid: order.paid
                }
            }
        );
    };

    const toThousands = (value) => {
        return value ? `${value}`.replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&.') : value;
    }

    const onSelect = (rowData) => {
        window.open(`/order-detail?id=${rowData.id}`, '_blank');
    }

    return (
        <div className='p-5 flex flex-col gap-4'>
            <div className='rounded-md shadow-md bg-white py-2'>
                <div className='text-lg font-semibold px-2 text-sapphire'>Order management</div>
            </div>
            <div className='flex gap-5 lg:flex-row flex-col'>
                <div className='w-full md:h-[420px] md:p-4 p-2 rounded-md shadow-md bg-white'>
                    <TableOrder items={orderData?.items} dataLoading={orderLoading } handleSort={handlePagination} checkedKeys={checkedKeys} setCheckedKeys={setCheckedKeys} onEdit={onEdit} onSelect={onSelect} />
                    <BasePagination pagination={orderData?.pagination} handlePagination={handlePagination} className='flex md:flex-row flex-col md:gap-0 gap-3' />
                </div>
            </div>
            <Modal size='sm' open={order} onClose={() => setOrder(null)}>
                <Modal.Header>
                    <Modal.Title>Update order</Modal.Title>
                </Modal.Header>
                <Modal.Body className='!overflow-visible'>
                    <div className='flex flex-col gap-4 items-end'>
                        <div className='flex flex-col gap-1.5 w-full'>
                            <label>Status</label>
                            <SelectConstant single={true} value={order?.status} setValue={(value) => setOrder({ ...order, status: value })} constant={OrderStatus} />
                        </div>
                        <div className='flex flex-col gap-1.5 w-full'>
                            <label>Paid</label>
                            <InputNumber postfix='đ̲' min={0} formatter={toThousands} value={order?.paid}
                                onChange={(value) => setOrder({ ...order, paid: value })} />                        
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="pt-2">
                    <Button onClick={() => setOrder(null)} appearance="subtle">
                        Cancel
                    </Button>
                    <Button onClick={confirmEditOrder} appearance="primary">
                        {editOrderLoading && <Loading size={20} />}
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default MOrder;
