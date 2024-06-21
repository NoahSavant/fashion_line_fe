import React, { useState } from 'react';
import { InputNumber, Input, RadioGroup, Radio, CheckboxGroup, Checkbox } from "rsuite";
import {
    FunnelIcon
} from '@/components/icons.js';
import { Filter } from './components';

const Shop = () => {
    const [isOpen, setIsOpen] = useState(true);
    const handleSidebar = () => {
        setIsOpen(prevState => !prevState);
    };

    const [filterProduct, setFilterProduct] = useState({
        search: '',
        minPrice: 200000,
        maxPrice: 2000000,
        category: null,
        brands: [],
        collections: [],
        sortColumn: 'created_at',
        sortType: 'desc'
    })

    return (
        <div className="custom-padding flex gap-10">
            <div className={`${isOpen ? 'lg:w-80 w-0' : 'w-0'} relative group h-[100vh] transform transition-all duration-500 ease-in-out`}>
                <div
                    className={`${isOpen ? 'group-hover:block lg:-right-5 right-[-340px]' : 'rotate-180 -right-6'} shadow-left-only cursor-pointer right-scroll absolute top-[calc(50%-32px)] bg-white rounded-full z-10 transform transition-all duration-500 ease-in-out`}
                    onClick={handleSidebar}
                >
                    <svg
                        version="1.1"
                        id="Layer_1"
                        width="40px"
                        height="40px"
                        viewBox="0 0 100 100"
                        enableBackground="new 0 0 100 100"
                        xmlSpace="preserve"
                        style={{ fill: '#2c4fa3', stroke: '#2c4fa3' }}
                    >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <g>
                                <path
                                    d="M44.942,50.412l14.037-15.487c0.742-0.818,0.68-2.083-0.139-2.824c-0.817-0.742-2.083-0.679-2.824,0.139L40.784,49.044 c-0.409,0.451-0.565,1.038-0.493,1.598c-0.016,0.564,0.196,1.131,0.647,1.539L57.74,67.412c0.383,0.348,0.864,0.519,1.344,0.519 c0.545,0,1.087-0.222,1.482-0.657c0.741-0.818,0.68-2.083-0.139-2.824L44.942,50.412z"
                                ></path>
                                <path
                                    d="M84.133,49.756c0-18.448-15.01-33.457-33.458-33.457S17.218,31.308,17.218,49.756c0,18.449,15.009,33.458,33.457,33.458 S84.133,68.205,84.133,49.756z M50.675,79.214c-16.243,0-29.457-13.215-29.457-29.458c0-16.242,13.214-29.457,29.457-29.457 c16.243,0,29.458,13.215,29.458,29.457C80.133,65.999,66.918,79.214,50.675,79.214z"
                                ></path>
                            </g>
                        </g>
                    </svg>
                </div>
                <div className={`${isOpen ? '' : '-translate-x-full opacity-0'} absolute left-0 top-0 w-80 h-max-[100vh] overflow-auto hidden-scroll-bar shadow-full rounded-xl h-full transform transition-all duration-500 ease-in-out`}>
                    <Filter filter={filterProduct} setFilter={setFilterProduct}/>
                </div>
            </div>
            <div className="">
                haha
            </div>
        </div>
    );
};

export default Shop;
