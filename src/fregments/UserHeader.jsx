import { useNavigate } from "react-router-dom";

import { Avatar, Whisper, Popover, Nav, IconButton, ButtonGroup, Badge } from "rsuite";
import { NoticeIcon, ArrowDownIcon, MemberIcon, UserChangeIcon, SentToUserIcon } from "@/components/icons";
import { signOut } from '@/helpers/authenHelpers';
import { getAuthentication } from "@/helpers/authenHelpers";
import { UserRole } from "@/constants";
import { InviteEmployee } from "@/components/selects";
import { useState } from "react";

const notificationMenu = ({ onClose, left, top, className }, ref) => {
    const handleSelect = eventKey => {
        onClose();
        console.log(eventKey);
    };
    return (
        <Popover ref={ref} className={className} style={{ left, top }} full>
            <Nav onSelect={handleSelect} className="flex flex-col">
                <Nav.Item eventKey={3}>Download As... alllllllllllllllllll</Nav.Item>
                <Nav.Item eventKey={4}>Export PDF</Nav.Item>
                <Nav.Item eventKey={5}>Export HTML</Nav.Item>
                <Nav.Item eventKey={6}>Settings</Nav.Item>
                <Nav.Item eventKey={7}>About</Nav.Item>
            </Nav>
        </Popover>
    );
};

const UserHeader = () => {
    const user = getAuthentication()?.user ?? null;
    const [open, setOpen] = useState(false);

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
                <Nav onSelect={handleSelect} className="flex flex-col">
                    <Nav.Item className="h-auto p-2.5" icon={<MemberIcon />} eventKey={3}>Profile</Nav.Item>
                    <Nav.Item className="h-auto p-2.5" icon={<UserChangeIcon />} onClick={handleSignOut} eventKey={4}>Sign out</Nav.Item>
                </Nav>
            </Popover>
        );
    };

    return (
        <div className="flex w-full h-full justify-end pt-2 pr-4 gap-2">
            <ButtonGroup className="flex flex-row gap-2">
                <div className="md:flex flex-row items-center gap-3 hidden">
                    <Avatar
                        size="md"
                        circle
                        src={user?.image_url}
                    />
                    <div className='md:flex flex-col justify-center hidden'>
                        <p className='text-base'>{user?.username}</p>
                    </div>
                </div>
                <Whisper placement="bottomEnd" trigger="click" speaker={userMenu} className="bg-transparent md:block hidden">
                    <IconButton icon={<ArrowDownIcon />} className="md:block hidden"/>
                </Whisper>
                <Whisper placement="bottomEnd" trigger="click" speaker={userMenu} className="bg-transparent md:hidden">
                    <Avatar
                        size="md"
                        circle
                        src={user?.image_url}
                    />
                </Whisper>
            </ButtonGroup>

            <Whisper placement="bottomEnd" trigger="click" speaker={notificationMenu}>
                <Badge content={999} maxCount={5} >
                    <IconButton appearance="primary" icon={<NoticeIcon style={{ fontSize: '10em' }} />} circle className="bg-sapphire h-10 w-10" />
                </Badge>
            </Whisper>
        </div>
    );
}
export default UserHeader
