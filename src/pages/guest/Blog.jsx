import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from "react-router-dom";
import { blogEndpoints } from '@/apis';
import { useApi } from '@/hooks';
import { Loading } from '@/components';
import PaginationDefault from '@/constants/PaginationDefault';
import { BasePagination } from '../managements/components';
import { BlogFilter } from './components';

const Blog = () => {
    const [isOpen, setIsOpen] = useState(true);
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
        tags: [],
    });

    const handlePagination = (data) => {
        const updatedPagination = {
            ...pagination,
            ...data
        };
        setPagination(updatedPagination);
        setFetchBlogs(true);
    };

    const [fetchBlogs, setFetchBlogs] = useState(false);
    const { data: blogsData, callApi: handleGetBlogs, loading: blogsLoading } = useApi();

    useEffect(() => {
        if (!fetchBlogs) return;
        handleGetBlogs(blogEndpoints.get, {
            params: {
                ...pagination,
            }
        });
        setFetchBlogs(false);
    }, [fetchBlogs]);

    useEffect(() => {
        const tags = searchParams.getAll('tags[]').map(tag => parseInt(tag, 10)) || [];
        const search = searchParams.get('search') || PaginationDefault.SEARCH;
        const column = searchParams.get('column') || PaginationDefault.COLUMN;
        const order = searchParams.get('order') || PaginationDefault.ORDER;
        const page = parseInt(searchParams.get('page'), 10) || 1;
        const limit = parseInt(searchParams.get('limit'), 10) || PaginationDefault.LIMIT;

        setPagination({
            page,
            limit,
            order,
            column,
            search,
            tags,
        });

        setFetchBlogs(true);
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
                    <BlogFilter filter={pagination} setFilter={setPagination} filterClick={() => setFetchBlogs(true)} />
                </div>
            </div>
            <div className={`w-full lg:ml-72 lg:pl-5 flex flex-col gap-5`}>
                <div className='bg-gray-100 p-2 flex gap-2 items-center'>
                    <a href='/' className='text-base font-medium text-blue-500 cursor-pointer'>
                        Home
                    </a>
                    <div>/</div>
                    <a href='/blog' className='text-base font-medium text-blue-500 cursor-pointer'>
                        Blog
                    </a>
                </div>
                {blogsLoading && <Loading size={40} />}
                {(blogsData?.items?.length > 0 || blogsLoading) ? (
                    <>
                        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5'>
                            {blogsData?.items?.map((blog, index) => (
                                <div key={index} className='p-5 border rounded-md shadow-lg'>
                                    <h2 className='text-xl font-semibold'>{blog?.title}</h2>
                                    <p className='text-sm text-gray-500'>{blog?.date}</p>
                                    <p className='text-base mt-2'>{blog?.excerpt}</p>
                                    <a href={`/blog/${blog?.id}`} className='text-blue-500'>Read more</a>
                                </div>
                            ))}
                        </div>
                        <BasePagination pagination={blogsData?.pagination} handlePagination={handlePagination} className='px-5 shadow-lg py-2 rounded-md' />
                    </>
                ) : (
                    <div className='w-full h-[calc(100vh-150px)] flex justify-center items-center'>
                        <div className="text-center text-xl text-sapphire font-semibold line-clamp-2">No blogs found</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;
