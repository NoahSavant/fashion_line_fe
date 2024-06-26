import { Sidenav, Nav } from 'rsuite';
import React, { useState } from 'react';
import GroupIcon from '@rsuite/icons/legacy/Group';
import { useNavigate } from 'react-router-dom';
import {
    GiClothes,
    BsBoxArrowUpRight,
    GrResources,
    IoMdContacts,
    FaBookBookmark,
    RiPagesLine,
    RiDashboardFill
} from '@/components/icons.js';
import { logo_image, icon } from '@/assets/images'
import { getCurrentPath } from '@/helpers/pathHelper';

const Sidebar = () => {
    const [openKeys, setOpenKeys] = useState(['3', '4']);
    const [expanded, setExpand] = useState(true);
    const navigate = useNavigate();
    const currentPath = getCurrentPath();

    const activeKey = (path, same=false) => {
        if(same) {
            return (path === currentPath);
        }
        return currentPath.includes(path);
    };

    return (
        <div className={`${expanded ? 'w-60' : 'w-14'} lg:shadow-none shadow-md transform transition-all duration-200 ease-in-out h-full min-h-[100vh]`}>
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
                    <Nav>
                        <Nav.Item icon={<BsBoxArrowUpRight className="rs-icon" />} onClick={() => navigate('/')}>
                            View website
                        </Nav.Item>
                        <Nav.Item active={activeKey('/m', true)} icon={<RiDashboardFill className="rs-icon" />} onClick={() => navigate('/m')}>
                            Dashboard
                        </Nav.Item>
                        <Nav.Item active={activeKey('/m/users')} icon={<GroupIcon />}>
                            User Group
                        </Nav.Item>
                        <Nav.Item active={activeKey('/m/product')} icon={<GiClothes className="rs-icon" />} onClick={() => navigate('/m/product')}>
                            Product
                        </Nav.Item>
                        <Nav.Item active={activeKey('/m/blog')} icon={<FaBookBookmark className="rs-icon" />} onClick={() => navigate('/m/blog')}>
                            Blog
                        </Nav.Item>
                        <Nav.Item active={activeKey('/m/contact')} icon={<IoMdContacts className="rs-icon" />} onClick={() => navigate('/m/contact')}>
                            Contact
                        </Nav.Item>
                        <Nav.Menu title="Resource" icon={<GrResources className="rs-icon" />} className={`${activeKey('/m/resource') ? 'active-nav': ''}`}>
                            <Nav.Item active={activeKey('/m/resource/tag')} onClick={() => navigate('/m/resource/tag')}>Tag</Nav.Item>
                            <Nav.Item active={activeKey('/m/resource/category')} onClick={() => navigate('/m/resource/category')}>Category</Nav.Item>
                            <Nav.Item active={activeKey('/m/resource/brand')} onClick={() => navigate('/m/resource/brand')}>Brand</Nav.Item>
                        </Nav.Menu>
                        <Nav.Menu title="Page content" icon={<RiPagesLine className="rs-icon" />} className={`${activeKey('/m/page') ? 'active-nav' : ''}`}>
                            <Nav.Item active={activeKey('/m/resource/tag')} onClick={() => navigate('/m/resource/tag')}>Tag</Nav.Item>
                            <Nav.Item active={activeKey('/m/resource/category')} onClick={() => navigate('/m/resource/category')}>Category</Nav.Item>
                            <Nav.Item active={activeKey('/m/resource/brand')} onClick={() => navigate('/m/resource/brand')}>Brand</Nav.Item>
                        </Nav.Menu>
                    </Nav>
                </Sidenav.Body>
                <Sidenav.Toggle onToggle={setExpand} />
            </Sidenav>
        </div>
    );
};

export default Sidebar
