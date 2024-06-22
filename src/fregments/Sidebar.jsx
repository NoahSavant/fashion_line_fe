import { Sidenav, Nav } from 'rsuite';
import React, { useState } from 'react';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import { useNavigate } from 'react-router-dom';
import {
    GiClothes,
    BsBoxArrowUpRight
} from '@/components/icons.js';
import { logo_image, icon } from '@/assets/images'

const Sidebar = () => {
    const [activeKey, setActiveKey] = useState('1');
    const [openKeys, setOpenKeys] = useState(['3', '4']);
    const [expanded, setExpand] = useState(true);
    const navigate = useNavigate();

    return (
        <div className={`${expanded ? 'w-60' : 'w-14'} transform transition-all duration-200 ease-in-out h-full min-h-[100vh]`}>
            <div className={`${expanded ? 'h-[60px]' : 'h-[50px] flex-col'}  flex items-center justify-center`}>
                <img src={icon} alt="" className={`${expanded ? 'hidden' : ''} object-contain w-[20px] h-[20px] cursor-pointer`} onClick={() => navigate('/m')} />
                <img src={logo_image} alt="" className={`${expanded ? '' : 'hidden'} object-contain w-[160px] h-[60px] cursor-pointer`} onClick={() => navigate('/m')} />
            </div>
            <Sidenav
                expanded={expanded}
                openKeys={openKeys}
                onOpenChange={setOpenKeys}
                appearance="subtle"
            >
                <Sidenav.Body>
                    <Nav activeKey={activeKey} onSelect={setActiveKey}>
                        <Nav.Item eventKey="view-website" icon={<BsBoxArrowUpRight className="rs-icon" />} onClick={() => navigate('/')}>
                            View website
                        </Nav.Item>
                        <Nav.Item eventKey="1" icon={<DashboardIcon />} onClick={() => navigate('/m')}>
                            Dashboard
                        </Nav.Item>
                        <Nav.Item eventKey="2" icon={<GroupIcon />}>
                            User Group
                        </Nav.Item>
                        <Nav.Item eventKey="product" icon={<GiClothes className="rs-icon" />} onClick={() => navigate('/m/product')}>
                            Product
                        </Nav.Item>
                        <Nav.Menu eventKey="3" title="Advanced" icon={<MagicIcon />}>
                            <Nav.Item eventKey="3-1">Geo</Nav.Item>
                            <Nav.Item eventKey="3-2">Devices</Nav.Item>
                            <Nav.Item eventKey="3-3">Loyalty</Nav.Item>
                            <Nav.Item eventKey="3-4">Visit Depth</Nav.Item>
                        </Nav.Menu>
                        <Nav.Menu eventKey="4" title="Settings" icon={<GearCircleIcon />}>
                            <Nav.Item eventKey="4-1">Applications</Nav.Item>
                            <Nav.Item eventKey="4-2">Channels</Nav.Item>
                            <Nav.Item eventKey="4-3">Versions</Nav.Item>
                            <Nav.Menu eventKey="4-5" title="Custom Action">
                                <Nav.Item eventKey="4-5-1">Action Name</Nav.Item>
                                <Nav.Item eventKey="4-5-2">Action Params</Nav.Item>
                            </Nav.Menu>
                        </Nav.Menu>
                    </Nav>
                </Sidenav.Body>
                <Sidenav.Toggle onToggle={setExpand} />
            </Sidenav>
        </div>
    );
};

export default Sidebar
