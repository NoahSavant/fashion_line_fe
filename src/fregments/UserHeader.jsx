import { useNavigate } from "react-router-dom";

import { Avatar, Whisper, Popover, Nav, IconButton, ButtonGroup, Badge } from "rsuite";
import { NoticeIcon, ArrowDownIcon, MemberIcon, UserChangeIcon, SentToUserIcon, FiShoppingCart, BsBoxArrowUpRight } from "@/components/icons";
import { signOut } from '@/helpers/authenHelpers';
import { getAuthentication } from "@/helpers/authenHelpers";
import { UserRole } from "@/constants";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "@/contexts/CartContext";

const UserHeader = () => {
    const [user, setUser] = useState(getAuthentication()?.user ?? null);
    const { updateUser, setUpdateUser, cartItems } = useContext(CartContext);

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (updateUser) {
            setUser(getAuthentication()?.user ?? null);
            setUpdateUser(false);
        }
    }, [updateUser]);

    const userMenu = ({ onClose, left, top, className }, ref) => {
        const handleSelect = eventKey => {
            onClose();
        };

        const navigate = useNavigate();

        const handleSignOut = () => {
            onClose();
            signOut();
            navigate('/login');
        }

        return (
            <Popover ref={ref} className={className} style={{ left, top }} full>
                <Nav onSelect={handleSelect} className="flex flex-col text-lg">
                    <div className='flex md:hidden flex-col justify-center p-2'>
                        <p className='font-medium text-sapphire'>{user?.username}</p>
                    </div>
                    {user?.role !== UserRole.CUSTOMER &&
                        <Nav.Item className="h-auto p-2.5" icon={<BsBoxArrowUpRight className="rs-icon" />} onClick={() => {
                            window.location.href = `/m`;
                        }} eventKey={3}>Manage</Nav.Item>
                    }
                    <Nav.Item className="h-auto p-2.5" icon={<MemberIcon />} onClick={() => navigate('/profile')} eventKey={3}>Profile</Nav.Item>
                    <Nav.Item className="h-auto p-2.5" icon={<UserChangeIcon />} onClick={handleSignOut} eventKey={4}>Sign out</Nav.Item>
                </Nav>
            </Popover>
        );
    };

    return (
        <div>
            <div className="flex w-full h-full justify-end pt-2 pr-4 gap-4">
                <Whisper placement="bottomEnd" trigger="click" speaker={userMenu} className="bg-transparent md:block hidden">
                    <div className="flex flex-row items-center gap-3 cursor-pointer">
                        <Avatar
                            circle
                            src={user?.image_url}
                            color="blue"
                            bordered
                            className="w-9 h-9"
                        />
                        <div className='md:flex hidden flex-col justify-center text-lg'>
                            <p className='font-semibold text-sapphire capitalize'>{user?.username}</p>
                        </div>
                    </div>
                </Whisper>
                {user?.role == UserRole.CUSTOMER &&
                    <Badge Badge content={cartItems?.length} maxCount={5} >
                        <IconButton appearance="primary" onClick={() => navigate('/cart')} icon={<FiShoppingCart style={{ fontSize: '10em' }} />} circle className="bg-sapphire h-10 w-10" />
                    </Badge>
                }
            </div>
        </div>
    );
}
export default UserHeader
