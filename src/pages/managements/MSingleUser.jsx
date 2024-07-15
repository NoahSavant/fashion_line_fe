import React, { useState, useEffect, useContext } from 'react';
import { getConstantData, getConstantTitle } from '@/helpers/constantHelpers';
import { Input, Modal, Button, DatePicker, InputNumber, MaskedInput, SelectPicker } from "rsuite";
import { userEndpoints } from '@/apis';
import { useApi } from '@/hooks';
import { UserStatus, Gender, UserRole } from '@/constants';
import { UploadFile } from '@/components/inputs';
import { PopupConfirmContext } from '@/contexts/PopupConfirmContext';
import { Loading } from '@/components';
import { useSearchParams, useNavigate } from "react-router-dom";
import { SelectDateTime } from '@/components/selects';
import { InputPassword } from '@/components/inputs';
import MOrder from './MOrder';

const MSingleUser = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [id, setId] = useState(null);
    const [user, setUser] = useState({
        username: '',
        email: '',
        role: '',
        image_url: null,
        phonenumber: '',
        status: UserStatus.ACTIVE,
        gender: '',
        date_of_birth: null
    });

    const { openConfirmation } = useContext(PopupConfirmContext);

    useEffect(() => {
        if (searchParams.has('id')) {
            setId(searchParams.get('id'));
        } else {
            navigate('/not-found')
        }
    }, [searchParams]);

    const [fetchUser, setFetchUser] = useState(true);

    const { data: userData, callApi: handleGetUser, loading: userLoading } = useApi();
    const { data: editUserData, callApi: handleEditUser, loading: editUserLoading } = useApi();

    useEffect(() => {
        if (!fetchUser || id == null) return;
        handleGetUser(userEndpoints.getSingle + id, {});
        setFetchUser(false);
    }, [fetchUser, id]);

    useEffect(() => {
        if (!userData) return;
        setUser({...userData, password: '', password_confirmation: ''});
    }, [userData]);

    const confirmEditUser = () => {
        openConfirmation(editUser, [], 'Are you sure to update this user?');
    };

    const editUser = () => {
        const formData = new FormData();
        formData.append('username', user.username);
        formData.append('email', user.email);
        formData.append('role', user.role);
        formData.append('phonenumber', user.phonenumber);
        formData.append('status', user.status);
        formData.append('gender', user.gender);
        formData.append('date_of_birth', user.date_of_birth);
        if(user.password !== '') {
            formData.append('password', user.password);
            formData.append('password_confirmation', user.password_confirmation);
        }

        if (user.image) {
            formData.append('image', user.image);
        }

        handleEditUser(userEndpoints.update + '/' + id + '?_method=PUT', {
            method: "POST",
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    };

    return (
        <>
            <div className='p-5 flex flex-col gap-4'>
                {(userLoading) && <Loading size={40} />}
                <div className='rounded-md shadow-md bg-white py-2 flex justify-between px-2 items-center'>
                    <div className='text-lg font-semibold text-sapphire'>User Detail</div>
                    <div className="cursor-pointer px-3 py-2 bg-sapphire rounded-md justify-center items-center flex p-btn gap-2 shadow-ful w-fit" onClick={confirmEditUser}>
                        {editUserLoading && <Loading size={20} />}
                        <div className="text-white text-sm font-normal capitalize leading-normal">Update</div>
                    </div>
                </div>
                <div className='rounded-md shadow-md bg-white py-2 flex flex-col gap-2'>
                    <div className='flex flex-col gap-4 p-5'>
                        <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
                            <div className='flex flex-col gap-4'>
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
                                                value={user?.date_of_birth ? new Date(user?.date_of_birth) : new Date()}
                                                onChange={(value) => setUser({ ...user, date_of_birth: value.toISOString() })}
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
                            </div>
                            <div className='flex flex-col gap-4'>
                                <div className='grid grid-cols-2 gap-4'>
                                    <div className='flex flex-col gap-1.5'>
                                        <label>Status</label>
                                        <SelectPicker
                                            data={getConstantData(UserStatus)}
                                            value={user?.status}
                                            onChange={(value) => setUser({ ...user, status: value })}
                                        />
                                    </div>
                                    <div className='flex flex-col gap-1.5'>
                                        <label>Role</label>
                                        <Input
                                            placeholder="Email"
                                            value={getConstantTitle(UserRole, user?.role)}
                                        />
                                    </div>
                                </div>
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
                                    <label>Password</label>
                                    <InputPassword value={user?.password} onChange={(value) => setUser({ ...user, password: value })} placeholder='Password' />
                                </div>
                                <div className='flex flex-col gap-1.5'>
                                    <label>Password Confirmation</label>
                                    <InputPassword value={user?.password_confirmation} onChange={(value) => setUser({ ...user, password_confirmation: value })} placeholder='Confirm password' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                (id && user?.role == UserRole.CUSTOMER) && <MOrder user_id={id}/>
            }
        </>
    );
};

export default MSingleUser;
