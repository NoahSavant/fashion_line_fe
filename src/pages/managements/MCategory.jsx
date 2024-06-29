import React, { useState, useEffect, useContext } from 'react';
import PaginationDefault from '@/constants/PaginationDefault';
import { Input, Modal, Button } from "rsuite";
import { TableCategory, BasePagination } from './components';
import { categoryEndpoints } from '@/apis'
import { useApi } from '@/hooks';
import { ColorPicker } from '@/components/selects'
import { Loading } from '@/components';
import { PopupConfirmContext } from '@/contexts/PopupConfirmContext';
import { getIds } from '@/helpers/dataHelpers';
import { UploadFile } from '@/components/inputs'

const MCategory = () => {
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
        setFetchCategory(true);
    };

    const [category, setCategory] = useState({
        name: '',
        image: null
    })

    const [fetchCategory, setFetchCategory] = useState(true);
    const { data: categoryData, callApi: handleGetCategory, loading: categoryLoading } = useApi();
    const { data: createCategoryData, callApi: handleCreateCategory, loading: createCategoryLoading } = useApi();
    const { data: deleteCategoriesData, callApi: handleDeleteCategories, loading: deleteCategoriesLoading } = useApi();
    const { data: editCategoryData, callApi: handleEditCategory, loading: editCategoryLoading } = useApi();

    useEffect(() => {
        setFetchCategory(true);
    }, [deleteCategoriesData, editCategoryData]);

    useEffect(() => {
        if (!fetchCategory) return;
        handleGetCategory(categoryEndpoints.get, {
            params: {
                ...pagination,
            }
        });
        setFetchCategory(false);
        setCheckedKeys([]);
    }, [fetchCategory]);

    useEffect(() => {
        if (!createCategoryData) return;
        setCategory({ ...category, name: '' })
        setFetchCategory(true);
    }, [createCategoryData]);

    const createCategory = () => {
        const formData = new FormData();
        formData.append('name', category.name);
        if (category.image) {
            formData.append('image', category.image);
        }

        handleCreateCategory(categoryEndpoints.create, {
            method: "POST",
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    const confirmDeleteCategories = (rowData = null) => {
        const categoryIds = rowData ? [[rowData.id]] : [getIds(checkedKeys)];
        const message = rowData ? 'Are you sure to delete this category ?' : 'Are you sure to delete ' + checkedKeys.length + ' category(s) ?';
        openConfirmation(deleteCategories, categoryIds, message);
    }

    const deleteCategories = async (ids) => {
        await handleDeleteCategories(
            categoryEndpoints.delete,
            {
                method: 'DELETE',
                data: { ids }
            }
        );
    };

    const confirmEditCategories = () => {
        openConfirmation(editCategories, [], 'Are you sure to update this category ?');
    }

    const editCategories = async () => {
        const formData = new FormData();
        formData.append('name', editData.name);
        if (editData.image && editData.image instanceof File) {
            formData.append('image', editData.image);
        }

        handleEditCategory(categoryEndpoints.update + editData.id + '?_method=PUT', {
            method: "POST",
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    };

    return (
        <div className='p-5 flex flex-col gap-4'>
            <Modal size='sm' open={editData} onClose={() => setEditData(null)}>
                <Modal.Header>
                    <Modal.Title>Update Category</Modal.Title>
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
                            <label>Image</label>
                            <UploadFile cropDimensions={[60, 45]} className='w-full h-[135px]' values={editData?.image_url} number={1} setValues={(value) => setEditData({ ...editData, image: value[0] })} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setEditData(null)} appearance="subtle">
                        Cancel
                    </Button>
                    <Button onClick={confirmEditCategories} appearance="primary">
                        {editCategoryLoading && <Loading size={20} />}
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className='rounded-md shadow-md bg-white py-2'>
                <div className='text-lg font-semibold px-2 text-sapphire'>Category management</div>
            </div>
            <div className='flex gap-5 lg:flex-row flex-col'>
                <div className='md:min-w-[620px] md:h-[420px] md:p-4 p-2 rounded-md shadow-md bg-white'>
                    <TableCategory items={categoryData?.items} dataLoading={(categoryLoading || deleteCategoriesLoading)} handleSort={handlePagination} checkedKeys={checkedKeys} setCheckedKeys={setCheckedKeys} onDelete={confirmDeleteCategories} onMultyDelete={() => confirmDeleteCategories(null)} onEdit={setEditData} />
                    <BasePagination pagination={categoryData?.pagination} handlePagination={handlePagination} className='flex md:flex-row flex-col md:gap-0 gap-3' />
                </div>
                <div className='flex flex-col gap-2 p-4 rounded-md shadow-md bg-white w-full'>
                    <div className='text-lg font-semibold px-2'>Create Category</div>
                    <div className='flex flex-col gap-4 items-end'>
                        <div className='flex flex-col gap-1.5 w-full'>
                            <label>Name</label>
                            <Input
                                placeholder="Name"
                                value={category.name}
                                onChange={(value) => setCategory({ ...category, name: value })}
                            />
                        </div>
                        <div className='flex flex-col gap-1.5 w-full'>
                            <label>Image</label>
                            <UploadFile cropDimensions={[60, 45]} className='w-full h-[135px]' values={[]} number={1} setValues={(value) => setCategory({ ...category, image: value[0] })} />
                        </div>
                        <div className="cursor-pointer px-3 py-2 bg-sapphire rounded-md justify-center items-center flex p-btn gap-2 shadow-ful w-fit" onClick={createCategory}>
                            {createCategoryLoading && <Loading size={20} />}
                            <div className="text-white text-sm font-normal capitalize leading-normal">Create</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MCategory;
