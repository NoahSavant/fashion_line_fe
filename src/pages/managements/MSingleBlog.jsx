import React, { useState, useEffect, useContext } from 'react';
import { getConstantData } from '@/helpers/constantHelpers';
import PaginationDefault from '@/constants/PaginationDefault';
import { Input, Modal, Button, InputNumber } from "rsuite";
import { BasePagination, TableVariant } from './components';
import { blogEndpoints } from '@/apis'
import { useApi } from '@/hooks';
import { BlogStatus, TrueFalseStatus } from '@/constants';
import { SelectTag, SelectCategory, SingleSelect, SelectConstant } from '@/components/selects'
import { UploadFile } from '@/components/inputs'
import { PopupConfirmContext } from '@/contexts/PopupConfirmContext';
import { Loading } from '@/components';
import { useSearchParams } from "react-router-dom";
import { getIds } from '@/helpers/dataHelpers';
import { ClassicEditor } from "@/components/inputs";


const MSingleBlog = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [id, setId] = useState(null);
    const [blog, setBlog] = useState({
        name: '',
        short_description: '',
        tags: [],
        status: BlogStatus.OPEN,
        image: null,
        content: ''
    })

    const { openConfirmation } = useContext(PopupConfirmContext);
    const { SunEditorComponent, saveContent, loading: saveContentLoading, setContent } = ClassicEditor();

    useEffect(() => {
        if (searchParams.has('id')) {
            setId(searchParams.get('id'));
        } else {
            setContent(blog.content);
        }
    }, []);


    const [fetchBlog, setFetchBlog] = useState(true);

    const { data: blogData, callApi: handleGetBlog, loading: blogLoading } = useApi();
    const { data: createBlogData, callApi: handleCreateBlog, loading: createBlogLoading } = useApi();
    const { data: editBlogData, callApi: handleEditBlog, loading: editBlogLoading } = useApi();

    useEffect(() => {
        if (!fetchBlog || id == null) return;
        handleGetBlog(blogEndpoints.getSingle + id, {})
        setFetchBlog(false);
    }, [fetchBlog, id]);

    useEffect(() => {
        if (!blogData) return;
        setBlog({ ...blogData, tags: getIds(blogData.tags) });
        setContent(blogData.content);
    }, [blogData]);

    useEffect(() => {
        if (!editBlogData) return;
        setFetchBlog(false);
    }, [editBlogData]);

    const createBlog = async () => {
        const formData = new FormData();
        const newContent = await saveContent();
        formData.append('name', blog.name);
        formData.append('content', newContent);
        formData.append('short_description', blog.short_description);
        formData.append('status', blog.status);
        blog.tags.forEach((tag, index) => {
            formData.append(`tags[${index}]`, tag);
        });

        if (blog.image) {
            formData.append('image', blog.image);
        }

        handleCreateBlog(blogEndpoints.create, {
            method: "POST",
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    };

    const editBlog = async () => {
        const formData = new FormData();
        formData.append('name', blog.name);
        const newContent = await saveContent();
        formData.append('content', newContent);
        formData.append('short_description', blog.short_description);
        formData.append('status', blog.status);
        blog.tags.forEach((tag, index) => {
            formData.append(`tags[${index}]`, tag);
        });

        if (blog.image) {
            formData.append('image', blog.image);
        }

        handleEditBlog(blogEndpoints.update + '/' + id + '?_method=PUT', {
            method: "POST",
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    };

    return (
        <div className='p-5 flex flex-col gap-4'>
            {(blogLoading) && <Loading size={40} />}
            <div className='rounded-md shadow-md bg-white py-2 flex justify-between px-2 items-center'>
                <div className='text-lg font-semibold text-sapphire'>{id ? 'Blog Detail' : 'Create Blog'}</div>
                <div className="cursor-pointer px-3 py-2 bg-sapphire rounded-md justify-center items-center flex p-btn gap-2 shadow-ful w-fit" onClick={id ? editBlog : createBlog}>
                    {(createBlogLoading || editBlogLoading || saveContentLoading) && <Loading size={20} />}
                    <div className="text-white text-sm font-normal capitalize leading-normal">{id ? 'Update' : 'Create'}</div>
                </div>
            </div>
            <div className='rounded-md shadow-md bg-white py-2 flex flex-col gap-2'>
                <div className='flex flex-col gap-4 p-5'>
                    <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-col gap-1.5'>
                                <label>Name</label>
                                <Input
                                    placeholder="Name"
                                    value={blog.name}
                                    onChange={(value) => setBlog({ ...blog, name: value })}
                                />
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <label>Short Description</label>
                                <Input
                                    as="textarea" rows={6} placeholder="Short Description"
                                    value={blog.short_description}
                                    onChange={(value) => setBlog({ ...blog, short_description: value })}
                                />
                            </div>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <div className='grid grid-cols-1 gap-2'>
                                {/* <div className='flex flex-col gap-1.5'>
                                    <label>Tags</label>
                                    <SelectTag value={blog.tags} setValue={(value) => setBlog({ ...blog, tags: value })} />
                                </div> */}
                                <div className='flex flex-col gap-1.5'>
                                    <label>Status</label>
                                    <SingleSelect
                                        data={getConstantData(BlogStatus)}
                                        value={blog.status}
                                        onChange={(value) => setBlog({ ...blog, status: value })}
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <label>Image</label>
                                <UploadFile className='w-full h-[135px]' values={blog?.image_url ?? []} number={1} setValues={(value) => setBlog({ ...blog, image: value[0] })} />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-1.5'>
                        <label>Content</label>
                        {/* <Input
                            as="textarea" rows={5} placeholder="Description"
                            value={blog.content}
                            onChange={(value) => setBlog({ ...blog, content: value })}
                        /> */}
                        {SunEditorComponent}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MSingleBlog;
