import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from "react-router-dom";
import { commentEndpoints } from '@/apis';
import { Carousel, InputNumber } from 'rsuite';
import { useApi } from '@/hooks';
import { Loading } from '@/components';
import PaginationDefault from '@/constants/PaginationDefault';
import { Rate, Input, Button, List, Avatar, Divider } from 'rsuite';
import { FaStar } from 'react-icons/fa';

const Comments = ({ id, type }) => {
    const [limit, setLimit] = useState(5);
    const [fetchComments, setFetchComments] = useState(true);
    const { data: createComment, callApi: handleCreateComment, loading: createCommentLoading } = useApi();
    const { data: commentsData, callApi: handleGetComments, loading: commentsLoading } = useApi();

    useEffect(() => {
        if(!id || !fetchComments) return;
        handleGetComments(commentEndpoints.get, {
            params: {
                id,
                type,
                limit,
                page: 1,
                order: PaginationDefault.ORDER,
                cloumn: PaginationDefault.COLUMN
            }
        })
        setFetchComments(false);
    }, [fetchComments, id]);

    useEffect(() => {
        if(!createComment) return;
        setFetchComments(true);
    }, [createComment]);

    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    const handleRatingChange = (value) => {
        setRating(value);
    };

    const handleCommentChange = (value) => {
        setComment(value);
    };

    const handleCommentSubmit = () => {
        handleCreateComment(commentEndpoints.create, {
            method: "POST",
            params: {
                commentmorph_id: id,
                commentmorph_type: type,
                content: comment,
                rate: rating,
            }
        })
    };

    return (
        <div className='custom-padding flex flex-col'>
            {commentsLoading && <Loading />}
            <div className='flex flex-col gap-5'>
                <h3>Bình luận ngay</h3>
                <Rate
                    value={rating}
                    onChange={handleRatingChange}
                    color="yellow"
                    allowHalf
                />
                <Input
                    as="textarea"
                    rows={3}
                    placeholder="Bình luận..."
                    value={comment}
                    onChange={handleCommentChange}
                />
                <div className='w-full flex justify-end'>
                    <div className="cursor-pointer px-3 py-2 bg-sapphire rounded-md justify-center items-center flex p-btn gap-2 shadow-full w-fit" onClick={handleCommentSubmit}>
                        <div className="text-white text-sm font-normal capitalize leading-normal">Bình luận</div>
                    </div>
                </div>
                <Divider />
                <h3>Các bình luận</h3>
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
            </div>
        </div>
    );
};

export default Comments;
