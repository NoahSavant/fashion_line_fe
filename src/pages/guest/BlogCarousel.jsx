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

const BlogCarousel = () => {
    useEffect(() => {
        handleGetBlogs(blogEndpoints.get, {})
    }, []);

    const { data: blogsData, callApi: handleGetBlogs, loading: blogsLoading } = useApi();

    return (
        <div className="flex flex-col gap-10 custom-padding">
            <Carousel title='Các bài viết mới nhất' data={blogsData?.items} dataMap={
                blogsData?.items.map((blog, index) => (
                    <SingleBlog blog={blog} key={index} className='flex-none lg:w-[calc(33.33%-13.33px)] md:w-[calc(50%-10px)] w-full' />
                ))
            } loading={blogsLoading}
            />
        </div>
    );
};

export default BlogCarousel;
