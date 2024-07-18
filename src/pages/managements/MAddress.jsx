import React, { useState, useEffect, useContext } from 'react';
import PaginationDefault from '@/constants/PaginationDefault';
import { Input, Modal, Button } from "rsuite";
import { TableAddress, BasePagination } from './components'; 
import { addressEndpoints } from '@/apis'; 
import { useApi } from '@/hooks';
import { UploadFile } from '@/components/inputs';
import { Loading } from '@/components';
import { PopupConfirmContext } from '@/contexts/PopupConfirmContext';
import { getIds } from '@/helpers/dataHelpers';
import { SelectCategory, SingleSelect, SelectConstant, MultiSelect } from '@/components/selects'
import { ProductStatus, TrueFalseStatus } from '@/constants';

const MAddress = () => {
    const {
        openConfirmation,
    } = useContext(PopupConfirmContext);

    const [editData, setEditData] = useState(null);

    const [pagination, setPagination] = useState({
        page: PaginationDefault.PAGE,
        limit: PaginationDefault.LIMIT,
        order: PaginationDefault.ORDER,
        column: PaginationDefault.COLUMN,
        search: PaginationDefault.SEARCH
    });

    const handlePagination = (data) => {
        setPagination({
            ...pagination,
            ...data
        })
        setFetchCategory(true);
    };

    const [checkedKeys, setCheckedKeys] = useState([]);

    const [address, setAddress] = useState({
        default: TrueFalseStatus.FALSE,
        name: '',
        content: '',
        detail: '',
        url: ''
    });

    const [fetchAddress, setFetchAddress] = useState(true);

    const { data: addressData, callApi: handleGetAddress, loading: addressLoading } = useApi();
    const { data: createAddressData, callApi: handleCreateAddress, loading: createAddressLoading } = useApi();
    const { data: deleteAddressesData, callApi: handleDeleteAddresses, loading: deleteAddressesLoading } = useApi();
    const { data: editAddressData, callApi: handleEditAddress, loading: editAddressLoading } = useApi();

    useEffect(() => {
        setFetchAddress(true);
    }, [deleteAddressesData, editAddressData]);

    useEffect(() => {
        if (!fetchAddress) return;

        handleGetAddress(addressEndpoints.get, {
            params: {
                ...pagination,
            }
        });
        setFetchAddress(false);
        setCheckedKeys([]);
    }, [fetchAddress]);

    useEffect(() => {
        if (!createAddressData?.successMessage) return;
        setAddress({
            default: TrueFalseStatus.FALSE,
            name: '',
            content: '',
            detail: '',
            url: ''
        });
        setFetchAddress(true);
    }, [createAddressData]);

    useEffect(() => {
        if (!editAddressData?.successMessage) return;
        setEditData(null);
        setFetchAddress(true);
    }, [editAddressData]);

    const createAddress = () => {
        const formData = new FormData();
        formData.append('default', address.default);
        formData.append('name', address.name);
        formData.append('content', address.content);
        formData.append('detail', address.detail);

        handleCreateAddress(addressEndpoints.create, {
            method: "POST",
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    };

    const confirmDeleteAddresses = (rowData = null) => {
        const addressIds = rowData ? [[rowData.id]] : [getIds(checkedKeys)];
        const message = rowData ? 'Bạn có chắc muốn xóa địa chỉ này?' : `Bạn có chắc muốn xóa ${checkedKeys.length} địa chỉ này?`;
        openConfirmation(deleteAddresses, addressIds, message);
    };

    const deleteAddresses = async (ids) => {
        await handleDeleteAddresses(
            addressEndpoints.delete,
            {
                method: 'DELETE',
                data: { ids }
            }
        );
    };

    const confirmEditAddress = () => {
        openConfirmation(editAddress, [], 'Bạn có chắc muốn cập nhật địa chỉ này?');
    };

    const editAddress = async () => {
        handleEditAddress(addressEndpoints.create, {
            method: "PUT",
            params: {
                data: {
                    ...editData
                },
                ids: [editData.id]
            }
        });
    };

    return (
        <div className='flex flex-col gap-4'>
            <Modal size='sm' open={editData} onClose={() => setEditData(null)}>
                <Modal.Header>
                    <Modal.Title>Update Address</Modal.Title>
                </Modal.Header>
                <Modal.Body className='!overflow-visible'>
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
                            <label>Content</label>
                            <Input
                                placeholder="Content"
                                value={editData?.content}
                                onChange={(value) => setEditData({ ...editData, content: value })}
                            />
                        </div>
                        {/* <div className='flex flex-col gap-1.5 w-full'>
                            <label>Link</label>
                            <Input
                                placeholder="Content"
                                value={editData?.url}
                                onChange={(value) => setEditData({ ...editData, url: value })}
                            />
                        </div> */}
                        <div className='flex flex-col gap-1.5 w-full'>
                            <label>Detail</label>
                            <Input
                                placeholder="Detail"
                                value={editData?.detail}
                                onChange={(value) => setEditData({ ...editData, detail: value })}
                            />
                        </div>
                        <div className='flex flex-col gap-1.5 w-full'>
                            <label>Default</label>
                            <SelectConstant single={true} value={editData?.default} setValue={(value) => setEditData({ ...editData, default: value })} constant={TrueFalseStatus} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="pt-2">
                    <Button onClick={() => setEditData(null)} appearance="subtle">
                        Cancel
                    </Button>
                    <Button onClick={confirmEditAddress} appearance="primary">
                        {editAddressLoading && <Loading size={20} />}
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className='rounded-md shadow-md bg-white py-2'>
                <div className='text-lg font-semibold px-2 text-sapphire'>Address Management</div>
            </div>
            <div className='flex gap-5 lg:flex-row flex-col'>
                <div className='md:min-w-[620px] md:h-[420px] md:p-4 p-2 rounded-md shadow-md bg-white'>
                    <TableAddress items={addressData?.items} dataLoading={(addressLoading || deleteAddressesLoading)} handleSort={handlePagination} checkedKeys={checkedKeys} setCheckedKeys={setCheckedKeys} onDelete={confirmDeleteAddresses} onMultyDelete={() => confirmDeleteAddresses(null)} onEdit={setEditData} />
                    <BasePagination pagination={addressData?.pagination} handlePagination={handlePagination} className='flex md:flex-row flex-col md:gap-0 gap-3' />
                </div>
                <div className='flex flex-col gap-2 p-4 rounded-md shadow-md bg-white w-full'>
                    <div className='text-lg font-semibold px-2'>Create Address</div>
                    <div className='flex flex-col gap-4 items-end'>
                        <div className='flex flex-col gap-1.5 w-full'>
                            <label>Name</label>
                            <Input
                                placeholder="Name"
                                value={address?.name}
                                onChange={(value) => setAddress({ ...address, name: value })}
                            />
                        </div>
                        <div className='flex flex-col gap-1.5 w-full'>
                            <label>Address</label>
                            <Input
                                placeholder="Content"
                                value={address?.content}
                                onChange={(value) => setAddress({ ...address, content: value })}
                            />
                        </div>
                        {/* <div className='flex flex-col gap-1.5 w-full'>
                            <label>Link</label>
                            <Input
                                placeholder="Content"
                                value={address?.url}
                                onChange={(value) => setAddress({ ...address, url: value })}
                            />
                        </div> */}
                        <div className='flex flex-col gap-1.5 w-full'>
                            <label>Detail</label>
                            <Input
                                placeholder="Detail"
                                value={address?.detail}
                                onChange={(value) => setAddress({ ...address, detail: value })}
                            />
                        </div>
                        <div className='flex flex-col gap-1.5 w-full'>
                            <label>Default</label>
                            <SelectConstant single={true} value={address?.default} setValue={(value) => setAddress({ ...address, default: value })} constant={TrueFalseStatus} />
                        </div>
                        <div className="cursor-pointer px-3 py-2 bg-sapphire rounded-md justify-center items-center flex p-btn gap-2 shadow-ful w-fit" onClick={createAddress}>
                            {createAddressLoading && <Loading size={20} />}
                            <div className="text-white text-sm font-normal capitalize leading-normal">Create</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MAddress;

