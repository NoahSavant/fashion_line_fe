import React, { useState } from 'react';
import ProductModal from './ProductModal';
import { useNavigate } from 'react-router-dom';
import { calculateReadingTime } from '@/helpers/dataHelpers';
import { formatDate } from '@/helpers/dateTimeHelpers';
import {
    VisibleIcon,
    FaStar
} from '@/components/icons.js';
const SingleBlog = ({ blog, className='' }) => {
    const temp = 'flex-none lg:w-[calc(33.33%-13.33px)] md:w-[calc(50%-10px)]';
    const navigate = useNavigate();

    return (
        <div className={`w-full flex flex-col gap-4 ${className} shadow-lg rounded-md`}>
            <div className="flex-grow overflow-hidden relative group w-full pb-[60%] p-2">
                <div className="absolute inset-0">
                    <img className="w-full h-full object-contain" src={blog.image_url} />  
                </div>
            </div>
            <div className="flex flex-col gap-2 p-2">
                <div className="text-xl text-sapphire font-semibold line-clamp-2">{blog.name}</div>
                <div className="flex justify-between items-center">
                    <div className="text-base text-gray-400 flex justify-center items-center gap-1">
                        <div className='whitespace-nowrap'>{calculateReadingTime(blog.content)}</div>
                    </div>
                    {
                        blog.average_rate && 
                        <>
                            <div className="w-full h-px bg-gray-400 mx-2"></div>
                            <div className="text-base text-gray-400 flex justify-center items-center gap-1">
                                <div>{blog.average_rate}</div>
                                <FaStar />
                            </div>
                        </>
                    }
                </div>
                <div className="text-base text-black font-medium line-clamp-3">{blog.short_description}</div>
                <div className="flex justify-between items-center">
                    <div className="text-base text-gray-400">{formatDate(blog.updated_at)}</div>
                    <div className="text-base text-sapphire hover:text-orange-500 cursor-pointer font-medium" onClick={() => navigate(`/blog-detail?id=${blog.id}`)}>Xem chi tiết</div>
                </div>
            </div>
        </div>
    );
};

export default SingleBlog;
