import React, { useState, useEffect, useContext } from 'react';
import PaginationDefault from '@/constants/PaginationDefault';
import { useNavigate } from 'react-router-dom';
import { TableUser, Toolbar, BasePagination } from './components';
import { userEndpoints } from '@/apis';
import { useApi } from '@/hooks';
import { PopupConfirmContext } from '@/contexts/PopupConfirmContext';
import { getIds } from '@/helpers/dataHelpers';
import { UserStatus, Gender, UserRole } from '@/constants';
import { getConstantData, getConstantTitle } from '@/helpers/constantHelpers';
import { UploadFile } from '@/components/inputs';
import { Input, Modal, Button, DatePicker, MaskedInput, SelectPicker } from "rsuite";
import { Loading } from '@/components';
import { SelectDateTime } from '@/components/selects';
import { InputPassword } from '@/components/inputs';

const MStaff = () => {
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

    const baseUser = {
        username: '',
        email: '',
        role: '',
        image_url: null,
        image: null,
        phonenumber: '',
        status: UserStatus.ACTIVE,
        gender: '',
        date_of_birth: null,
        password: '',
        password_confirmation: ''
    }

    const [user, setUser] = useState(null);

    const [filter, setFilter] = useState({
        roles: [],
        status: null,
    });

    const [fetchUser, setFetchUser] = useState(true);
    const [checkedKeys, setCheckedKeys] = useState([]);
    const { data: userData, callApi: handleGetUsers, loading: userLoading } = useApi();
    const { data: deleteData, callApi: handleDeleteUsers, loading: deleteUserLoading } = useApi();
    const { data: createUserData, callApi: handleCreateUser, loading: createUserLoading } = useApi();

    useEffect(() => {
        if (!fetchUser) return;
        handleGetUsers(userEndpoints.get, {
            params: {
                ...pagination,
                ...filter,
                role: UserRole.STAFF
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

    useEffect(() => {
        if (createUserData?.successMessage) {
            setFetchUser(true);
        }
    }, [createUserData]);

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

    const createUser = () => {
        const formData = new FormData();
        formData.append('username', user.username);
        formData.append('email', user.email);
        formData.append('role', user.role);
        formData.append('phonenumber', user.phonenumber);
        formData.append('status', user.status);
        formData.append('password', user.password);
        formData.append('password_confirmation', user.password_confirmation);
        formData.append('gender', user.gender);
        formData.append('date_of_birth', user.date_of_birth ? user.date_of_birth.toISOString() : '');

        if (user.image) {
            formData.append('image', user.image);
        }

        handleCreateUser(userEndpoints.create, {
            method: "POST",
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    };

    const onEdit = (rowData) => {
        navigate('/m/single-user?id=' + rowData.id);
    }

    return (
        <div className='p-5 flex flex-col'>
            <Modal size='sm' open={user} onClose={() => setUser(null)} >
                <Modal.Header>
                    <Modal.Title>Create Staff</Modal.Title>
                </Modal.Header>
                <Modal.Body className='px-2 -mx-2'>
                    <div className='flex flex-col gap-4 p-5'>
                        <div className='md:col-span-5 flex flex-col gap-4'>
                            <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
                                <div className='flex flex-col gap-1.5'>
                                    <label>Image</label>
                                    <UploadFile className='w-full h-[190px]' values={user?.image_url ?? []} number={1} setValues={(value) => setUser({ ...user, image: value[0] })} />
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <div className='flex flex-col gap-1.5'>
                                        <label>Username</label>
                                        <Input
                                            placeholder="Username"
                                            value={user?.username}
                                            onChange={(value) => setUser({ ...user, username: value })}
                                        />
                                    </div>
                                    <div className='flex flex-col gap-1.5'>
                                        <label>Gender</label>
                                        <SelectPicker
                                            data={getConstantData(Gender)}
                                            value={user?.gender}
                                            onChange={(value) => setUser({ ...user, gender: value })}
                                        />
                                    </div>
                                    <div className='flex flex-col gap-1.5'>
                                        <label>Date of Birth</label>
                                        <SelectDateTime
                                            value={user?.date_of_birth}
                                            onChange={(value) => setUser({ ...user, date_of_birth: value })}
                                            placeholder='Your birth day'
                                            placement={'bottomEnd'}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <label>Email</label>
                                <Input
                                    placeholder="Email"
                                    value={user?.email}
                                    onChange={(value) => setUser({ ...user, email: value })}
                                />
                            </div>
                            <InputPassword value={user?.password} onChange={(value) => setUser({ ...user, password: value })} placeholder='Password' />
                            <InputPassword value={user?.password_confirmation} onChange={(value) => setUser({ ...user, password_confirmation: value })} placeholder='Confirm password' />
                            <div className='flex flex-col gap-1.5'>
                                <label>Phone Number</label>
                                <MaskedInput
                                    value={user?.phonenumber}
                                    onChange={(value) => setUser({ ...user, phonenumber: value })}
                                    mask={[/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/]}
                                    guide={true}
                                    showMask={false}
                                    keepCharPositions={true}
                                    placeholder="Phone Number"
                                />
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <label>Status</label>
                                <SelectPicker
                                    data={getConstantData(UserStatus)}
                                    value={user?.status}
                                    onChange={(value) => setUser({ ...user, status: value })}
                                />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setUser(null)} appearance="subtle">
                        Cancel
                    </Button>
                    <Button onClick={createUser} appearance="primary">
                        {createUserLoading && <Loading size={20} />}
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
            <Toolbar addClick={() => setUser(baseUser)} deleteClick={() => confirmDeleteUsers(null)} checkedKeys={checkedKeys} />
            <div className='bg-white rounded-md p-1 shadow-md'>
                <TableUser items={userData?.items} dataLoading={(userLoading || deleteUserLoading)} handleSort={handlePagination} checkedKeys={checkedKeys} setCheckedKeys={setCheckedKeys} onDelete={confirmDeleteUsers} onEdit={onEdit} />
                <BasePagination pagination={userData?.pagination} handlePagination={handlePagination} />
            </div>
        </div>
    );
};

export default MStaff;
