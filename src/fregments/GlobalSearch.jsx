import React, { useState, useEffect } from 'react';
import { Input } from "rsuite";

import { logo_image } from '@/assets/images'
import {
    SearchIcon
} from '@/components/icons.js';

const GlobalSearch = ({ handleOutsideSearchClick, isSearchOpen, closeSearch }) => {
    const [search, setSearch] = useState('');

    const onSearch = () => {
        window.location.href= `/shop?search=${search}`;
    }

    const onClose = () => {
        setSearch('');
        closeSearch()
    }

    return (
        <div onClick={handleOutsideSearchClick} className={`fixed ${isSearchOpen ? 'translate-y-0' : '-translate-y-full'} top-0 transform transition-transform duration-300 left-0 w-full h-full bg-black z-50 bg-opacity-50 flex`}>
            <div id="searchBox" className='w-full flex flex-col custom-padding bg-white h-[500px]'>
                <div className="flex justify-end cursor-pointer" onClick={onClose}>
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
                <div className='w-full h-full flex flex-col items-center justify-center gap-4'>
                    <div className='h-[75px] flex justify-center items-center'>
                        <a href="/">
                            <img src={logo_image} alt="" className='object-contain w-[200px] h-[75px] cursor-pointer' />
                        </a>
                    </div>
                    <Input className='max-w-[700px] shadow-full' value={search} onChange={setSearch} placeholder='Find your content...' />
                    <div className="cursor-pointer px-3 py-2 bg-sapphire rounded-md justify-center items-center flex p-btn gap-2 shadow-full" onClick={onSearch}>
                        <SearchIcon className="text-white" />
                        <div className="text-white text-sm font-normal capitalize leading-normal">Search</div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default GlobalSearch
