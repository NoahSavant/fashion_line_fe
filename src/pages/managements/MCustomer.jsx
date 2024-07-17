import React, { useState, useEffect, useContext } from 'react';
import PaginationDefault from '@/constants/PaginationDefault';
import { useNavigate } from 'react-router-dom';
import { TableUser, Toolbar, BasePagination } from './components';
import { userEndpoints } from '@/apis';
import { useApi } from '@/hooks';
import { PopupConfirmContext } from '@/contexts/PopupConfirmContext';
import { getIds } from '@/helpers/dataHelpers';
import { UserStatus, Gender, UserRole } from '@/constants';

const MCustomer = () => {
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
        setFetchUser(true);
    };

    const [filter, setFilter] = useState({
        roles: [],
        status: null,
    });

    const [fetchUser, setFetchUser] = useState(true);
    const [checkedKeys, setCheckedKeys] = useState([]);
    const { data: userData, callApi: handleGetUsers, loading: userLoading } = useApi();
    const { data: deleteData, callApi: handleDeleteUsers, loading: deleteUserLoading } = useApi();

    useEffect(() => {
        if (!fetchUser) return;
        handleGetUsers(userEndpoints.get, {
            params: {
                ...pagination,
                ...filter,
                role: UserRole.CUSTOMER
            }
        });
        setFetchUser(false);
        setCheckedKeys([]);
    }, [fetchUser]);

    useEffect(() => {
        if (deleteData?.successMessage) {
            setFetchUser(true);
        }
    }, [deleteData]);

    const confirmDeleteUsers = (rowData = null) => {
        const ids = rowData ? [[rowData.id]] : [getIds(checkedKeys)];
        const message = rowData ? 'Are you sure to delete this user?' : 'Are you sure to delete ' + checkedKeys.length + ' user(s)?';
        openConfirmation(deleteUsers, ids, message);
    };

    const deleteUsers = async (ids) => {
        handleDeleteUsers(
            userEndpoints.delete,
            {
                method: 'DELETE',
                data: { ids }
            }
        );
    };

    const onEdit = (rowData) => {
        navigate('/m/single-user?id=' + rowData.id);
    }

    return (
        <div className='p-5 flex flex-col'>
            <Toolbar checkedKeys={checkedKeys} />
            <div className='bg-white rounded-md p-1 shadow-md'>
                <TableUser items={userData?.items} dataLoading={(userLoading || deleteUserLoading)} handleSort={handlePagination} checkedKeys={checkedKeys} setCheckedKeys={setCheckedKeys} onEdit={onEdit} />
                <BasePagination pagination={userData?.pagination} handlePagination={handlePagination} />
            </div>
        </div>
    );
};

export default MCustomer;
