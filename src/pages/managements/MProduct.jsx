import React, { useState, useEffect } from 'react';
import PaginationDefault from '@/constants/PaginationDefault';
import { useNavigate } from 'react-router-dom';
import { InputNumber, Input, RadioGroup, Radio, CheckboxGroup, Checkbox } from "rsuite";
import {
    FunnelIcon
} from '@/components/icons.js';
import { TableProduct, Toolbar, BasePagination } from './components';
import { productEndpoints, tagEndpoints } from '@/apis'
import { useConfirmation, useApi } from '@/hooks';


const MProduct = () => {
    const navigate = useNavigate();

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
        setFetchProduct(true);
    };

    const [filter, setFilter] = useState({
        tags: [],
        status: null,
    });
    const [fetchProduct, setFetchProduct] = useState(true);
    const [checkedKeys, setCheckedKeys] = useState([]);
    const { data: productData, callApi: handleGetProducts, loading: productLoading } = useApi();

    useEffect(() => {
        if (!fetchProduct) return;
        handleGetProducts(productEndpoints.get, {
            params: {
                ...pagination,
                ...filter
            }
        })
        setFetchProduct(false);
        setCheckedKeys([]);
    }, [fetchProduct]);

    return (
        <div className='p-5 flex flex-col'>
            <Toolbar addClick={() => navigate('/m/single-product')}/>
            <div className='bg-white rounded-md p-1 shadow-md'>
                <TableProduct items={productData?.data?.items} dataLoading={(productLoading)} handleSort={handlePagination} checkedKeys={checkedKeys} setCheckedKeys={setCheckedKeys} onDelete={() => { }} onEdit={() => { }} />
                <BasePagination pagination={productData?.data?.pagination} handlePagination={handlePagination} />
            </div>
        </div>
    );
};

export default MProduct;
