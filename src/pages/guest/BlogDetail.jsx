import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from "react-router-dom";
import { blogEndpoints } from '@/apis';
import { Divider, InputNumber } from 'rsuite';
import { useApi } from '@/hooks';
import { variantEndpoints } from '@/apis';
import { IoCartOutline } from '@/components/icons.js';
import { Loading } from '@/components';
import { Comments, SingleBlog } from './components';
import CommentType from '@/constants/CommentType';
import CommentAndRate from './CommentAndRate';
import Carousel from './Carousel';

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

                <div className='md:px-5 sun-editor-editable' dangerouslySetInnerHTML={{ __html: blogData?.content }} />

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

                {/* {
                    id && <Comments id={id} type={CommentType.BLOG} />
                } */}

                {
                    blogData?.id &&
                    <>
                        <div className="pt-10">
                            <Divider />
                            <Comments id={blogData?.id} type={CommentType.BLOG} />
                        </div>
                    </>
                }

                <div className="flex flex-col gap-10">
                    <Carousel title='Các bài viết liên quan' data={blogsData} dataMap={
                        blogsData?.map((blog, index) => (
                            <SingleBlog blog={blog} key={index} className='flex-none lg:w-[calc(33.33%-13.33px)] md:w-[calc(50%-10px)] w-full' />
                        ))
                    } loading={blogsLoading}
                    />
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
