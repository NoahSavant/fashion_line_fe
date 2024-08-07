import React, { useState, useEffect, useContext } from 'react';
import {
    Container,
    Form,
    ButtonToolbar,
    Button,
    Panel,
    FlexboxGrid,
    Message,
    Loader,
    Checkbox
} from 'rsuite';

import { vertical_bg } from '@/assets/images'
import { authenticationEndpoints } from "@/apis";
import { useApi } from "@/hooks";
import { useNavigate } from 'react-router-dom';
import { setAuthentication } from '@/helpers/authenHelpers';
import { InputPassword } from '@/components/inputs';
import { UserRole } from '@/constants';
import { CartContext } from '@/contexts/CartContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const navigate = useNavigate();
    const { data, loading, error, callApi: handleLogin } = useApi();
    const { setFetchCartFirst } = useContext(CartContext);

    useEffect(() => {
        if (data) {
            setAuthentication(data);
            if(data.user.role == UserRole.CUSTOMER) {
                const previousUrl = localStorage.getItem('previousUrl') || '/';
                navigate(previousUrl);
            } else {
                const previousUrl = localStorage.getItem('previousUrl') || '/m';
                navigate(previousUrl);
            }
            setFetchCartFirst(true);
        }
    }, [data]);

    const onLogin = async () => {
        const data = {
            email: email,
            password: password,
        };

        if (remember) {
            data.remember = true;
        }

        await handleLogin(authenticationEndpoints.login,
            {
                method: 'POST',
                data: data,
            });
    }

    return (
        <div className="show-fake-browser login-page md:px-12 md:py-12 py-5 bg-[url('https://res.cloudinary.com/dvcdmxgyk/image/upload/v1716783656/files/kuibkrpffucczubpy4uy.jpg')] bg-no-repeat bg-cover bg-center">
            <div className='col-span-4 flex items-center'>
                <Container>
                    <FlexboxGrid justify="center">
                        <FlexboxGrid.Item colspan={12} className='md:w-[500px] w-[320px]'>
                            <Panel className='bg-white' header={<h3 className="font-semibold text-lg text-blue-600">Login</h3>} bordered shaded>
                                <Form fluid onSubmit={onLogin} >
                                    <Form.Group>
                                        <Form.ControlLabel>Email address</Form.ControlLabel>
                                        <Form.Control name="email" type="email" autoComplete="on" value={email} placeholder="Email" onChange={setEmail} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.ControlLabel>Password</Form.ControlLabel>
                                        <InputPassword value={password} onChange={setPassword} placeholder='Password' />
                                    </Form.Group>
                                    <Form.Group className='flex justify-between'>
                                        <Checkbox value={remember} onChange={() => setRemember(!remember)}> Remember</Checkbox>
                                        <Button appearance="link" onClick={() => navigate('/verify-account?tab=resetPassword')}>Forgot password?</Button>
                                    </Form.Group>
                                    {error && (<Message type="error" className='mb-3' showIcon header>{error.data.message}</Message>)}
                                    <Form.Group>
                                        <ButtonToolbar className="flex justify-end">
                                            {!loading && <Button appearance="primary" type='submit' className='bg-blue-500'>Sign in</Button>}
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

export default Login
