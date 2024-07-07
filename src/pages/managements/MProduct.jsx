import React, { useState, useEffect, useContext } from 'react';
import PaginationDefault from '@/constants/PaginationDefault';
import { useNavigate } from 'react-router-dom';
import { InputNumber, Input, RadioGroup, Radio, CheckboxGroup, Checkbox } from "rsuite";
import {
    FunnelIcon
} from '@/components/icons.js';
import { TableProduct, Toolbar, BasePagination } from './components';
import { productEndpoints, tagEndpoints } from '@/apis'
import { useApi } from '@/hooks';
import { PopupConfirmContext } from '@/contexts/PopupConfirmContext';
import { getIds } from '@/helpers/dataHelpers';


const MProduct = () => {
    const navigate = useNavigate();
    const { openConfirmation } = useContext(PopupConfirmContext);

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
    const { data: deleteData, callApi: handleDeleteProducts, loading: deleteProductLoading } = useApi();

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

    useEffect(() => {
        if(deleteData?.successMessage) {
            setFetchProduct(true);
        }
    }, [deleteData]);

    const confirmDeleteProducts = (rowData = null) => {
        const ids = rowData ? [[rowData.id]] : [getIds(checkedKeys)];
        const message = rowData ? 'Are you sure to delete this product?' : 'Are you sure to delete ' + checkedKeys.length + ' product(s)?';
        openConfirmation(deleteProducts, ids, message);
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

    const onEdit = (rowData) => {
        navigate('/m/single-product?id=' + rowData.id);
    }

    return (
        <div className='p-5 flex flex-col'>
            <Toolbar addClick={() => navigate('/m/single-product')} deleteClick={() => confirmDeleteProducts(null)} checkedKeys={checkedKeys}/>
            <div className='bg-white rounded-md p-1 shadow-md'>
                <TableProduct items={productData?.items} dataLoading={(productLoading || deleteProductLoading)} handleSort={handlePagination} checkedKeys={checkedKeys} setCheckedKeys={setCheckedKeys} onDelete={confirmDeleteProducts} onEdit={onEdit} />
                <BasePagination pagination={productData?.pagination} handlePagination={handlePagination} />
            </div>
        </div>
    );
};

export default MProduct;
