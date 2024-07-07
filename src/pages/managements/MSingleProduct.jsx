import React, { useState, useEffect, useContext } from 'react';
import { getConstantData } from '@/helpers/constantHelpers';
import PaginationDefault from '@/constants/PaginationDefault';
import { Input, Modal, Button, InputNumber, TagInput, CheckPicker, SelectPicker } from "rsuite";
import { BasePagination, TableVariant } from './components';
import { productEndpoints, variantEndpoints } from '@/apis'
import { useApi } from '@/hooks';
import { ProductStatus, TrueFalseStatus } from '@/constants';
import { SelectTag, SelectCategory, SingleSelect, SelectConstant, MultiSelect } from '@/components/selects'
import { UploadFile } from '@/components/inputs'
import { PopupConfirmContext } from '@/contexts/PopupConfirmContext';
import { Loading } from '@/components';
import { useSearchParams } from "react-router-dom";
import { getIds } from '@/helpers/dataHelpers';
import { convertStringToArray, convertArrayToString } from '@/helpers/dataHelpers';
import MColor from './MColor';
import MSize from './MSize';

const MSingleProduct = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [id, setId] = useState(null);
    const baseProduct = {
        name: '',
        description: '',
        short_description: '',
        tags: [],
        category_id: null,
        status: ProductStatus.OPEN,
        first_image: null,
        second_image: null,
        note: '',
        original_price: 0,
        price: 0,
    };
    const [fetchProduct, setFetchProduct] = useState(true);
    const [fetchVariants, setFetchVariants] = useState(false);
    const [product, setProduct] = useState(baseProduct);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);

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
        setFetchVariants(true);
    };

    const sampleVariant = {
        id: -1,
        product_size_id: null,
        product_color_id: null,
        status: ProductStatus.OPEN,
        stock_limit: TrueFalseStatus.TRUE,
        original_price: 0,
        price: 0,
        stock: 0,
    }

    useEffect(() => {
        if (searchParams.has('id')) {
            setId(searchParams.get('id'));
        }
    }, []);

    useEffect(() => {
        if(sizes.length > 0 && colors.length > 0) {
            setFetchVariants(true);
        }
    }, [sizes, colors]);

    const [variants, setVariants] = useState([]);
    const [editData, setEditData] = useState(null);
    const [createData, setCreateData] = useState(null);

    const { data: productData, callApi: handleGetProduct, loading: productLoading } = useApi();
    const { data: createProductData, callApi: handleCreateProduct, loading: createProductLoading } = useApi();
    const { data: editProductData, callApi: handleEditProduct, loading: editProductLoading } = useApi();
    const { data: variantsData, callApi: handleGetVariants, loading: variantsLoading } = useApi();
    const { data: addVariantData, callApi: handleAddVariant, loading: addVariantLoading } = useApi();
    const { data: editVariantData, callApi: handleEditVariant, loading: editVariantLoading } = useApi();
    const { data: deleteVariantsData, callApi: handleDeleteVariants, loading: deleteVariantsLoading } = useApi();

    useEffect(() => {
        if (!fetchProduct || id == null) return;
        handleGetProduct(productEndpoints.getSingle + id, {})
        setFetchProduct(false);
    }, [fetchProduct, id]);

    useEffect(() => {
        if (!createProductData) return;
        window.location.href = `/m/single-product?id=${createProductData?.data?.id}`;
    }, [createProductData]);


    useEffect(() => {
        if (!productData) return;
        setProduct({ ...productData, tags: getIds(productData.tags)});
    }, [productData]);

    useEffect(() => {
        if (!editProductData) return;
        setFetchProduct(false);
    }, [editProductData]);

    useEffect(() => {
        if (!fetchVariants || !id) return;
        handleGetVariants(variantEndpoints.get + '/' + id, {
            params: {
                ...pagination,
            }
        });
        setFetchVariants(false);
        setCheckedKeys([]);
    }, [fetchVariants, id]);

    useEffect(() => {
        if (editVariantData?.successMessage || addVariantData?.successMessage || deleteVariantsData?.successMessage)
        setFetchVariants(true);
        setEditData(null);
        setCreateData(null);
    }, [editVariantData, addVariantData, deleteVariantsData]);

    useEffect(() => {
        setFetchProduct(true);
    }, [addVariantData]);

    useEffect(() => {
        if (variantsData?.items && variantsData?.items.length > 0) {
            const updatedVariants = variantsData?.items.map(variant => ({
                ...variant,
            }));
            setVariants(updatedVariants);
        }
    }, [variantsData]);

    const confirmDeleteVariants = (rowData = null) => {
        const variantIds = rowData ? [[rowData.id]] : [getIds(checkedKeys)];
        const message = rowData ? 'Are you sure to delete this variant?' : 'Are you sure to delete ' + checkedKeys.length + ' variant(s)?';
        openConfirmation(deleteVariants, variantIds, message);
    };

    const deleteVariants = async (ids) => {
        if (!id) {
            const filteredVariants = variants.filter(variant => !ids.includes(variant.id));
            setVariants(filteredVariants);
        } else {
            handleDeleteVariants(
                variantEndpoints.delete,
                {
                    method: 'DELETE',
                    data: { ids }
                }
            );
        }
    };

    const toThousands = (value) => {
        return value ? `${value}`.replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&.') : value;
    }

    const validVariant = (variant) => {
        if (variant.size == [] || variant.color == '' || variant.original_price == 0 || variant.price == 0 || variant.image == null) {
            return false;
        }
        return true;
    }

    const confirmCreateVariant = () => {
        if(!id) {
            if(!validVariant(createData)) {
                openConfirmation(() => {}, [], "Your variant data is invalid check again");
            } else {
                setVariants([ ...variants, createData ]);
                setCreateData(null);
            }
        } else {
            const formData = new FormData();
            formData.append('product_size_id', createData?.product_size_id);
            formData.append('product_color_id', createData?.product_color_id);
            formData.append('status', createData?.status);
            formData.append('original_price', createData?.original_price);
            formData.append('price', createData?.price);
            formData.append('stock', createData?.stock);
            formData.append('stock_limit', createData?.stock_limit);
            handleAddVariant(variantEndpoints.create + '/' + id, {
                method: "POST",
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        }
    }

    const confirmEditVariants = () => {
        openConfirmation(editVariants, [], 'Are you sure to update this variant?');
    };

    const createProduct = () => {
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('short_description', product.short_description);
        formData.append('category_id', product.category_id);
        formData.append('status', product.status);
        formData.append('note', product.note);
        product.tags.forEach((tag, index) => {
            formData.append(`tags[${index}]`, tag);
        });

        if (product.first_image) {
            formData.append('first_image', product.first_image);
        }
        if (product.second_image) {
            formData.append('second_image', product.second_image);
        }

        handleCreateProduct(productEndpoints.create, {
            method: "POST",
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    };

    const editProduct = () => {
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('short_description', product.short_description);
        formData.append('category_id', product.category_id);
        formData.append('status', product.status);
        formData.append('note', product.note);
        if(product.tags.length == 0) {
            formData.append('tags', null);

        }
        product.tags.forEach((tag, index) => {
            formData.append(`tags[${index}]`, tag);
        });

        if (product.first_image) {
            formData.append('first_image', product.first_image);
        }
        if (product.second_image) {
            formData.append('second_image', product.second_image);
        }

        handleEditProduct(productEndpoints.update + '/' + id + '?_method=PUT', {
            method: "POST",
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    };

    const editVariants = async () => {
        if(!id) {
            const updatedVariants = variants.map(variant =>
                variant.id === editData?.id ? editData : variant
            );
            setVariants(updatedVariants);
            setEditData(null);
        }
        const formData = new FormData();
        formData.append('product_size_id', editData?.product_size_id);
        formData.append('product_color_id', editData?.product_color_id);
        formData.append('status', editData?.status);
        formData.append('original_price', editData?.original_price);
        formData.append('price', editData?.price);
        formData.append('stock', editData?.stock);
        formData.append('stock_limit', editData?.stock_limit);

        handleEditVariant(variantEndpoints.update + '/' + editData?.id + '?_method=PUT', {
            method: "POST",
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    };

    return (
        <div className='p-5 flex flex-col gap-4'>
            {(productLoading || variantsLoading) && <Loading size={40} />}
            <div className='rounded-md shadow-md bg-white py-2'>
                <div className='text-lg font-semibold px-2 text-sapphire'>{id ? 'Product Detail' : 'Create Product'}</div>
            </div>
            <div className='rounded-md shadow-md bg-white py-2 flex flex-col gap-2'>
                <div className='grid md:grid-cols-2 col-span-2 gap-4 p-5'>
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-1.5'>
                            <label>Name</label>
                            <Input
                                placeholder="Name"
                                value={product.name}
                                onChange={(value) => setProduct({ ...product, name: value })}
                            />
                        </div>
                        <div className='flex flex-col gap-1.5'>
                            <label>Short Description</label>
                            <Input
                                as="textarea" rows={3} placeholder="Short Description"
                                value={product.short_description}
                                onChange={(value) => setProduct({ ...product, short_description: value })}
                            />
                        </div>
                        <div className='flex flex-col gap-1.5'>
                            <label>Description</label>
                            <Input
                                as="textarea" rows={5} placeholder="Description"
                                value={product.description}
                                onChange={(value) => setProduct({ ...product, description: value })}
                            />
                        </div>
                        <div className='flex flex-col gap-1.5'>
                            <label>Note</label>
                            <Input
                                as="textarea" rows={4} placeholder="Note"
                                value={product.note}
                                onChange={(value) => setProduct({ ...product, note: value })}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-1.5'>
                            <label>Category</label>
                            <SelectCategory single={true} value={product.category_id} setValue={(value) => setProduct({ ...product, category_id: value })} />
                        </div>
                        <div className='flex flex-col gap-1.5'>
                            <label>Tags</label>
                            <SelectTag value={product.tags} setValue={(value) => setProduct({ ...product, tags: value })} />
                        </div>
                        <div className='grid grid-cols-2 gap-2'>
                            <div className='flex flex-col gap-1.5'>
                                <label>Status</label>
                                <SingleSelect
                                    data={getConstantData(ProductStatus)}
                                    value={product.status}
                                    onChange={(value) => setProduct({ ...product, status: value })}
                                />
                            </div>
                            <div className='flex flex-col gap-1.5 w-full'>
                                <label>Stock Limit</label>
                                <SelectConstant single={true} value={product?.stock_limit} setValue={(value) => setProduct({ ...product, stock_limit: value })} constant={TrueFalseStatus} />
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-2'>
                            <div className='flex flex-col gap-1.5 w-full'>
                                <label>Original Price</label>
                                <InputNumber postfix='đ̲' min={0} formatter={toThousands} value={product?.original_price}
                                    onChange={(value) => setProduct({ ...product, original_price: value })} />
                            </div>
                            <div className='flex flex-col gap-1.5 w-full'>
                                <label>Price</label>
                                <InputNumber postfix='đ̲' min={0} formatter={toThousands} value={product?.price}
                                    onChange={(value) => setProduct({ ...product, price: value })} />
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-2'>
                            <div className='flex flex-col gap-1.5'>
                                <label>First Image</label>
                                <UploadFile className='w-full h-[135px]' values={product?.first_image_url ?? []} number={1} setValues={(value) => setProduct({ ...product, first_image: value[0] })} />
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <label>Second Image</label>
                                <UploadFile className='w-full h-[135px]' values={product?.second_image_url ?? []} number={1} setValues={(value) => setProduct({ ...product, second_image: value[0] })} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full flex justify-end px-4'>
                    <div className="cursor-pointer px-3 py-2 bg-sapphire rounded-md justify-center items-center flex p-btn gap-2 shadow-ful w-fit" onClick={id ? editProduct : createProduct}>
                        {(createProductLoading || editProductLoading) && <Loading size={20} />}
                        <div className="text-white text-sm font-normal capitalize leading-normal">{id ? 'Update' : 'Create'}</div>
                    </div>
                </div>
            </div>
            {
                (id && sizes.length > 0 && colors.length > 0) && 
                <div className='md:h-[420px] md:p-4 p-2 rounded-md shadow-md bg-white'>
                    <Modal size='sm' open={createData} onClose={() => setCreateData(null)} >
                        <Modal.Header>
                            <Modal.Title>Add Variant</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className='px-2 -mx-2'>
                            <div className='flex flex-col gap-4 items-end'>
                                <div className='flex flex-col gap-1.5 w-full'>
                                    <label>Size</label>
                                    <SelectPicker
                                        data={sizes.map(size => ({
                                            label: size.size,
                                            value: size.id
                                        }))}
                                        value={createData?.product_size_id}
                                        onChange={(value) => setCreateData({ ...createData, product_size_id: value })}
                                    />
                                </div>
                                <div className='flex flex-col gap-1.5 w-full'>
                                    <label>Color Name</label>
                                    <SelectPicker
                                        data={colors.map(color => ({
                                            label: color.color,
                                            value: color.id
                                        }))}
                                        value={createData?.product_color_id}
                                        onChange={(value) => setCreateData({ ...createData, product_color_id: value })}
                                    />
                                </div>
                                {
                                    createData?.product_color_id &&
                                    <div className='flex flex-col gap-1.5 w-full'>
                                        <label>Image</label>
                                        <div className='rounded-md border-2 border-gray-400 flex justify-center items-center border-dashed'>
                                            <img
                                                src={colors.find(color => color.id == createData?.product_color_id)?.image_url}
                                                alt=""
                                                className={`object-contain h-[120px]`}
                                            />
                                        </div>
                                    </div>
                                }
                                <div className='flex flex-col gap-1.5 w-full'>
                                    <label>Status</label>
                                    <SelectConstant single={true} value={createData?.status} setValue={(value) => setCreateData({ ...createData, status: value })} constant={ProductStatus} />
                                </div>
                                <div className='flex flex-col gap-1.5 w-full'>
                                    <label>Stock Limit</label>
                                    <SelectConstant single={true} value={createData?.stock_limit} setValue={(value) => setCreateData({ ...createData, stock_limit: value })} constant={TrueFalseStatus} />
                                </div>
                                <div className='flex flex-col gap-1.5 w-full'>
                                    <label>Stock</label>
                                    <InputNumber min={0} step={1} value={createData?.stock}
                                        onChange={(value) => setCreateData({ ...createData, stock: value })} />
                                </div>
                                <div className='flex flex-col gap-1.5 w-full'>
                                    <label>Original Price</label>
                                    <InputNumber postfix='đ̲' min={0} formatter={toThousands} value={createData?.original_price}
                                        onChange={(value) => setCreateData({ ...createData, original_price: value })} />
                                </div>
                                <div className='flex flex-col gap-1.5 w-full'>
                                    <label>Price</label>
                                    <InputNumber postfix='đ̲' min={0} formatter={toThousands} value={createData?.price}
                                        onChange={(value) => setCreateData({ ...createData, price: value })} />
                                </div>

                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => setCreateData(null)} appearance="subtle">
                                Cancel
                            </Button>
                            <Button onClick={confirmCreateVariant} appearance="primary">
                                {addVariantLoading && <Loading size={20} />}
                                Add
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal size='sm' open={editData} onClose={() => setEditData(null)} >
                        <Modal.Header>
                            <Modal.Title>Edit Variant</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className='px-2 -mx-2'>
                            <div className='flex flex-col gap-4 items-end'>
                                <div className='flex flex-col gap-1.5 w-full'>
                                    <label>Size</label>
                                    <SelectPicker
                                        data={sizes.map(size => ({
                                            label: size.size,
                                            value: size.id
                                        }))}
                                        value={editData?.product_size_id}
                                        onChange={(value) => setEditData({ ...editData, product_size_id: value })}
                                    />
                                </div>
                                <div className='flex flex-col gap-1.5 w-full'>
                                    <label>Color Name</label>
                                    <SelectPicker
                                        data={colors.map(color => ({
                                            label: color.color,
                                            value: color.id
                                        }))}
                                        value={editData?.product_color_id}
                                        onChange={(value) => setEditData({ ...editData, product_color_id: value })}
                                    />
                                </div>
                                <div className='flex flex-col gap-1.5 w-full'>
                                    <label>Status</label>
                                    <SelectConstant single={true} value={editData?.status} setValue={(value) => setEditData({ ...editData, status: value })} constant={ProductStatus} />
                                </div>
                                <div className='flex flex-col gap-1.5 w-full'>
                                    <label>Stock Limit</label>
                                    <SelectConstant single={true} value={editData?.stock_limit} setValue={(value) => setEditData({ ...editData, stock_limit: value })} constant={TrueFalseStatus} />
                                </div>
                                <div className='flex flex-col gap-1.5 w-full'>
                                    <label>Stock</label>
                                    <InputNumber min={0} step={1} value={editData?.stock}
                                        onChange={(value) => setEditData({ ...editData, stock: value })} />
                                </div>
                                <div className='flex flex-col gap-1.5 w-full'>
                                    <label>Original Price</label>
                                    <InputNumber postfix='đ̲' min={0} formatter={toThousands} value={editData?.original_price}
                                        onChange={(value) => setEditData({ ...editData, original_price: value })} />
                                </div>
                                <div className='flex flex-col gap-1.5 w-full'>
                                    <label>Price</label>
                                    <InputNumber postfix='đ̲' min={0} formatter={toThousands} value={editData?.price}
                                        onChange={(value) => setEditData({ ...editData, price: value })} />
                                </div>
                                <div className='flex flex-col gap-1.5 w-full'>
                                    <label>Image</label>
                                    <img
                                        src={colors.find(color => color.id == editData?.product_color_id)?.image_url}
                                        alt=""
                                        className={`rounded-md shadow-full object-cover`}
                                    />
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => setEditData(null)} appearance="subtle">
                                Cancel
                            </Button>
                            <Button onClick={confirmEditVariants} appearance="primary">
                                {editVariantLoading && <Loading size={20} />}
                                Update
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <TableVariant items={variants} dataLoading={(id && (variantsLoading || deleteVariantsLoading || addVariantLoading))} handleSort={handlePagination} checkedKeys={checkedKeys} setCheckedKeys={setCheckedKeys} onDelete={confirmDeleteVariants} onMultyDelete={() => confirmDeleteVariants(null)} onEdit={setEditData} onCreate={() => setCreateData({ ...sampleVariant, id: new Date().toLocaleTimeString(), original_price: product.original_price, price: product.price, stock_limit: product.stock_limit })} />
                    <BasePagination pagination={variantsData?.pagination} handlePagination={handlePagination} />
                </div>
            }
            {
                id && <MColor productId={id} setColors={setColors} />
            }
            {
                id && <MSize productId={id} setSizes={setSizes} />
            }
        </div>
    );
};

export default MSingleProduct;
