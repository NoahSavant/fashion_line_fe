import React, { useState, useEffect } from 'react';
import { getConstantData } from '@/helpers/constantHelpers';
import PaginationDefault from '@/constants/PaginationDefault';
import { useNavigate } from 'react-router-dom';
import { InputNumber, Input } from "rsuite";
import {
    FunnelIcon
} from '@/components/icons.js';
import { TableProduct, Toolbar, BasePagination } from './components';
import { productEndpoints, tagEndpoints } from '@/apis'
import { useConfirmation, useApi } from '@/hooks';
import { ProductStatus } from '@/constants';
import { SelectTag, SelectCategory, SingleSelect } from '@/components/selects'
import { UploadFile } from '@/components/inputs'

const MSingleProduct = ({id}) => {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: '',
        description: '',
        short_description: '',
        tags: [],
        category: null,
        status: ProductStatus.OPEN,
        first_image: '',
        second_image: '',
        note: '',
    })
    
    const [fetchProduct, setFetchProduct] = useState(true);
    const { data: productData, callApi: handleGetProduct, loading: productLoading } = useApi();

    useEffect(() => {
        if (!fetchProduct || id == null) return;
        handleGetProduct(productEndpoints.getSingle, {
            params: {
                id
            }
        })
        setFetchProduct(false);
        setCheckedKeys([]);
    }, [fetchProduct]);

    console.log(product);

    return (
        <div className='p-5 flex flex-col gap-4'>
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
                                as="textarea" rows={2} placeholder="Short Description"
                                value={product.short_description}
                                onChange={(value) => setProduct({ ...product, short_description: value })}
                            />
                        </div>
                        <div className='flex flex-col gap-1.5'>
                            <label>Description</label>
                            <Input
                                as="textarea" rows={4} placeholder="Description"
                                value={product.description}
                                onChange={(value) => setProduct({ ...product, description: value })}
                            />
                        </div>
                        <div className='flex flex-col gap-1.5'>
                            <label>Note</label>
                            <Input
                                as="textarea" rows={2} placeholder="Note"
                                value={product.note}
                                onChange={(value) => setProduct({ ...product, note: value })}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-1.5'>
                            <label>Category</label>
                            <SelectCategory single={true} value={product.category} setValue={(value) => setProduct({ ...product, category: value })} />
                        </div>
                        <div className='flex flex-col gap-1.5'>
                            <label>Tags</label>
                            <SelectTag value={product.tags} setValue={(value) => setProduct({ ...product, tags: value })} />
                        </div>
                        <div className='flex flex-col gap-1.5'>
                            <label>Status</label>
                            <SingleSelect
                                data={getConstantData(ProductStatus)}
                                value={product.status}
                                onChange={(value) => setProduct({ ...product, status: value })}
                            />
                        </div>
                        <div className='flex flex-col gap-1.5'>
                            <label>File</label>
                            <UploadFile onFileUpload={(value) => setProduct({...product, first_image: value})}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MSingleProduct;
