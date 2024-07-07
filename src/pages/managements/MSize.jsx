import React, { useState, useEffect, useContext } from 'react';
import PaginationDefault from '@/constants/PaginationDefault';
import { Input, Modal, Button } from "rsuite";
import { TableSize, BasePagination } from './components';
import { productEndpoints } from '@/apis'
import { useApi } from '@/hooks';
import { Loading } from '@/components';
import { PopupConfirmContext } from '@/contexts/PopupConfirmContext';
import { getIds } from '@/helpers/dataHelpers';
import { UploadFile } from '@/components/inputs';

const MSize = ({productId, setSizes}) => {
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
    const [checkedKeys, setCheckedKeys] = useState([]);
    const handlePagination = (data) => {
        setPagination({
            ...pagination,
            ...data
        })
        setFetchSize(true);
    };

    const [size, setSize] = useState({
        size: '',
    })

    const [fetchSize, setFetchSize] = useState(true);
    const { data: sizeData, callApi: handleGetSize, loading: sizeLoading } = useApi();
    const { data: createSizeData, callApi: handleCreateSize, loading: createSizeLoading } = useApi();
    const { data: deleteSizesData, callApi: handleDeleteSizes, loading: deleteSizesLoading } = useApi();
    const { data: editSizeData, callApi: handleEditSize, loading: editSizeLoading } = useApi();

    useEffect(() => {
        setFetchSize(true);
    }, [deleteSizesData, editSizeData]);

    useEffect(() => {
        if(sizeData) {
            setSizes(sizeData);
        }
    }, [sizeData]);

    useEffect(() => {
        if (!fetchSize) return;
        handleGetSize(productEndpoints.get + `/${productId}/product-sizes`, {
            params: {
                ...pagination,
            }
        });
        setFetchSize(false);
        setCheckedKeys([]);
    }, [fetchSize]);

    useEffect(() => {
        if (!createSizeData) return;
        setSize({ ...size, size: ''})
        setFetchSize(true);
    }, [createSizeData]);

    const createSize = () => {
        const formData = new FormData();
        formData.append('size', size.size);

        handleCreateSize(productEndpoints.create + `/${productId}/product-sizes`, {
            method: "POST",
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    const confirmDeleteSizes = (rowData = null) => {
        const sizeIds = rowData ? [[rowData.id]] : [getIds(checkedKeys)];
        const message = rowData ? 'Are you sure to delete this size ?' : 'Are you sure to delete ' + checkedKeys.length + ' size(s) ?';
        openConfirmation(deleteSizes, sizeIds, message);
    }

    const deleteSizes = async (ids) => {
        await handleDeleteSizes(
            productEndpoints.delete + '/product-sizes',
            {
                method: 'DELETE',
                data: { ids }
            }
        );
    };

    const confirmEditSizes = () => {
        openConfirmation(editSizes, [], 'Are you sure to update this size ?');
    }

    const editSizes = async () => {
        const formData = new FormData();
        formData.append('size', editData.size);

        handleEditSize(productEndpoints.update + `/product-sizes/${editData.id}`  + '?_method=PUT', {
            method: "POST",
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    };

    return (
        <div className='flex flex-col gap-4'>
            <Modal size='sm' open={editData} onClose={() => setEditData(null)}>
                <Modal.Header>
                    <Modal.Title>Update Size</Modal.Title>
                </Modal.Header>
                <Modal.Body className='!overflow-visible'>
                    <div className='flex flex-col gap-4 items-end'>
                        <div className='flex flex-col gap-1.5 w-full'>
                            <label>Size Name</label>
                            <Input
                                placeholder="Size Name"
                                value={editData?.size}
                                onChange={(value) => setEditData({ ...editData, size: value })}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setEditData(null)} appearance="subtle">
                        Cancel
                    </Button>
                    <Button onClick={confirmEditSizes} appearance="primary">
                        {editSizeLoading && <Loading size={20} />}
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className='rounded-md shadow-md bg-white py-2'>
                <div className='text-lg font-semibold px-2 text-sapphire'>Size management</div>
            </div>
            <div className='flex gap-5 lg:flex-row flex-col'>
                <div className='md:min-w-[620px] md:h-[420px] md:p-4 p-2 rounded-md shadow-md bg-white'>
                    <TableSize items={sizeData ?? []} dataLoading={(sizeLoading || deleteSizesLoading)} handleSort={handlePagination} checkedKeys={checkedKeys} setCheckedKeys={setCheckedKeys} onDelete={confirmDeleteSizes} onMultyDelete={() => confirmDeleteSizes(null)} onEdit={setEditData} />
                </div>
                <div className='flex flex-col gap-2 p-4 rounded-md shadow-md bg-white w-full'>
                    <div className='text-lg font-semibold px-2'>Create Size</div>
                    <div className='flex flex-col gap-4 items-end'>
                        <div className='flex flex-col gap-1.5 w-full'>
                            <label>Size Name</label>
                            <Input
                                placeholder="Size Name"
                                value={size.size}
                                onChange={(value) => setSize({ ...size, size: value })}
                            />
                        </div>
                        <div className="cursor-pointer px-3 py-2 bg-sapphire rounded-md justify-center items-center flex p-btn gap-2 shadow-ful w-fit" onClick={createSize}>
                            {createSizeLoading && <Loading size={20} />}
                            <div className="text-white text-sm font-normal capitalize leading-normal">Create</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MSize;
