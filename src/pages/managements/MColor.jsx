import React, { useState, useEffect, useContext } from 'react';
import PaginationDefault from '@/constants/PaginationDefault';
import { Input, Modal, Button } from "rsuite";
import { TableColor, BasePagination } from './components';
import { productEndpoints } from '@/apis'
import { useApi } from '@/hooks';
import { Loading } from '@/components';
import { PopupConfirmContext } from '@/contexts/PopupConfirmContext';
import { getIds } from '@/helpers/dataHelpers';
import { UploadFile } from '@/components/inputs';

const MColor = ({productId, setColors}) => {
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
        setFetchColor(true);
    };

    const [color, setColor] = useState({
        color: '',
        image: null
    })

    const [fetchColor, setFetchColor] = useState(true);
    const { data: colorData, callApi: handleGetColor, loading: colorLoading } = useApi();
    const { data: createColorData, callApi: handleCreateColor, loading: createColorLoading } = useApi();
    const { data: deleteColorsData, callApi: handleDeleteColors, loading: deleteColorsLoading } = useApi();
    const { data: editColorData, callApi: handleEditColor, loading: editColorLoading } = useApi();

    useEffect(() => {
        setFetchColor(true);
    }, [deleteColorsData, editColorData]);

    useEffect(() => {
        if(colorData) {
            setColors(colorData);
        }
    }, [colorData]);

    useEffect(() => {
        if (!fetchColor) return;
        handleGetColor(productEndpoints.get + `/${productId}/product-colors`, {
            params: {
                ...pagination,
            }
        });
        setFetchColor(false);
        setCheckedKeys([]);
    }, [fetchColor]);

    useEffect(() => {
        if (!createColorData) return;
        setColor({ ...color, color: '', image: null })
        setFetchColor(true);
    }, [createColorData]);

    const createColor = () => {
        const formData = new FormData();
        formData.append('color', color.color);
        if (color.image) {
            formData.append('image', color.image);
        }

        handleCreateColor(productEndpoints.create + `/${productId}/product-colors`, {
            method: "POST",
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    const confirmDeleteColors = (rowData = null) => {
        const colorIds = rowData ? [[rowData.id]] : [getIds(checkedKeys)];
        const message = rowData ? 'Are you sure to delete this color ?' : 'Are you sure to delete ' + checkedKeys.length + ' color(s) ?';
        openConfirmation(deleteColors, colorIds, message);
    }

    const deleteColors = async (ids) => {
        await handleDeleteColors(
            productEndpoints.delete + '/product-colors',
            {
                method: 'DELETE',
                data: { ids }
            }
        );
    };

    const confirmEditColors = () => {
        openConfirmation(editColors, [], 'Are you sure to update this color ?');
    }

    const editColors = async () => {
        const formData = new FormData();
        formData.append('color', editData.color);
        if (editData.image && editData.image instanceof File) {
            formData.append('image', editData.image);
        }

        handleEditColor(productEndpoints.update + `/product-colors/${editData.id}`  + '?_method=PUT', {
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
                    <Modal.Title>Update Color</Modal.Title>
                </Modal.Header>
                <Modal.Body className='!overflow-visible'>
                    <div className='flex flex-col gap-4 items-end'>
                        <div className='flex flex-col gap-1.5 w-full'>
                            <label>Color Name</label>
                            <Input
                                placeholder="Color Name"
                                value={editData?.color}
                                onChange={(value) => setEditData({ ...editData, color: value })}
                            />
                        </div>
                        <div className='flex flex-col gap-1.5 w-full'>
                            <label>Image</label>
                            <UploadFile className='w-full h-[135px]' values={editData?.image_url} number={1} setValues={(value) => setEditData({ ...editData, image: value[0] })} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setEditData(null)} appearance="subtle">
                        Cancel
                    </Button>
                    <Button onClick={confirmEditColors} appearance="primary">
                        {editColorLoading && <Loading size={20} />}
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className='rounded-md shadow-md bg-white py-2'>
                <div className='text-lg font-semibold px-2 text-sapphire'>Color management</div>
            </div>
            <div className='flex gap-5 lg:flex-row flex-col'>
                <div className='md:min-w-[620px] md:h-[420px] md:p-4 p-2 rounded-md shadow-md bg-white'>
                    <TableColor items={colorData ?? []} dataLoading={(colorLoading || deleteColorsLoading)} handleSort={handlePagination} checkedKeys={checkedKeys} setCheckedKeys={setCheckedKeys} onDelete={confirmDeleteColors} onMultyDelete={() => confirmDeleteColors(null)} onEdit={setEditData} />
                </div>
                <div className='flex flex-col gap-2 p-4 rounded-md shadow-md bg-white w-full'>
                    <div className='text-lg font-semibold px-2'>Create Color</div>
                    <div className='flex flex-col gap-4 items-end'>
                        <div className='flex flex-col gap-1.5 w-full'>
                            <label>Color Name</label>
                            <Input
                                placeholder="Color Name"
                                value={color.color}
                                onChange={(value) => setColor({ ...color, color: value })}
                            />
                        </div>
                        <div className='flex flex-col gap-1.5 w-full'>
                            <label>Image</label>
                            <UploadFile reset={true} className='w-full h-[135px]' values={color.image} number={1} setValues={(value) => setColor({ ...color, image: value[0] })} />
                        </div>
                        <div className="cursor-pointer px-3 py-2 bg-sapphire rounded-md justify-center items-center flex p-btn gap-2 shadow-ful w-fit" onClick={createColor}>
                            {createColorLoading && <Loading size={20} />}
                            <div className="text-white text-sm font-normal capitalize leading-normal">Create</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MColor;
