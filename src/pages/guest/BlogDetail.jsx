import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from "react-router-dom";
import { blogEndpoints } from '@/apis';
import { Carousel, InputNumber } from 'rsuite';
import { useApi } from '@/hooks';
import { variantEndpoints } from '@/apis';
import { IoCartOutline } from '@/components/icons.js';
import { Loading } from '@/components';
import { Comments, SingleBlog } from './components';
import CommentType from '@/constants/CommentType';

const BlogDetail = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [id, setId] = useState(null);

    useEffect(() => {
        if (searchParams.has('id')) {
            setId(searchParams.get('id'));
        } else {
            navigate('/blog');
        }
    }, []);

    useEffect(() => {
        if (id == null) return;
        handleGetBlog(blogEndpoints.getSingle + id, {})
        handleGetBlogs(blogEndpoints.getSingle + id, {
            params: {
                related: true
            }
        })

    }, [id]);

    const { data: blogData, callApi: handleGetBlog, loading: blogLoading } = useApi();
    const { data: blogsData, callApi: handleGetBlogs, loading: blogsLoading } = useApi();

    return (
        <div className='custom-padding flex flex-col'>
            {blogLoading && <Loading />}
            <div className='bg-gray-100 p-2 mb-4 -mt-3 flex gap-2 items-center'>
                <a href='/' className='text-base font-medium text-blue-500 cursor-pointer'>
                    Home
                </a>
                <div>/</div>
                <a href='/blog' className='text-base font-medium text-blue-500 cursor-pointer'>
                    Blog
                </a>
                <div>/</div>
                <div className='text-base font-medium text-black'>
                    {blogData?.name}
                </div>
            </div>
            <div className="flex flex-col md:gap-24 gap-10">
                <div className="flex-grow overflow-hidden relative group w-full pb-[25%] p-2">
                    <div className="absolute inset-0">
                        <img className="w-full h-full  object-contain" src={blogData?.image_url} />
                    </div>
                </div>
                <h1 className="text-7xl font-bold text-sapphire text-center">{blogData?.name}</h1>

                <div className='md:px-5' dangerouslySetInnerHTML={{ __html: blogData?.content }} />

                <div className='flex justify-center items-center w-full'>
                    <div className='rounded-xl bg-boston_blue py-4 px-5 flex gap-10 lg:max-w-1/2 max-w-full text-white items-center'>
                        <div className='flex flex-col gap-2 justify-center items-center'>
                            <img className="w-12 h-12 object-cover rounded-full" src={blogData?.user?.image_url} />
                            <div className='font-medium text-base'>{blogData?.user?.username}</div>
                        </div>
                        <div className='h-fit'>
                            {blogData?.short_description}
                        </div>
                    </div>
                </div>

                <Comments id={id} type={CommentType.BLOG} />

                <div className="flex flex-col gap-10">
                    {blogsLoading && <Loading size={40} />}
                    <div className="flex flex-col gap-2 items-center">
                        <div className="text-sapphire lg:text-5xl md:text-4xl text-3xl font-semibold  leading-[1] text-center">Các bài viết liên quan</div>
                    </div>
                    {
                        blogsData?.length > 0 ? 
                            <div className="flex justify-center items-center gap-4 container-scroll relative md:px-0 px-1">
                                <div className="shadow-right-only absolute top-[calc(50%-32px)] md:-left-6 -left-5 cursor-pointer left-scroll bg-white rounded-full z-10">
                                    <svg
                                        version="1.1"
                                        id="Layer_1"
                                        width="50px"
                                        height="50px"
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
                                <div className="flex gap-5 w-full overflow-auto hidden-scroll-bar list-scroll">
                                    {blogsData?.map((blog, index) => (
                                        <SingleBlog blog={blog} key={index} className='flex-none lg:w-[calc(33.33%-13.33px)] md:w-[calc(50%-10px)]' />
                                    ))}
                                </div>
                                <div className="shadow-left-only cursor-pointer right-scroll absolute top-[calc(50%-32px)] md:-right-6 -right-5 bg-white rounded-full z-10">
                                    <svg
                                        version="1.1"
                                        id="Layer_1"
                                        width="50px"
                                        height="50px"
                                        viewBox="0 0 100 100"
                                        enableBackground="new 0 0 100 100"
                                        xmlSpace="preserve"
                                        style={{
                                            fill: '#2c4fa3',
                                            stroke: '#2c4fa3',
                                            transform: 'rotate(180deg)', // Rotate by 180 degrees
                                        }}
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
                            </div>
                        :
                            <div className='w-full h-[calc(100vh-150px)] flex justify-center items-center'>
                                <div className="text-center text-xl text-sapphire font-semibold line-clamp-2">Hiện chưa có</div>
                            </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
