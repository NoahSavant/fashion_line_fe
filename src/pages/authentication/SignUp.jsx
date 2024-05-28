import React, { useState, useEffect } from 'react';
import {
    Container,
    Form,
    ButtonToolbar,
    Button,
    Panel,
    FlexboxGrid,
    Message,
    Loader,
} from 'rsuite';

import { authenticationEndpoints } from "@/apis";
import { useApi } from "@/hooks";
import { useNavigate, useSearchParams } from 'react-router-dom';
import {InputPassword} from '@/components/inputs';
import { decodeToken } from '@/helpers/dataHelpers';

const SignUp = () => {
    const [userInfo, setUserInfo] = useState({
        "username": "",
        "email": "",
        "password": "",
        "password_confirmation": ""
    });
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [enterprise, setEnterprise] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();
    const { data, loading, error, callApi: handleSignUp } = useApi();
    const { data: tokenData, callApi: handleGetToken } = useApi();


    const selectEmail = () => {
        try {
            const clientId = import.meta.env.VITE_CLIENT_ID;
            const redirectUri = import.meta.env.VITE_APP_URL;
            const scopes = import.meta.env.VITE_SCOPES;

            const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${encodeURIComponent(
                scopes
            )}&response_type=code&prompt=consent&access_type=offline`;
            window.location.href = authUrl;
        } catch (error) {
            console.error('Error initiating authorization flow:', error);
        }
    }

    const onSignUp = async () => {
        await handleSignUp(
            authenticationEndpoints.signup,
            {
                'method': 'POST',
                'data': userInfo,
            }
        );
    }

    useEffect(() => {
        if(data) {
            navigate('/login');
        }
    }, [data]);

    useEffect(() => {
        if(!tokenData) return;

        setEmail(tokenData);

    }, [tokenData]);

    const getEmail = () => {
        const data = decodeToken(email?.id_token);

        return data?.email;
    }

    useEffect(() => {
        const fetchData = async () => {
            if (searchParams.has('code')) {
                const code = searchParams.get('code');
                await handleGetToken(
                    'https://oauth2.googleapis.com/token',
                    {
                        method: 'POST',
                        data: {
                            client_id: import.meta.env.VITE_CLIENT_ID,
                            client_secret: import.meta.env.VITE_CLIENT_SECRET,
                            code: code,
                            grant_type: 'authorization_code',
                            redirect_uri: import.meta.env.VITE_APP_URL,
                        },
                    }
                );
            } 
        };

        fetchData();
    }, []);

    return (
        <div className="show-fake-browser login-page md:px-12 md:py-11 py-5 bg-[url('https://res.cloudinary.com/dvcdmxgyk/image/upload/v1716543657/files/ldb72xhz5vdftwwijpz1.jpg')] bg-no-repeat bg-cover bg-center">
            <div className='flex items-center'>
                <Container>
                    <FlexboxGrid justify="center">
                        <FlexboxGrid.Item className='md:w-[500px] w-[320px]'>
                            <Panel className='bg-white' header={<h3 className="font-semibold text-lg text-blue-600">Sign up</h3>} bordered shaded>
                                <Form fluid onSubmit={onSignUp}>
                                    <Form.Group>
                                        <Form.ControlLabel>Email address</Form.ControlLabel>
                                        <Form.Control name="email" type="email" value={userInfo.email} placeholder="Email address" onChange={(value) => setUserInfo({ ...userInfo, email: value })} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.ControlLabel>Username</Form.ControlLabel>
                                        <Form.Control name="username" type="text" autoComplete="off" value={userInfo.username} placeholder="Username" onChange={(value) => setUserInfo({ ...userInfo, username: value })} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.ControlLabel>Password</Form.ControlLabel>
                                        <InputPassword value={userInfo.password} onChange={(value) => setUserInfo({ ...userInfo, password: value })} placeholder='Password' />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.ControlLabel>Confirm Password</Form.ControlLabel>
                                        <InputPassword value={userInfo.password_confirmation} onChange={(value) => setUserInfo({ ...userInfo, password_confirmation: value })} placeholder='Confirm password' />
                                    </Form.Group>
                                    {error && (<Message type="error" className='mb-3' showIcon header>{error.data.message}</Message>)}
                                    <Form.Group>
                                        <ButtonToolbar className="flex justify-end">
                                            {!loading && <Button appearance="primary" type='submit' className='bg-blue-500'>Sign up</Button>}
                                            {loading && <Loader content="Loading..." />}
                                        </ButtonToolbar>
                                    </Form.Group>
                                </Form>
                            </Panel>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </Container>
            </div>
        </div>
    );

};

export default SignUp
