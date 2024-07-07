import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthentication } from '@/helpers/authenHelpers';
import { getCurrentPath } from '@/helpers/pathHelper';
import UserHeader from './UserHeader';
import { Whisper, Popover, Nav, Button, Navbar, InputGroup, Input } from "rsuite";

import { logo_image } from '@/assets/images'
import {
    CogIcon,
    DashboardIcon,
    HelpOutlineIcon,
    IoMdContacts,
    IoMdPersonAdd,
    IoIosHome,
    CgLogIn,
    InfoRoundIcon,
    BsPersonFillCheck,
    CharacterAuthorizeIcon,
    MenuIcon,
    GiShop,
    FaBookBookmark,
    SearchIcon
} from '@/components/icons.js';
import GlobalSearch from './GlobalSearch';
import GlobalDiscounts from './GlobalDiscounts';

const CustomNavbar = ({ onSelect, ...props }) => {
    const auth = getAuthentication();
    const navigate = useNavigate();
    const currentPath = getCurrentPath();
    const activeKey = (path) => {
        if(path !== '/') return currentPath.includes(path);
        return currentPath === path;
    };

    const [isVisible, setIsVisible] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const handleScroll = () => {
        if (window.pageYOffset <= 0) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    window.addEventListener('scroll', handleScroll);

    const openSidebar = () => {
        setIsOpen(true);
    };

    const closeSidebar = () => {
        setIsOpen(false);
    };

    const openSearch = () => {
        setIsSearchOpen(true);
    };

    const closeSearch = () => {
        setIsSearchOpen(false);
    };

    const handleOutsideClick = (event) => {
        if (!event.target.closest("#sidebarContent")) {
            closeSidebar();
        }
    };

    const handleOutsideSearchClick = (event) => {
        if (!event.target.closest("#searchBox")) {
            closeSearch();
        }
    };

    const userAuthen = ({ onClose, left, top, className }, ref) => {
        const handleSelect = eventKey => {
            onClose();
        };

        const navigate = useNavigate();

        return (
            <Popover ref={ref} className={className} style={{ left, top }} full>
                <Nav onSelect={handleSelect} className="flex flex-col text-base">
                    <Nav.Item onClick={openSearch} icon={<SearchIcon style={{ fontSize: '1.25em' }} />}>Tìm kiếm</Nav.Item>
                    <Nav.Item eventKey="/login" active={activeKey('/login')} onClick={() => navigate('/login')} icon={<CgLogIn />}>Đăng nhập</Nav.Item>
                    <Nav.Item eventKey="/signup" active={activeKey('/signup')} onClick={() => navigate('/signup')} icon={<IoMdPersonAdd />}>Đăng ký</Nav.Item>
                    <Nav.Item eventKey="/verify-account" active={activeKey('/verify-account')} onClick={() => navigate('/verify-account')} icon={<BsPersonFillCheck />}>Tài khoản</Nav.Item>
                </Nav>
            </Popover>
        );
    };

    const MainTabs = ({vertical = false}) => {
        const className = vertical ? 'flex flex-col text-lg header-tab' : 'h-[60px] text-lg header-tab';
        return (
            <Nav className={className} onSelect={(vertical) => {
                if(vertical) {
                    closeSidebar();
                }
            }}>
                <Nav.Item className="px-6" eventKey="/" active={activeKey('/')} icon={<IoIosHome />} onClick={() => navigate('/')}>
                    Trang chủ
                </Nav.Item>
                <Nav.Item className="px-6"  eventKey="/shop" active={activeKey('/shop')} onClick={() => navigate('/shop')} icon={<GiShop />}>Sản phẩm</Nav.Item>
                <Nav.Item className="px-6"  eventKey="/blog" active={activeKey('/blog')} onClick={() => navigate('/blog')} icon={<FaBookBookmark />}>Bài viết</Nav.Item>
                <Nav.Item className="px-6"  eventKey="/about" active={activeKey('/about')} onClick={() => navigate('/about')} icon={<InfoRoundIcon />}>Giới thiệu</Nav.Item>
                <Nav.Item className="px-6"  eventKey="/contact" active={activeKey('/contact')} onClick={() => navigate('/contact')} icon={<IoMdContacts />}>Liên hệ</Nav.Item>
            </Nav>
        );
    }

    return (
        <div className='relative'>
            <div className="fixed bottom-0 right-0 p-[24px] gap-4 z-50 flex flex-col">
                <div onClick={scrollToTop} className={`cursor-pointer h-[44px] w-[44px] p-btn bg-sapphire rounded-full justify-center items-center flex shadow-custom transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`} >
                    <svg width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.061 9.52494L14.475 5.93894C13.8081 5.30257 12.9218 4.94751 12 4.94751C11.0782 4.94751 10.1919 5.30257 9.525 5.93894L5.939 9.52494C5.65774 9.80634 5.49978 10.1879 5.49988 10.5858C5.49997 10.9837 5.65811 11.3652 5.9395 11.6464C6.2209 11.9277 6.6025 12.0857 7.00036 12.0856C7.39822 12.0855 7.77974 11.9273 8.061 11.6459L10.5 9.20694V18.9999C10.5 19.3978 10.658 19.7793 10.9393 20.0606C11.2206 20.3419 11.6022 20.4999 12 20.4999C12.3978 20.4999 12.7794 20.3419 13.0607 20.0606C13.342 19.7793 13.5 19.3978 13.5 18.9999V9.20694L15.939 11.6459C16.0783 11.7853 16.2436 11.8958 16.4256 11.9712C16.6076 12.0467 16.8027 12.0855 16.9997 12.0856C17.1967 12.0856 17.3917 12.0469 17.5738 11.9715C17.7558 11.8962 17.9212 11.7857 18.0605 11.6464C18.1998 11.5072 18.3104 11.3418 18.3858 11.1598C18.4612 10.9779 18.5001 10.7828 18.5001 10.5858C18.5002 10.3888 18.4614 10.1937 18.3861 10.0117C18.3107 9.82967 18.2003 9.66427 18.061 9.52494Z" fill="white"/>
                    </svg>
                </div>
                <a href="tel:<?php echo get_theme_mod('phone') ?>" className="p-btn cursor-pointer h-[44px] w-[44px] bg-sapphire rounded-full justify-center items-center flex shadow-custom">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <g clipPath="url(#clip0_198_13662)">
                        <path d="M19.1669 9.16618C18.9459 9.16618 18.7339 9.07838 18.5777 8.9221C18.4214 8.76582 18.3336 8.55386 18.3336 8.33285C18.3318 6.56528 17.6289 4.87061 16.379 3.62075C15.1291 2.37089 13.4345 1.66795 11.6669 1.66618C11.4459 1.66618 11.2339 1.57838 11.0777 1.4221C10.9214 1.26582 10.8336 1.05386 10.8336 0.832847C10.8336 0.611833 10.9214 0.399871 11.0777 0.243591C11.2339 0.0873107 11.4459 -0.000486737 11.6669 -0.000486737C13.8763 0.00193959 15.9945 0.880693 17.5568 2.44297C19.1191 4.00525 19.9978 6.12345 20.0002 8.33285C20.0002 8.55386 19.9124 8.76582 19.7562 8.9221C19.5999 9.07838 19.3879 9.16618 19.1669 9.16618ZM16.6669 8.33285C16.6669 7.00676 16.1401 5.73499 15.2024 4.79731C14.2648 3.85963 12.993 3.33285 11.6669 3.33285C11.4459 3.33285 11.2339 3.42064 11.0777 3.57692C10.9214 3.7332 10.8336 3.94517 10.8336 4.16618C10.8336 4.38719 10.9214 4.59916 11.0777 4.75544C11.2339 4.91172 11.4459 4.99951 11.6669 4.99951C12.551 4.99951 13.3988 5.3507 14.0239 5.97582C14.6491 6.60095 15.0002 7.44879 15.0002 8.33285C15.0002 8.55386 15.088 8.76582 15.2443 8.9221C15.4006 9.07838 15.6126 9.16618 15.8336 9.16618C16.0546 9.16618 16.2666 9.07838 16.4228 8.9221C16.5791 8.76582 16.6669 8.55386 16.6669 8.33285ZM18.4861 18.4695L19.2444 17.5953C19.7271 17.1111 19.9981 16.4553 19.9981 15.7716C19.9981 15.0879 19.7271 14.4321 19.2444 13.9478C19.2186 13.922 17.2136 12.3795 17.2136 12.3795C16.7324 11.9215 16.0932 11.6664 15.4288 11.6673C14.7645 11.6683 14.126 11.9251 13.6461 12.3845L12.0577 13.7228C10.7612 13.1863 9.58348 12.3988 8.59215 11.4058C7.60082 10.4127 6.81543 9.23363 6.28108 7.93618L7.61441 6.35285C8.07417 5.87299 8.33133 5.23441 8.33241 4.56985C8.3335 3.90529 8.07844 3.26587 7.62025 2.78451C7.62025 2.78451 6.07608 0.782013 6.05025 0.75618C5.57479 0.277637 4.93015 0.00536494 4.2556 -0.00180775C3.58106 -0.00898044 2.93077 0.249522 2.44525 0.717847L1.48691 1.55118C-4.17475 8.11951 8.01691 20.217 14.8019 19.9995C15.4871 20.0035 16.1661 19.8701 16.7988 19.6074C17.4316 19.3446 18.0053 18.9577 18.4861 18.4695Z" fill="white"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_198_13662">
                        <rect width="20" height="20" fill="white"/>
                        </clipPath>
                    </defs>
                    </svg>
                </a>
                <a href="https://m.me/A2BTax" target="_blank" className="p-btn cursor-pointer h-[44px] w-[44px] bg-sapphire rounded-full justify-center items-center flex shadow-custom">
                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="30" height="30"><path fill="white" d="M24,4C13.5,4,5,12.1,5,22c0,5.2,2.3,9.8,6,13.1V44l7.8-4.7c1.6,0.4,3.4,0.7,5.2,0.7c10.5,0,19-8.1,19-18C43,12.1,34.5,4,24,4z"/><path fill="#2c4fa3" d="M12 28L22 17 27 22 36 17 26 28 21 23z"/></svg>
                </a>
            </div>
            <GlobalSearch handleOutsideSearchClick={handleOutsideSearchClick} isSearchOpen={isSearchOpen} closeSearch={closeSearch} />
            <GlobalDiscounts />
            <div className='lg:flex hidden items-center justify-between px-5'>
                <div className='flex gap-10'>
                    <div className='h-[60px] flex justify-center items-center'>
                        <img src={logo_image} alt="" className='object-contain w-[120px] h-[45px] cursor-pointer' onClick={() => navigate('/')} />
                    </div>
                    <MainTabs />
                </div>
                {auth && (
                    <>
                        <Nav pullRight>
                            <UserHeader />
                        </Nav>
                    </>
                )}
                {!auth && (
                    <>
                        <Nav pullRight className='h-[60px] text-lg header-tab'>
                            <Nav.Item onClick={openSearch} icon={<SearchIcon style={{ fontSize: '1.25em' }} />}></Nav.Item>
                            <Nav.Item eventKey="/login" active={activeKey('/login')} onClick={() => navigate('/login')} icon={<CgLogIn style={{ fontSize: '1.25em' }} />}></Nav.Item>
                            <Nav.Item eventKey="/signup" active={activeKey('/signup')} onClick={() => navigate('/signup')} icon={<IoMdPersonAdd style={{ fontSize: '1.25em' }} />}></Nav.Item>
                            <Nav.Item eventKey="/verify-account" active={activeKey('/verify-account')} onClick={() => navigate('/verify-account')} icon={<BsPersonFillCheck style={{ fontSize: '1.25em' }} />}></Nav.Item>
                        </Nav>
                    </>
                )}
            </div>
            <div className='lg:hidden flex justify-between items-center'>
                <div className='px-2 sidebar-open' onClick={openSidebar}><MenuIcon style={{ fontSize: '2em' }} /></div>
                <img src={logo_image} alt="" className='object-cover w-[80px] h-[30px] cursor-pointer' onClick={() => navigate('/')}/>
                {auth && (
                    <>
                        <div className='p-2'>
                            <UserHeader />
                        </div>
                    </>
                )}
                {!auth && (
                    <>
                        <div className='p-2'>
                            <Whisper placement="bottomEnd" trigger="click" speaker={userAuthen} className="bg-transparent">
                                <CharacterAuthorizeIcon style={{ fontSize: '2em' }} className="bg-transparent" />
                            </Whisper> 
                        </div>
                    </>
                )}
            </div>
            <div className={`fixed top-0 left-0 bg-black bg-opacity-50 z-30 ${isOpen ? 'translate-x-0' : '-translate-x-full'} transform transition-transform w-full h-full justify-start duration-300 flex lg:hidden`} onClick={handleOutsideClick}>
                <div id="sidebarContent" className="h-full bg-white shadow-md transform translate-x-0 transition-transform duration-300 min-w-52">
                    <div className="justify-end items-start gap-10 main-menu flex flex-col px-3">
                        <div className="sidebar py-4 w-full">
                            <div id="sidebar-menu" className="vertical-menu flex flex-col items-start justify-start  text-base font-bold gap-4">
                                <div className="w-full flex justify-start">
                                    <div className="sidebar-close flex justify-start lg:pl-[20px]" onClick={() => closeSidebar()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <g clipPath="url(#clip0_7_425)">
                                                <path d="M13.4139 11.9999L23.7069 1.70692C23.8891 1.51832 23.9899 1.26571 23.9876 1.00352C23.9853 0.741321 23.8801 0.490508 23.6947 0.3051C23.5093 0.119692 23.2585 0.0145233 22.9963 0.0122448C22.7341 0.00996641 22.4815 0.110761 22.2929 0.292919L11.9999 10.5859L1.70691 0.292919C1.51831 0.110761 1.2657 0.00996641 1.00351 0.0122448C0.741311 0.0145233 0.490498 0.119692 0.30509 0.3051C0.119682 0.490508 0.0145129 0.741321 0.0122345 1.00352C0.00995606 1.26571 0.11075 1.51832 0.292909 1.70692L10.5859 11.9999L0.292909 22.2929C0.105437 22.4804 0.00012207 22.7348 0.00012207 22.9999C0.00012207 23.2651 0.105437 23.5194 0.292909 23.7069C0.480436 23.8944 0.734744 23.9997 0.999909 23.9997C1.26507 23.9997 1.51938 23.8944 1.70691 23.7069L11.9999 13.4139L22.2929 23.7069C22.4804 23.8944 22.7347 23.9997 22.9999 23.9997C23.2651 23.9997 23.5194 23.8944 23.7069 23.7069C23.8944 23.5194 23.9997 23.2651 23.9997 22.9999C23.9997 22.7348 23.8944 22.4804 23.7069 22.2929L13.4139 11.9999Z" fill="#374957" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_7_425">
                                                    <rect width="24" height="24" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <Navbar {...props}>
                                        <MainTabs vertical={true} />
                                    </Navbar>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
};

const BaseHeader = () => {

    return (
        <CustomNavbar appearance="subtle"/>
    );
};

export default BaseHeader
