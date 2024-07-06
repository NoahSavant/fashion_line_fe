import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from "react-router-dom";
import { commentEndpoints } from '@/apis';
import { Carousel, InputNumber } from 'rsuite';
import { useApi } from '@/hooks';
import { Loading } from '@/components';
import PaginationDefault from '@/constants/PaginationDefault';
import { Rate, Input, Button, List, Avatar, Divider } from 'rsuite';
import { FaStar } from 'react-icons/fa';
import CommentType from '@/constants/CommentType';

const SingleComment = ({ comment, open }) => {
    const [limit, setLimit] = useState(5);

    useEffect(() => {
        if(!comment || !open) return;
        handleGetComment(commentEndpoints.get, {
            params: {
                id: comment.id,
                type: CommentType,
                limit,
                page: 1,
                order: PaginationDefault.ORDER,
                cloumn: PaginationDefault.COLUMN
            }
        })
    }, [comment, open]);

    const { data: commentsData, callApi: handleGetComment, loading: commentsLoading } = useApi();

    const [content, setContent] = useState('');

    const handleCommentChange = (value) => {
        setContent(value);
    };

    const handleCommentSubmit = () => {
        
    };

    return (
        <div className='custom-padding flex flex-col'>
            <div className='flex flex-col gap-5'>
                <div>{comment.content}</div>
                {
                    open && <div className='flex flex-col gap-4 pl-5'>
                        {commentsLoading && <Loading />}
                        <List>
                            {commentsData?.items.map((item) => (
                                <List.Item key={item.id}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.user.image_url} />}
                                        title={
                                            <div>
                                                {item.user.username}
                                                <Rate readOnly value={item.rating} character={<FaStar />} />
                                            </div>
                                        }
                                        description={item.comment}
                                    />
                                </List.Item>
                            ))}
                        </List>
                        <Input
                            as="textarea"
                            rows={3}
                            placeholder="Bình luận..."
                            value={comment}
                            onChange={handleCommentChange}
                        />
                        <div className='w-full flex justify-end'>
                            <div className="cursor-pointer px-3 py-2 bg-sapphire rounded-md justify-center items-center flex p-btn gap-2 shadow-full w-fit" onClick={handleCommentSubmit}>
                                <div className="text-white text-sm font-normal capitalize leading-normal">Phản hồi</div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default SingleComment;
