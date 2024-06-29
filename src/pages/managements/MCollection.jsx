import React, { useState, useEffect, useContext } from 'react';
import PaginationDefault from '@/constants/PaginationDefault';
import { Input, Button } from "rsuite";
import { TableCollection, BasePagination } from './components'; // Assuming you have TableCollection and BasePagination components
import { collectionEndpoints } from '@/apis'; // Adjust based on your API endpoints
import { useApi } from '@/hooks';
import { Loading } from '@/components';
import { PopupConfirmContext } from '@/contexts/PopupConfirmContext';
import { getIds } from '@/helpers/dataHelpers';
import { UploadFile } from '@/components/inputs';

const MCollection = () => {
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
        setFetchCollection(true);
    };

    const [collection, setCollection] = useState({
        name: '',
        image: null
    });

    const [fetchCollection, setFetchCollection] = useState(true);
    const { data: collectionData, callApi: handleGetCollection, loading: collectionLoading } = useApi();
    const { data: createCollectionData, callApi: handleCreateCollection, loading: createCollectionLoading } = useApi();
    const { data: deleteCollectionsData, callApi: handleDeleteCollections, loading: deleteCollectionsLoading } = useApi();

    useEffect(() => {
        setFetchCollection(true);
    }, [deleteCollectionsData]);

    useEffect(() => {
        if (!fetchCollection) return;
        handleGetCollection(collectionEndpoints.get, {
            params: {
                ...pagination,
            }
        });
        setFetchCollection(false);
        setCheckedKeys([]);
    }, [fetchCollection]);

    useEffect(() => {
        if (!createCollectionData) return;
        setCollection({ ...collection, name: '' });
        setFetchCollection(true);
    }, [createCollectionData]);

    const createCollection = () => {
        const formData = new FormData();
        formData.append('name', collection.name);
        if (collection.image) {
            formData.append('image', collection.image);
        }

        handleCreateCollection(collectionEndpoints.create, {
            method: "POST",
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    };

    const confirmDeleteCollections = (rowData = null) => {
        const collectionIds = rowData ? [[rowData.id]] : [getIds(checkedKeys)];
        const message = rowData ? 'Are you sure to delete this collection?' : `Are you sure to delete ${checkedKeys.length} collection(s)?`;
        openConfirmation(deleteCollections, collectionIds, message);
    };

    const deleteCollections = async (ids) => {
        await handleDeleteCollections(
            collectionEndpoints.delete,
            {
                method: 'DELETE',
                data: { ids }
            }
        );
    };

    const onEdit = (rowData) => {
        window.open('/m/collection-attach?id=' + rowData.id, '_blank');
    }

    return (
        <div className='p-5 flex flex-col gap-4'>
            <div className='rounded-md shadow-md bg-white py-2'>
                <div className='text-lg font-semibold px-2 text-sapphire'>Collection management</div>
            </div>
            <div className='flex gap-5 lg:flex-row flex-col'>
                <div className='md:min-w-[620px] md:h-[420px] md:p-4 p-2 rounded-md shadow-md bg-white'>
                    <TableCollection items={collectionData?.items} dataLoading={collectionLoading || deleteCollectionsLoading} handleSort={handlePagination} checkedKeys={checkedKeys} setCheckedKeys={setCheckedKeys} onDelete={confirmDeleteCollections} onMultyDelete={() => confirmDeleteCategories(null)} onEdit={onEdit} />
                    <BasePagination pagination={collectionData?.pagination} handlePagination={handlePagination} className='flex md:flex-row flex-col md:gap-0 gap-3' />
                </div>
                <div className='flex flex-col gap-2 p-4 rounded-md shadow-md bg-white w-full'>
                    <div className='text-lg font-semibold px-2'>Create Collection</div>
                    <div className='flex flex-col gap-4 items-end'>
                        <div className='flex flex-col gap-1.5 w-full'>
                            <label>Name</label>
                            <Input
                                placeholder="Name"
                                value={collection.name}
                                onChange={(value) => setCollection({ ...collection, name: value })}
                            />
                        </div>
                        <div className='flex flex-col gap-1.5 w-full'>
                            <label>Image</label>
                            <UploadFile className='w-full h-[135px]' values={[]} number={1} setValues={(value) => setCollection({ ...collection, image: value[0] })} />
                        </div>
                        <div className="cursor-pointer px-3 py-2 bg-sapphire rounded-md justify-center items-center flex p-btn gap-2 shadow-ful w-fit" onClick={createCollection}>
                            {createCollectionLoading && <Loading size={20} />}
                            <div className="text-white text-sm font-normal capitalize leading-normal">Create</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MCollection;
