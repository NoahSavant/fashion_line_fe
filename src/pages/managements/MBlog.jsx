import React, { useState, useEffect, useContext } from 'react';
import PaginationDefault from '@/constants/PaginationDefault';
import { useNavigate } from 'react-router-dom';
import { InputNumber, Input, RadioGroup, Radio, CheckboxGroup, Checkbox } from "rsuite";
import { FunnelIcon } from '@/components/icons.js';
import { TableBlog, Toolbar, BasePagination } from './components';
import { blogEndpoints } from '@/apis'
import { useApi } from '@/hooks';
import { PopupConfirmContext } from '@/contexts/PopupConfirmContext';
import { getIds } from '@/helpers/dataHelpers';

const MBlog = () => {
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
        });
        setFetchBlog(true);
    };

    const [filter, setFilter] = useState({
        tags: [],
        status: null,
    });

    const [fetchBlog, setFetchBlog] = useState(true);
    const [checkedKeys, setCheckedKeys] = useState([]);
    const { data: blogData, callApi: handleGetBlogs, loading: blogLoading } = useApi();
    const { data: deleteData, callApi: handleDeleteBlogs, loading: deleteBlogLoading } = useApi();

    useEffect(() => {
        if (!fetchBlog && !deleteData) return;
        handleGetBlogs(blogEndpoints.get, {
            params: {
                ...pagination,
                ...filter
            }
        });
        setFetchBlog(false);
        setCheckedKeys([]);
    }, [fetchBlog, deleteData]);

    useEffect(() => {
        setFetchBlog(true);
    }, [deleteData]);

    const confirmDeleteBlogs = (rowData = null) => {
        const ids = rowData ? [[rowData.id]] : [getIds(checkedKeys)];
        const message = rowData ? 'Are you sure to delete this blog?' : 'Are you sure to delete ' + checkedKeys.length + ' blog(s)?';
        openConfirmation(deleteBlogs, ids, message);
    };

    const deleteBlogs = async (ids) => {
        handleDeleteBlogs(
            blogEndpoints.delete,
            {
                method: 'DELETE',
                data: { ids }
            }
        );
    };

    const onEdit = (rowData) => {
        navigate('/m/single-blog?id=' + rowData.id);
    }

    return (
        <div className='p-5 flex flex-col'>
            <Toolbar addClick={() => navigate('/m/single-blog')} deleteClick={() => confirmDeleteBlogs(null)} checkedKeys={checkedKeys} />
            <div className='bg-white rounded-md p-1 shadow-md'>
                <TableBlog items={blogData?.items} dataLoading={(blogLoading || deleteBlogLoading)} handleSort={handlePagination} checkedKeys={checkedKeys} setCheckedKeys={setCheckedKeys} onDelete={confirmDeleteBlogs} onEdit={onEdit} />
                <BasePagination pagination={blogData?.pagination} handlePagination={handlePagination} />
            </div>
        </div>
    );
};

export default MBlog;
