import { getAuthentication } from "@/helpers/authenHelpers";
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
import { current } from "@reduxjs/toolkit";

const BaseProfile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [id, setId] = useState(null);

    const [cpData, setCPData] = useState({
        current_password: '',
        new_password: '',
        new_password_confirmation: ''
    });

    const { openConfirmation } = useContext(PopupConfirmContext);

    useEffect(() => {
        const currentUser = getAuthentication()?.user ?? null;
        if(currentUser) {
            console.log(currentUser);
            setId(currentUser?.id);
        } else {
            navigate('/');
        }
    }, []);

    const [fetchUser, setFetchUser] = useState(true);

    const { data: userData, callApi: handleGetUser, loading: userLoading } = useApi();
    const { data: editUserData, callApi: handleEditUser, loading: editUserLoading } = useApi();
    const { data: changePasswordData, callApi: handleChangePassword, loading: changePasswordLoading } = useApi();

    useEffect(() => {
        if (!fetchUser || id == null) return;
        handleGetUser(userEndpoints.getSingle + id, {});
        setFetchUser(false);
    }, [fetchUser, id]);

    useEffect(() => {
        if (!editUserData) return;
        setFetchUser(true);
    }, [editUserData]);

    useEffect(() => {
        if (!userData) return;
        setUser(userData);
    }, [userData]);

    useEffect(() => {
        if (!changePasswordData) return;
        navigate('/logout')
    }, [changePasswordData]);

    const confirmEditUser = () => {
        openConfirmation(editUser, [], 'Bạn có chắc muốn thay đổi thông tin tài khoản ?');
    };

    const confirmChangePassword = () => {
        openConfirmation(changePassword, [], 'Bạn có chắc muốn thay đổi mật khẩu ?');
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

    const changePassword = () => {
        const formData = new FormData();
        formData.append('current_password', cpData.current_password);
        formData.append('new_password', cpData.new_password);
        formData.append('new_password_confirmation', cpData.new_password_confirmation);

        handleChangePassword(userEndpoints.update + '/change-password', {
            method: "POST",
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    };

    return (
        <div className='lg:p-10 p-5 flex flex-col gap-4'>
            {(userLoading) && <Loading size={40} />}
            <div className='rounded-md shadow-md bg-white py-2 flex justify-between px-2 items-center'>
                <div className='text-lg font-semibold text-sapphire'>Account Management</div>
            </div>
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-5">
                <div className='lg:col-span-2 rounded-md shadow-md bg-white py-2 flex flex-col gap-2'>
                    <div className='text-lg font-semibold text-sapphire px-5 py-2'>Profile</div>
                    <div className='flex flex-col gap-4 px-5 py-2'>
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

                            </div>
                            <div className='flex flex-col gap-4'>
                                <div className='flex flex-col gap-1.5'>
                                    <label>Role</label>
                                    <Input
                                        placeholder="Email"
                                        value={getConstantTitle(UserRole, user?.role)}
                                    />
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
                                    <label>Email</label>
                                    <Input
                                        placeholder="Email"
                                        value={user?.email}
                                        onChange={(value) => setUser({ ...user, email: value })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full justify-end">
                            <div className="cursor-pointer px-3 py-2 bg-sapphire rounded-md justify-center items-center flex p-btn gap-2 shadow-ful w-fit" onClick={confirmEditUser}>
                                {editUserLoading && <Loading size={20} />}
                                <div className="text-white text-sm font-normal capitalize leading-normal">Update</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='rounded-md shadow-md bg-white py-2 flex flex-col gap-2'>
                    <div className='text-lg font-semibold text-sapphire px-5 py-2'>Change password</div>
                    <div className='flex flex-col gap-4 px-5 py-2'>
                        <div className="flex flex-col gap-5">
                            <div className='flex flex-col gap-1.5'>
                                <label>Current Password</label>
                                <InputPassword value={cpData?.current_password} onChange={(value) => setCPData({ ...cpData, current_password: value })} placeholder='Current password' />
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <label>New Password</label>
                                <InputPassword value={cpData?.new_password} onChange={(value) => setCPData({ ...cpData, new_password: value })} placeholder='New password' />
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <label>New Password Confirmation</label>
                                <InputPassword value={cpData?.new_password_confirmation} onChange={(value) => setCPData({ ...cpData, new_password_confirmation: value })} placeholder='Confirm new password' />
                            </div>
                        </div>

                        <div className="flex w-full justify-end">
                            <div className="cursor-pointer px-3 py-2 bg-sapphire rounded-md justify-center items-center flex p-btn gap-2 shadow-ful w-fit" onClick={confirmChangePassword}>
                                {changePasswordLoading && <Loading size={20} />}
                                <div className="text-white text-sm font-normal capitalize leading-normal">Change password</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BaseProfile;
