import React, { useState, useEffect, useContext } from 'react';
import { getConstantData } from '@/helpers/constantHelpers';
import PaginationDefault from '@/constants/PaginationDefault';
import { Input, Modal, Button, List, FlexboxGrid } from "rsuite";
import { BasePagination, TableProduct, AllProduct } from './components';
import { collectionEndpoints, productEndpoints } from '@/apis'
import { useApi } from '@/hooks';
import { UploadFile } from '@/components/inputs'
import { PopupConfirmContext } from '@/contexts/PopupConfirmContext';
import { Loading } from '@/components';
import { useSearchParams } from "react-router-dom";
import { getIds } from '@/helpers/dataHelpers';
import { Trash as TrashIcon } from '@rsuite/icons';


const MSingleCollection = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [id, setId] = useState(null);
    const [addProduct, setAddProduct] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);

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
        setFetchProducts(true);
    };

    useEffect(() => {
        if (searchParams.has('id')) {
            setId(searchParams.get('id'));
            setFetchProducts(true);
        }
    }, []);

    const [collection, setCollection] = useState({});

    const [fetchCollection, setFetchCollection] = useState(true);
    const [fetchProducts, setFetchProducts] = useState(false);

    const { data: collectionData, callApi: handleGetCollection, loading: collectionLoading } = useApi();
    const { data: editCollectionData, callApi: handleEditCollection, loading: editCollectionLoading } = useApi();
    const { data: productsData, callApi: handleGetProducts, loading: productsLoading } = useApi();
    const { data: updateProductData, callApi: handleUpdateProduct, loading: updateProductLoading } = useApi();

    useEffect(() => {
        if (!fetchCollection || id == null) return;
        handleGetCollection(collectionEndpoints.get + '/' + id, {})
        setFetchCollection(false);
    }, [fetchCollection, id]);

    useEffect(() => {
        if (!editCollectionData) return;
        setFetchCollection(true);
    }, [editCollectionData]);

    useEffect(() => {
        if (!collectionData) return;
        setCollection(collectionData);
    }, [collectionData]);

    useEffect(() => {
        if (!fetchProducts) return;
        handleGetProducts(productEndpoints.get, {
            params: {
                ...pagination,
                collections: [id]
            }
        });
        setFetchProducts(false);
        setCheckedKeys([]);
    }, [fetchProducts]);

    useEffect(() => {
        setFetchProducts(true);
        setAddProduct(false);
    }, [updateProductData]);

    const confirmDeleteProducts = (rowData = null) => {
        const discountIds = rowData ? [[rowData.id]] : [getIds(checkedKeys)];
        const message = rowData ? 'Are you sure to delete this discount?' : 'Are you sure to delete ' + checkedKeys.length + ' discount(s)?';
        openConfirmation(deleteProducts, discountIds, message);
    };

    const confirmEditCollection = () => {
        openConfirmation(editCollection, [], 'Are you sure to update this collction ?');
    };

    const deleteProducts = async (ids) => {
        handleDeleteProducts(
            productEndpoints.delete,
            {
                method: 'DELETE',
                data: { ids }
            }
        );
    };

    const confirmAddProduct = () => {
        handleUpdateProduct(collectionEndpoints.update + id + '/update-product', {
            method: "POST",
            data: {
                productIds: getIds(selectedProducts),
                type: 'add'
            }
        });
    }

    const confirmRemoveProducts = (rowData = null) => {
        const ids = rowData ? [[rowData.id]] : [getIds(checkedKeys)];
        const message = rowData ? 'Are you sure to remove this product?' : `Are you sure to remove ${checkedKeys.length} product(s)?`;
        openConfirmation(removeProducts, ids, message);
    };

    const removeProducts = (ids) => {
        handleUpdateProduct(collectionEndpoints.update + id + '/update-product', {
            method: "POST",
            data: {
                productIds: ids,
                type: 'remove'
            }
        });
    }

    const editCollection = () => {
        const formData = new FormData();
        formData.append('name', collection.name);

        if (collection.image) {
            formData.append('image', collection.image);
        }

        handleEditCollection(collectionEndpoints.update + id + '?_method=PUT', {
            method: "POST",
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    };

    const removeProduct = (productId) => {
        setSelectedProducts((prevProducts) => 
            prevProducts.filter((product) => product.id !== productId)
        );
    };

    const addSelectdProduct = (product) => {
        setSelectedProducts((prevProducts) => {
            if (prevProducts.find(p => p.id === product.id)) {
                return prevProducts; 
            }
            return [...prevProducts, product];
        });
    };

    return (
        <div className='p-5 flex flex-col gap-4'>
            {(collectionLoading || productsLoading) && <Loading size={40} />}
            <div className='rounded-md shadow-md bg-white py-2'>
                <div className='text-lg font-semibold px-2 text-sapphire'>Collection Detail</div>
            </div>
            <div className='rounded-md shadow-md bg-white p-4 flex flex-col gap-3'>
                <div className='flex flex-col gap-1.5'>
                    <label>Name</label>
                    <Input
                        placeholder="Name"
                        value={collection.name}
                        onChange={(value) => setCollection({ ...collection, name: value })}
                    />
                </div>
                <div className='flex flex-col gap-1.5'>
                    <label>Image</label>
                    <UploadFile className='w-full h-[135px]' values={collection?.image_url ?? []} number={1} setValues={(value) => setCollection({ ...collection, first_image: value[0] })} />
                </div>
                <div className='w-full flex justify-end'>
                    <div className="cursor-pointer px-3 py-2 bg-sapphire rounded-md justify-center items-center flex p-btn gap-2 shadow-ful w-fit" onClick={confirmEditCollection}>
                        {editCollectionLoading && <Loading size={20} />}
                        <div className="text-white text-sm font-normal capitalize leading-normal">Update</div>
                    </div>
                </div>

            </div>
            <div className='md:p-4 p-2 rounded-md shadow-md bg-white'>
                <Modal size='md' open={addProduct} onClose={() => setAddProduct(false)} >
                    <Modal.Header>
                        <Modal.Title>Add Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='px-2 -mx-2'>
                        <AllProduct onSelect={addSelectdProduct}/>
                        <div className="px-4">
                            <List hover>
                                {selectedProducts.map((item) => (
                                    <List.Item key={item.id}>
                                        <FlexboxGrid className="flex justify-center items-center">
                                            {/* Image */}
                                            <FlexboxGrid.Item colspan={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <img src={item.first_image_url} alt={item.name} style={{ width: '50px', height: '50px' }} />
                                            </FlexboxGrid.Item>
                                            {/* Name */}
                                            <FlexboxGrid.Item colspan={10} style={{ display: 'flex', alignItems: 'center' }}>
                                                <div>{item.name}</div>
                                            </FlexboxGrid.Item>
                                            {/* Price */}
                                            <FlexboxGrid.Item colspan={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <div>${item.price}</div>
                                            </FlexboxGrid.Item>
                                            {/* Actions */}
                                            <FlexboxGrid.Item colspan={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Button appearance="link" onClick={() => removeProduct(item.id)} startIcon={<TrashIcon />} className='hover:text-md hover:text-red-600'>
                                                    Delete
                                                </Button>
                                            </FlexboxGrid.Item>
                                        </FlexboxGrid>
                                    </List.Item>
                                ))}
                            </List>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => setAddProduct(false)} appearance="subtle">
                            Cancel
                        </Button>
                        <Button onClick={confirmAddProduct} appearance="primary">
                            {updateProductLoading && <Loading size={20} />}
                            Add
                        </Button>
                    </Modal.Footer>
                </Modal>
                <TableProduct items={productsData?.items} dataLoading={(productsLoading || updateProductLoading)} handleSort={handlePagination} checkedKeys={checkedKeys} setCheckedKeys={setCheckedKeys} onDelete={confirmRemoveProducts} onMultyDelete={() => confirmRemoveProducts(null)} onCreate={() => setAddProduct(true)} />
                <BasePagination pagination={productsData?.pagination} handlePagination={handlePagination} />
            </div>
        </div>
    );
};

export default MSingleCollection;
