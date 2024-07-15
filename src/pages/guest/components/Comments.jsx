import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from "react-router-dom";
import { commentEndpoints } from '@/apis';
import { Carousel, InputNumber } from 'rsuite';
import { useApi } from '@/hooks';
import { Loading } from '@/components';
import PaginationDefault from '@/constants/PaginationDefault';
import { Rate, Input, Button, List, Avatar, Divider, Modal } from 'rsuite';
import { FaStar } from 'react-icons/fa';
import { getAuthentication } from "@/helpers/authenHelpers";
import { PopupConfirmContext } from '@/contexts/PopupConfirmContext';
import { UserRole } from "@/constants";
import CommentType from '@/constants/CommentType';

const Comments = ({ id, type }) => {
    const [user, setUser] = useState(getAuthentication()?.user ?? null);
    const [limit, setLimit] = useState(5);
    const [fetchComments, setFetchComments] = useState(true);
    const { data: createComment, callApi: handleCreateComment, loading: createCommentLoading } = useApi();
    const { data: commentsData, callApi: handleGetComments, loading: commentsLoading } = useApi();
    const { data: updateCommentData, callApi: handleUpdateComment, loading: updateCommentLoading } = useApi();
    const { data: deleteCommentData, callApi: handleDeleteComment, loading: deleteCommentLoading } = useApi();
    const [reply, setReply] = useState({
        id: null,
        content: ''
    });

    const { openConfirmation } = useContext(PopupConfirmContext);

    const loadMore = () => {
        setLimit(limit + 5);
    }

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
        if (limit <= 5) return;
        setFetchComments(true);
    }, [limit]);

    useEffect(() => {
        if(!createComment?.successMessage) return;
        setFetchComments(true);
        setReply({
            id: null,
            content: ''
        })
    }, [createComment]);

    useEffect(() => {
        if (!updateCommentData?.successMessage) return;
        setFetchComments(true);
    }, [updateCommentData]);

    useEffect(() => {
        if (!deleteCommentData?.successMessage) return;
        setFetchComments(true);
    }, [deleteCommentData]);

    useEffect(() => {
        if (!commentsData?.items) return;
        if (commentsData?.user_comment) {
            setComment(commentsData?.user_comment);
        }
    }, [commentsData]);

    const [comment, setComment] = useState({
        rate: 5,
        content: ''
    });

    const handleCommentSubmit = (currenId, currentType, currentComment) => {
        handleCreateComment(commentEndpoints.create, {
            method: "POST",
            params: {
                commentmorph_id: currenId,
                commentmorph_type: currentType,
                ...currentComment
            }
        })
    };

    const updateComment = () => {
        handleUpdateComment(commentEndpoints.update + `/${comment.id}`, {
            method: "PUT",
            params: {
                commentmorph_id: id,
                commentmorph_type: type,
                content: comment.content,
                rate: comment.rate
            }
        })
    }

    const confirmDeleteComment = (id) => {
        openConfirmation(deleteComment, [id], 'Bạn có chắc muốn xóa bình luận này không ?');
    };

    const deleteComment = (currenId) => {
        handleDeleteComment(commentEndpoints.delete, {
            method: "DELETE",
            data: { ids: [currenId] }
        });
    }

    const confirmUpdateComment = () => {
        openConfirmation(updateComment, [], 'Bạn có chắc muốn cập nhật bình luận này không ?');
    };

    return (
        <div className='flex flex-col gap-5'>
            {commentsLoading && <Loading />}
            {
                commentsData?.avg_rate > 0 && 
                <div className='flex md:flex-row flex-col gap-5 justify-center items-center'>
                    <div className='flex gap-5 justify-center items-center'>
                        <div className="text-center text-4xl text-yellow-500 font-semibold line-clamp-2">{commentsData?.avg_rate?.toFixed(1)}</div>
                        <Rate
                            value={commentsData?.avg_rate}
                            color="yellow"
                            readOnly
                        />
                    </div>

                </div>
            }
            <div className="flex flex-col gap-2 items-center">
                <div className="text-sapphire lg:text-4xl md:text-3xl text-2xl font-semibold  leading-[1] text-center">Bình luận</div>
            </div>
            {
                (user?.role == UserRole.CUSTOMER && !comment.id) &&
                <div className='flex flex-col gap-4'>
                        <h3>Bình luận ngay</h3>
                        <Rate
                            value={comment.rate}
                            onChange={(value) => setComment({ ...comment, rate: Math.max(1, value)})}
                            color="yellow"
                            allowHalf
                        />
                        <Input
                            as="textarea"
                            rows={3}
                            placeholder="Bình luận..."
                            value={comment.content}
                            onChange={(value) => setComment({ ...comment, content: value })}
                        />
                        <div className='w-full flex justify-end'>
                            <div className="cursor-pointer px-3 py-2 bg-sapphire rounded-md justify-center items-center flex p-btn gap-2 shadow-full w-fit" onClick={() => handleCommentSubmit(id, type, comment)}>
                                {createCommentLoading && <Loading size={20} />}
                                <div className="text-white text-sm font-normal capitalize leading-normal">Bình luận</div>
                            </div>
                        </div>
                </div>
            }
            {
                (user?.role == UserRole.CUSTOMER && comment.id) &&
                <div className='flex flex-col gap-4'>
                    <h3>Bình luận của bạn</h3>
                    <Rate
                        value={comment.rate}
                        onChange={(value) => setComment({ ...comment, rate: Math.max(1, value) })}
                        color="yellow"
                        allowHalf
                    />
                    <Input
                        as="textarea"
                        rows={3}
                        placeholder="Bình luận..."
                        value={comment.content}
                        onChange={(value) => setComment({ ...comment, content: value })}
                    />
                    <div className='w-full flex justify-end gap-5'>
                        {
                            !comment.replies[0] &&
                            <>
                                    <div className="cursor-pointer px-3 py-2 bg-sapphire rounded-md justify-center items-center flex p-btn gap-2 shadow-full w-fit" onClick={confirmUpdateComment}>
                                        {updateCommentLoading && <Loading size={20} />}
                                        <div className="text-white text-sm font-normal capitalize leading-normal">Cập nhật</div>
                                    </div>
                                    <div className="cursor-pointer px-3 py-2 bg-red-600 rounded-md justify-center items-center flex p-btn gap-2 shadow-full w-fit" onClick={() => confirmDeleteComment(comment.id)}>
                                        {deleteCommentLoading && <Loading size={20} />}
                                        <div className="text-white text-sm font-normal capitalize leading-normal">Xóa bình luận</div>
                                    </div>
                            </>
                        }
                            
                    </div>
                </div>
            }
            <div className='flex flex-col gap-5'>
                {
                    commentsData?.items.length > 0 ? 
                    <div className='flex flex-col gap-4'>
                        <h3>Các bình luận</h3>
                        <div>
                                {(deleteCommentLoading && user.role !== UserRole.CUSTOMER) && <Loading size={20} />}
                                {commentsData?.items.map(item => (
                                    <div key={item.id} className='flex justify-between items-center p-4 border-t gap-5'>
                                        <div className='flex-1 flex flex-col gap-5'>
                                            <div className='flex justify-between items-start'>
                                                <div className='flex-1 flex flex-col gap-3'>
                                                    <div className='flex md:flex-row flex-col md:items-center gap-3'>
                                                        <div className='flex gap-3 md:justify-center items-center'>
                                                            <Avatar src={item.user.image_url} circle />
                                                            <div className='text-lg font-medium'>{item.user.username}</div>
                                                        </div>
                                                        <Rate value={item.rate} color="yellow" readOnly size='sm' allowHalf />
                                                    </div>
                                                    <div className='text-gray-500'>{item.content}</div>
                                                </div>
                                                {
                                                    (user && user?.role !== UserRole.CUSTOMER) &&
                                                    <div className='flex md:flex-row flex-col gap-4'>
                                                        <div className="cursor-pointer px-3 py-2 bg-sapphire rounded-md justify-center items-center flex p-btn gap-2 shadow-full w-fit" onClick={() => setReply({ id: item.id, content: '' })}>
                                                            <div className="text-white text-sm font-normal capitalize leading-normal">Phản hồi</div>
                                                        </div>
                                                        <div className="cursor-pointer px-3 py-2 bg-red-600 rounded-md justify-center items-center flex p-btn gap-2 shadow-full w-fit" onClick={() => confirmDeleteComment(item.id)}>
                                                            <div className="text-white text-sm font-normal capitalize leading-normal">Xóa</div>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                            {item.replies[0] && (
                                                <div className='flex-1 flex flex-col gap-3 pl-10'>
                                                    <div className='flex md:flex-row flex-col md:items-center gap-3'>
                                                        <div className='flex gap-3 md:justify-center items-center'>
                                                            <Avatar src={item.replies[0].user.image_url} circle />
                                                            <div className='text-lg font-medium'>{item.replies[0].user.username}</div>
                                                        </div>
                                                    </div>
                                                    <div className='text-gray-500'>{item.replies[0].content}</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {commentsData?.pagination.currentPage < commentsData?.pagination.lastPage && (
                                    <div className='w-full flex justify-center'>
                                        <div onClick={loadMore} className="cursor-pointer px-3 py-2 text-sapphire hover:text-white  bg-white hover:bg-sapphire rounded-md justify-center items-center flex gap-2 shadow-full border-2 border-sapphire min-w-fit md:w-fit w-full">
                                            <div className="text-sm font-normal capitalize leading-normal whitespace-nowrap">Xem thêm</div>
                                        </div>
                                    </div>
                                )}
                        </div>
                    </div> :
                    <div className='w-full h-[calc(150px)] flex justify-center items-center'>
                        <div className="text-center text-xl text-sapphire font-semibold line-clamp-2">Hiện chưa có</div>
                    </div>
                }
                
            </div>
            <Modal size='sm' open={reply.id} onClose={() => setReply({
                id: null,
                content: ''
            })} >
                <Modal.Header>
                    <Modal.Title>Phản hồi bình luận</Modal.Title>
                </Modal.Header>
                <Modal.Body className='px-2 -mx-2'>
                    <div className='flex flex-col gap-4 items-end'>
                        <div className='flex flex-col gap-1.5 w-full'>
                            <label>Phẩn hồi</label>
                            <Input
                                as="textarea"
                                rows={3}
                                placeholder="Bình luận..."
                                value={reply.content}
                                onChange={(value) => setReply({ ...reply, content: value })}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="pt-2">
                    <Button onClick={() => setReply({
                        id: null,
                        content: ''
                    })} appearance="subtle">
                        Hủy
                    </Button>
                    <Button onClick={() => handleCommentSubmit(reply.id, CommentType.COMMENT, {content: reply.content})} appearance="primary">
                        {createCommentLoading && <Loading size={20} />}
                        Phản hồi
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Comments;
