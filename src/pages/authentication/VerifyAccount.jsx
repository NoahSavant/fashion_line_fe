import React, { useState, useEffect } from 'react';

import {
    Container,
    Form,
    ButtonToolbar,
    Button,
    Panel,
    FlexboxGrid,
    Message, 
    Nav,
    Loader,
    Whisper,
    Tooltip,
} from 'rsuite';

import {
    InfoOutlineIcon,
    FaArrowLeftLong
} from '@/components/icons.js';

import { authenticationEndpoints } from "@/apis";
import { useApi } from "@/hooks";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { InputPassword } from '@/components/inputs';
import FormGroup from 'rsuite/esm/FormGroup';


const Navbar = ({ active, onSelect, ...props }) => {
    return (
        <Nav {...props} activeKey={active} onSelect={onSelect} style={{ marginBottom: 10 }} >
            <Nav.Item eventKey="activeAccount">Active account</Nav.Item>
            <Nav.Item eventKey="sendVerify">Send verify code</Nav.Item>
            <Nav.Item eventKey="resetPassword">Reset password</Nav.Item>
        </Nav>
    );
};

const VerifyAccount = () => {
    const activeAccount = 'activeAccount';
    const resetPassword = 'resetPassword';
    const tabs = ['activeAccount', 'sendVerify','resetPassword'];
    const [active, setActive] = React.useState(activeAccount);
    const [email, setEmail] = useState('');
    const [verifyCode, setVerifyCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();
    const { data: activeAccountData, loading: activeAccountLoading, error: activeAccountError, callApi: handleActiveAccount } = useApi();
    const { data: sendVerifyData, loading: sendVerifyLoading, error: sendVerifyError, callApi: handleSendVerify } = useApi();
    const { data: resetPasswordData, loading: resetPasswordLoading, error: resetPasswordError, callApi: handleResetPassword } = useApi();

    useEffect(() => {
        if(activeAccountData) {
            navigate('/login');
        }
    }, [activeAccountData]);

    useEffect(() => {
        if (searchParams.has('tab') && tabs.includes(searchParams.get('tab'))) {
            setActive(searchParams.get('tab'));
        }
    }, []);

    const onAcctiveAccount = async () => {
        await handleActiveAccount(
            authenticationEndpoints.activeAccount,
            {
                'method': 'POST',
                'data': {
                    'email': email,
                    'verify_code': verifyCode
                },
            }
        );
    }

    const onSendVerify = async () => {
        await handleSendVerify(
            authenticationEndpoints.sendVerify,
            {
                'method': 'POST',
                'data': {
                    'email': email,
                },
            }
        );
    }

    const onResetPassword = async () => {
        await handleResetPassword(
            authenticationEndpoints.resetPassword,
            {
                'method': 'POST',
                'data': {
                    "email": email,
                    "verify_code": verifyCode,
                    "new_password": password,
                    "new_password_confirmation": confirmPassword
                },
            }
        );
    }

    return (
        <div className="show-fake-browser login-page md:px-12 md:py-12 py-5 bg-[url('https://res.cloudinary.com/dvcdmxgyk/image/upload/v1716871081/files/ftohodabvyleetmxmssy.jpg')] bg-no-repeat bg-cover bg-center">
            <div className='col-span-4 flex items-center'>
                <Container>
                    <FlexboxGrid justify="center">
                        <FlexboxGrid.Item colspan={12} className='md:w-[500px] w-[320px]'>
                            <Navbar appearance="subtle" active={active} onSelect={setActive} className='bg-white rounded-t-md shadow-md overflow-x-auto hidden-scroll-bar'/>
                            <Panel bordered className='bg-white' shaded>
                                <Form fluid onSubmit={active == activeAccount || active == resetPassword ? active == activeAccount ? onAcctiveAccount : onResetPassword : onSendVerify}>
                                    <Form.Group>
                                        <Form.ControlLabel>Email address</Form.ControlLabel>
                                        <Form.Control name="email" type="email" autoComplete="on" value={email} placeholder="Email" onChange={setEmail} />
                                    </Form.Group>
                                    {active == activeAccount || active == resetPassword ?
                                        <>
                                            <Form.Group>
                                                <Form.ControlLabel>Verify code</Form.ControlLabel>
                                                <Form.Control name="verifyCode" type="text" autoComplete="off" value={verifyCode} placeholder="Verify code" onChange={setVerifyCode} />
                                            </Form.Group>
                                            {active == resetPassword ?
                                                <>
                                                    <Form.Group>
                                                        <Form.ControlLabel>New Password</Form.ControlLabel>
                                                        <InputPassword value={password} onChange={setPassword} placeholder='New Password' />
                                                    </Form.Group>
                                                    <Form.Group>
                                                        <Form.ControlLabel>Confirm New Password</Form.ControlLabel>
                                                        <InputPassword value={confirmPassword} onChange={setConfirmPassword} placeholder='Confirm new password' />
                                                    </Form.Group>
                                                    {resetPasswordError && (<Message type="error" className='mb-3' showIcon header>{resetPasswordError.data.message}</Message>)}
                                                    {resetPasswordData && (<Message type="success" className='mb-3' showIcon header>{resetPasswordData.message}</Message>)}
                                                    <Form.Group>
                                                        <ButtonToolbar className="flex justify-between">
                                                            <Whisper
                                                                trigger="click"
                                                                placement="rightStart"
                                                                speaker={
                                                                    <Tooltip>Send verify code to your email from the left tab</Tooltip>
                                                                }
                                                            >
                                                                <InfoOutlineIcon className="hover:text-sapphire cursor-pointer" style={{ fontSize: '1.5em' }} />
                                                            </Whisper>
                                                            {!resetPasswordLoading && <Button appearance="primary" type='submit' className='bg-blue-500'>Reset Password</Button>}
                                                            {resetPasswordLoading && <Loader content="Loading..." />}
                                                        </ButtonToolbar>
                                                    </Form.Group>
                                                </> :
                                                <>
                                                    {activeAccountError && (<Message type="error" className='mb-3' showIcon header>{activeAccountError.data.message}</Message>)}
                                                    <Form.Group>
                                                        <ButtonToolbar className="flex justify-end">
                                                            {!activeAccountLoading && <Button appearance="primary" type='submit' className='bg-blue-500'>Active</Button>}
                                                            {activeAccountLoading && <Loader content="Loading..." />}
                                                        </ButtonToolbar>
                                                    </Form.Group>
                                                </>
                                            }
                                        </> :
                                        <>
                                            {sendVerifyError && (<Message type="error" className='mb-3' showIcon header>{sendVerifyError.data.message}</Message>)}
                                            {sendVerifyData && (<Message type="success" className='mb-3' showIcon header>{sendVerifyData.message}</Message>)}
                                            <Form.Group>
                                                <ButtonToolbar className="flex justify-between">
                                                    <Whisper
                                                        trigger="click"
                                                        placement="rightStart"
                                                        speaker={
                                                            <Tooltip>Send verify code to your email for active account or reset password</Tooltip>
                                                        }
                                                    >
                                                        <InfoOutlineIcon className="hover:text-sapphire cursor-pointer" style={{ fontSize: '1.5em' }} />
                                                    </Whisper>
                                                    {!sendVerifyLoading && <Button appearance="primary" type='submit' className='bg-blue-500'>Send verify code</Button>}
                                                    {sendVerifyLoading && <Loader content="Loading..." />}
                                                </ButtonToolbar>
                                            </Form.Group>
                                        </>
                                    }
                                </Form>
                            </Panel>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </Container>
            </div>
        </div>
    );
};

export default VerifyAccount
