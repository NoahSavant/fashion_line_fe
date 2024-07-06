import React, { useState, useEffect } from 'react';
import { InputNumber, Input, RadioGroup, Radio, CheckboxGroup, Checkbox } from "rsuite";
import { FunnelIcon } from '@/components/icons.js';
import { Filter, SingleProduct } from './components';
import { useSearchParams, useNavigate } from "react-router-dom";
import { productEndpoints } from '@/apis';
import { Loading } from '@/components';
import PaginationDefault from '@/constants/PaginationDefault';
import { useApi } from '@/hooks';
import { BasePagination } from '../managements/components';

const Shop = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [categoryFetched, setCategoryFetched] = useState(null);

    const navigate = useNavigate();
    const handleSidebar = () => {
        setIsOpen(prevState => !prevState);
    };

    const [searchParams, setSearchParams] = useSearchParams();

    const [pagination, setPagination] = useState({
        page: PaginationDefault.PAGE,
        limit: PaginationDefault.LIMIT,
        order: PaginationDefault.ORDER,
        column: PaginationDefault.COLUMN,
        search: PaginationDefault.SEARCH,
        minPrice: 200000,
        maxPrice: 2000000,
        category: null,
        tags: [],
        collections: [],
    });

    const handlePagination = (data) => {
        const updatedPagination = {
            ...pagination,
            ...data
        };
        setPagination(updatedPagination);
        setFetchProduct(true);
    };

    const [fetchProduct, setFetchProduct] = useState(false);
    const { data: productsData, callApi: handleGetProducts, loading: productsLoading } = useApi();

    useEffect(() => {
        if (!fetchProduct) return;
        handleGetProducts(productEndpoints.get, {
            params: {
                ...pagination,
            }
        });
        setFetchProduct(false);
    }, [fetchProduct]);

    useEffect(() => {
        const category = searchParams.get('category') || null;
        const tags = searchParams.getAll('tags[]').map(tag => parseInt(tag, 10)) || [];
        const collections = searchParams.getAll('collections[]').map(collection => parseInt(collection, 10)) || [];
        const search = searchParams.get('search') || PaginationDefault.SEARCH;
        const column = searchParams.get('column') || PaginationDefault.COLUMN;
        const order = searchParams.get('order') || PaginationDefault.ORDER;
        const page = parseInt(searchParams.get('page'), 10) || 1;
        const limit = parseInt(searchParams.get('limit'), 10) || PaginationDefault.LIMIT;
        const minPrice = parseInt(searchParams.get('minPrice'), 10) || 200000;
        const maxPrice = parseInt(searchParams.get('maxPrice'), 10) || 2000000;

        setPagination({
            page,
            limit,
            order,
            column,
            search,
            category,
            tags,
            collections,
            minPrice,
            maxPrice,
        });

        setCategoryFetched(category);
        setFetchProduct(true);
    }, []);

    return (
        <div className="md:px-7 px-5 md:py-7 py-5 flex">
            <div className='relative w-0 h-[calc(100vh-150px)] z-10'>
                <div
                    className={`${isOpen ? 'lg:-right-5 right-[-310px]' : 'rotate-180 -right-6'} lg:hidden shadow-left-only cursor-pointer right-scroll absolute top-[calc(50%-32px)] bg-white rounded-full z-10 transform transition-all duration-500 ease-in-out`}
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
                <div className={`${isOpen ? '' : 'lg:translate-x-0 lg:opacity-100 -translate-x-full opacity-0'} absolute left-0 top-0 w-72 h-max-[calc(100vh-150px)] overflow-auto hidden-scroll-bar shadow-full rounded-xl h-full transform transition-all duration-500 ease-in-out`}>
                    <Filter filter={pagination} setFilter={setPagination} filterClick={() => setFetchProduct(true)} />
                </div>
            </div>
            <div className={`w-full lg:ml-72 lg:pl-5 flex flex-col gap-5`}>
                <div className='bg-gray-100 p-2 flex gap-2 items-center'>
                    <a href='/' className='text-base font-medium text-blue-500 cursor-pointer'>
                        Home
                    </a>
                    <div>/</div>
                    <a href='/shop' className='text-base font-medium text-blue-500 cursor-pointer'>
                        Shop
                    </a>
                    {
                        (categoryFetched && productsData?.items[0]) ? 
                        <>
                            <div>/</div>
                            <a href={`/shop?category=${pagination.category}`} className='text-base font-medium text-blue-500 cursor-pointer'>
                                {productsData?.items[0]?.category?.name}
                            </a>
                        </> : 

                        <>
                            <div>/</div>
                            <a href='/shop' className='text-base font-medium text-blue-500 cursor-pointer'>
                                All
                            </a>
                        </>
                    }
                </div>
                {productsLoading && <Loading size={40} />}
                {(productsData?.items?.length > 0 || productsLoading)  ? (
                    <>
                        <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-5'>
                            {
                                productsData?.items?.map((item, index) => (
                                    <SingleProduct product={item} key={index} />
                                ))
                            }
                        </div>
                        <BasePagination pagination={productsData?.pagination} handlePagination={handlePagination} className='px-5 shadow-lg py-2 rounded-md' />
                    </>
                ) : (
                    <div className='w-full h-[calc(100vh-150px)] flex justify-center items-center'>
                        <div className="text-center text-xl text-sapphire font-semibold line-clamp-2">Not found</div>
                    </div>
                )
                    
                }
                
            </div>
        </div>
    );
};

export default Shop;
