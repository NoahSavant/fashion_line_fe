import React, { useState, useEffect, useContext } from 'react';
import PaginationDefault from '@/constants/PaginationDefault';
import { Input, Modal, Button, DatePicker, SelectPicker, InputNumber } from "rsuite";
import { TableDiscount, BasePagination } from './components';
import { discountEndpoints } from '@/apis'
import { useApi } from '@/hooks';
import { Loading } from '@/components';
import { PopupConfirmContext } from '@/contexts/PopupConfirmContext';
import { getIds } from '@/helpers/dataHelpers';
import { UploadFile } from '@/components/inputs';
import { SelectConstant, SelectDateTime } from '@/components/selects';
import { DiscountType, DiscountSubject, DiscountStatus, DiscountCondition } from '@/constants';

const MDiscount = () => {
    const newDate = new Date();

    const getFinishTime = (start) => {
        const finishTime = new Date(new Date(start).getTime() + 10 * 60 * 1000);
        return finishTime;
    }

    const limitTime = (start, finish) => {
        if (finish < start) {
            return start;
        }

        return finish;
    }
    const { openConfirmation } = useContext(PopupConfirmContext);

    const [editData, setEditData] = useState(null);

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
        setFetchDiscount(true);
    };

    const defaultDiscount = {
        name: '',
        type: DiscountType.PUBLIC,
        subject: DiscountSubject.ORDER,
        condition: DiscountCondition.AMOUNT,
        value: 0,
        max_price: 0,
        min_price: 0,
        status: DiscountStatus.OPEN,
        started_at: newDate,
        ended_at: getFinishTime(newDate),
        image_url: null
    }

    const [discount, setDiscount] = useState(defaultDiscount);

    const [fetchDiscount, setFetchDiscount] = useState(true);
    const { data: discountData, callApi: handleGetDiscount, loading: discountLoading } = useApi();
    const { data: createDiscountData, callApi: handleCreateDiscount, loading: createDiscountLoading } = useApi();
    const { data: deleteDiscountsData, callApi: handleDeleteDiscounts, loading: deleteDiscountsLoading } = useApi();
    const { data: editDiscountData, callApi: handleEditDiscount, loading: editDiscountLoading } = useApi();

    useEffect(() => {
        if (deleteDiscountsData?.successMessage || editDiscountData?.successMessage)
        setFetchDiscount(true);
        setEditData(null);
    }, [deleteDiscountsData, editDiscountData]);

    useEffect(() => {
        if (!fetchDiscount) return;
        handleGetDiscount(discountEndpoints.get, {
            params: {
                ...pagination,
            }
        });
        setFetchDiscount(false);
        setCheckedKeys([]);
    }, [fetchDiscount]);

    useEffect(() => {
        if (!createDiscountData) return;
        setDiscount(defaultDiscount);
        setFetchDiscount(true);
    }, [createDiscountData]);

    const createDiscount = () => {
        const formData = new FormData();
        formData.append('name', discount.name);
        formData.append('type', discount.type);
        formData.append('subject', discount.subject);
        formData.append('condition', discount.condition);
        formData.append('value', discount.value);
        formData.append('max_price', discount.max_price);
        formData.append('min_price', discount.min_price);
        formData.append('status', discount.status);
        formData.append('started_at', discount.started_at.toISOString()); 
        formData.append('ended_at', discount.ended_at.toISOString());
        if (discount.image) {
            formData.append('image', discount.image);
        }

        handleCreateDiscount(discountEndpoints.create, {
            method: "POST",
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    };


    const confirmDeleteDiscounts = (rowData = null) => {
        const discountIds = rowData ? [[rowData.id]] : [getIds(checkedKeys)];
        const message = rowData ? 'Are you sure to delete this discount?' : 'Are you sure to delete ' + checkedKeys.length + ' discount(s)?';
        openConfirmation(deleteDiscounts, discountIds, message);
    };

    const deleteDiscounts = async (ids) => {
        await handleDeleteDiscounts(
            discountEndpoints.delete,
            {
                method: 'DELETE',
                data: { ids }
            }
        );
    };

    const toThousands = (value) => {
        return value ? `${value}`.replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&.') : value;
    }

    const confirmEditDiscounts = () => {
        openConfirmation(editDiscounts, [], 'Are you sure to update this discount?');
    };

    const editDiscounts = async () => {
        const formData = new FormData();
        formData.append('name', editData.name);
        formData.append('type', editData.type);
        formData.append('subject', editData.subject);
        formData.append('condition', editData.condition);
        formData.append('value', editData.value);
        formData.append('max_price', editData.max_price);
        formData.append('min_price', editData.min_price);
        formData.append('status', editData.status);
        formData.append('started_at', editData.started_at);
        formData.append('ended_at', editData.ended_at);
        if (editData.image) {
            formData.append('image', editData.image);
        }
        handleEditDiscount(discountEndpoints.update + editData?.id + '?_method=PUT', {
            method: "POST",
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    };

    return (
        <div className='p-5 flex flex-col gap-4'>
            <Modal size='sm' open={editData} onClose={() => setEditData(null)} >
                <Modal.Header>
                    <Modal.Title>Update Discount</Modal.Title>
                </Modal.Header>
                <Modal.Body className='px-2 -mx-2'>
                    <div className='flex flex-col gap-4 items-end'>
                        <div className='flex flex-col gap-1.5 w-full'>
                            <label>Name</label>
                            <Input
                                placeholder="Name"
                                value={editData?.name}
                                onChange={(value) => setEditData({ ...editData, name: value })}
                            />
                        </div>
                        <div className='flex flex-col gap-1.5 w-full'>
                            <label>Type</label>
                            <SelectConstant single={true} value={editData?.type} setValue={(value) => setEditData({ ...editData, type: value })} constant={DiscountType} />
                        </div>
                        <div className='flex flex-col gap-1.5 w-full'>
                            <label>Subject</label>
                            <SelectConstant single={true} value={editData?.subject} setValue={(value) => setEditData({ ...editData, subject: value })} constant={DiscountSubject} />
                        </div>
                        <div className='flex flex-col gap-1.5 w-full'>
                            <label>Condition</label>
                            <SelectConstant single={true} value={editData?.condition} setValue={(value) => setEditData({ ...editData, condition: value })} constant={DiscountCondition} />
                        </div>
                        <div className='flex flex-col gap-1.5 w-full'>
                            <label>Status</label>
                            <SelectConstant single={true} value={editData?.status} setValue={(value) => setEditData({ ...editData, status: value })} constant={DiscountStatus} />
                        </div>
                        <div className='flex flex-col gap-1.5 w-full'>
                            <label>Value</label>
                            <InputNumber postfix={`${editData?.condition ? '%' : 'đ̲'} `} max={editData?.condition ? 100 : undefined} min={0} formatter={toThousands} value={editData?.value}
                                onChange={(value) => setEditData({ ...editData, value })} />

                        </div>
                        <div className='flex flex-col gap-1.5 w-full'>
                            <label>Max Price</label>
                            <InputNumber postfix='đ̲' min={0} formatter={toThousands} value={editData?.max_price}
                                onChange={(value) => setEditData({ ...editData, max_price: value })} />
                        </div>
                        <div className='flex flex-col gap-1.5 w-full'>
                            <label>Min Price</label>
                            <InputNumber postfix='đ̲' min={0} formatter={toThousands} value={editData?.min_price}
                                onChange={(value) => setEditData({ ...editData, min_price: value })} />
                        </div>
                        <div className='flex flex-col gap-1.5 w-full'>
                            <label>Start Date</label>
                            <SelectDateTime
                                value={new Date(editData?.started_at)}
                                onChange={(value) => setEditData({ ...editData, started_at: limitTime(newDate, value), ended_at: limitTime(getFinishTime(limitTime(newDate, value)), editData?.ended_at) })}
                            />
                        </div>
                        <div className='flex flex-col gap-1.5 w-full'>
                            <label>End Date</label>
                            <SelectDateTime
                                value={new Date(editData?.ended_at)}
                                onChange={(value) => setEditData({ ...editData, ended_at: limitTime(getFinishTime(editData?.started_at), value) })}
                            />

                        </div>
                        <div className='flex flex-col gap-1.5 w-full'>
                            <label>Image</label>
                            <UploadFile className='w-[80px] h-[px]' values={editData?.image_url} number={1} setValues={(value) => setEditData({ ...editData, image: value[0] })} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="pt-2">
                    <Button onClick={() => setEditData(null)} appearance="subtle">
                        Cancel
                    </Button>
                    <Button onClick={confirmEditDiscounts} appearance="primary">
                        {editDiscountLoading && <Loading size={20} />}
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className='rounded-md shadow-md bg-white py-2'>
                <div className='text-lg font-semibold px-2 text-sapphire'>Discount Management</div>
            </div>
            <div className='flex gap-5 flex-col'>
                <div className='md:h-[420px] md:p-4 p-2 rounded-md shadow-md bg-white'>
                    <TableDiscount items={discountData?.items} dataLoading={(discountLoading || deleteDiscountsLoading)} handleSort={handlePagination} checkedKeys={checkedKeys} setCheckedKeys={setCheckedKeys} onDelete={confirmDeleteDiscounts} onMultyDelete={() => confirmDeleteDiscounts(null)} onEdit={setEditData} />
                    <BasePagination pagination={discountData?.pagination} handlePagination={handlePagination} />
                </div>
                <div className='flex flex-col gap-2 p-4 rounded-md shadow-md bg-white w-full'>
                    <div className='text-lg font-semibold px-2'>Create Discount</div>
                    <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 items-end'>
                        <div className='flex flex-col gap-1.5 w-full'>
                            <label>Name</label>
                            <Input
                                placeholder="Name"
                                value={discount.name}
                                onChange={(value) => setDiscount({ ...discount, name: value })}
                            />
                        </div>
                        <div className='flex flex-col gap-1.5 w-full'>
                            <label>Type</label>
                            <SelectConstant single={true} value={discount.type} setValue={(value) => setDiscount({ ...discount, type: value })} constant={DiscountType}/>
                        </div>
                        <div className='flex flex-col gap-1.5 w-full'>
                            <label>Subject</label>
                            <SelectConstant single={true} value={discount.subject} setValue={(value) => setDiscount({ ...discount, subject: value })} constant={DiscountSubject} />
                        </div>
                        <div className='flex flex-col gap-1.5 w-full'>
                            <label>Condition</label>
                            <SelectConstant single={true} value={discount.condition} setValue={(value) => setDiscount({ ...discount, condition: value })} constant={DiscountCondition} />
                        </div>
                        <div className='flex flex-col gap-1.5 w-full'>
                            <label>Status</label>
                            <SelectConstant single={true} value={discount.status} setValue={(value) => setDiscount({ ...discount, status: value })} constant={DiscountStatus} />
                        </div>
                        <div className='flex flex-col gap-1.5 w-full'>
                            <label>Value</label>
                            <InputNumber postfix={`${discount.condition ? '%' : 'đ̲'} `} max={discount.condition ? 100 : undefined} min={0} formatter={toThousands} value={discount.value}
                                onChange={(value) => setDiscount({ ...discount, value })} />

                        </div>
                        <div className='flex flex-col gap-1.5 w-full'>
                            <label>Max Price</label>
                            <InputNumber postfix='đ̲' min={0} formatter={toThousands} value={discount.max_price}
                                onChange={(value) => setDiscount({ ...discount, max_price: value })} />
                        </div>
                        <div className='flex flex-col gap-1.5 w-full'>
                            <label>Min Price</label>
                            <InputNumber postfix='đ̲' min={0} formatter={toThousands} value={discount.min_price}
                                onChange={(value) => setDiscount({ ...discount, min_price: value })} />
                        </div>
                        <div className='flex flex-col gap-1.5 w-full'>
                            <label>Start Date</label>
                            <SelectDateTime
                                value={discount.started_at}
                                onChange={(value) => setDiscount({ ...discount, started_at: limitTime(newDate, value), ended_at: limitTime(getFinishTime(limitTime(newDate, value)), discount.ended_at) })}
                            />
                        </div>
                        <div className='flex flex-col gap-1.5 w-full'>
                            <label>End Date</label>
                            <SelectDateTime
                                value={discount.ended_at}
                                onChange={(value) => setDiscount({ ...discount, ended_at: limitTime(getFinishTime(discount.started_at), value) })}
                            />
                            
                        </div>
                        <div className='flex flex-col gap-1.5 w-full'>
                            <label>Image</label>
                            <UploadFile reset={true} className='w-[80px] h-[px]' values={discount.image_url} number={1} setValues={(value) => setDiscount({ ...discount, image: value[0] })} />
                        </div>
                    </div>
                    <div className='w-full flex justify-end'>
                        <div className="cursor-pointer px-3 py-2 bg-sapphire rounded-md justify-center items-center flex p-btn gap-2 shadow-ful w-fit" onClick={createDiscount}>
                            {createDiscountLoading && <Loading size={20} />}
                            <div className="text-white text-sm font-normal capitalize leading-normal">Create</div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default MDiscount;
