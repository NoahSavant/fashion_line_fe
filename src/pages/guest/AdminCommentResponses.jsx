import React, { useState, useEffect } from 'react';
import { Button, Divider, Input, Rate } from 'rsuite';
import { IoCloseOutline } from '@/components/icons.js';
import { Loading } from '@/components';

const fakeComments = [
    { id: 1, username: 'Nguyễn Đức Thịnh', comment: 'Sản phẩm tuyệt vời!', rating: 4.5, adminResponse: null },
    { id: 2, username: 'Nguyễn Trung Sơn', comment: 'Thiết kế đẹp.', rating: 5, adminResponse: null },
    { id: 3, username: 'Hà Vĩ Khang', comment: 'Có thể tốt hơn.', rating: 3.5, adminResponse: 'Cảm ơn bạn đã đánh giá.' },
    { id: 4, username: 'Lâm Minh Cảnh', comment: 'Giá trị tốt cho tiền.', rating: 4.5, adminResponse: null },
    { id: 5, username: 'Trần Văn Nguyên', comment: 'Vận chuyển nhanh, nên sử dụng.', rating: 5, adminResponse: 'Cảm ơn phản hồi của bạn.' },
    { id: 6, username: 'Lê Thị Tuyết', comment: 'Không tệ, nhưng cũng không tuyệt.', rating: 2.5, adminResponse: 'Chúng tôi sẽ cố gắng cải thiện sản phẩm.' },
];

const AdminCommentResponses = () => {
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate an API call to fetch comments
        setTimeout(() => {
            setComments(fakeComments);
            setLoading(false);
        }, 1000);
    }, []);

    const handleAdminResponse = (commentId, response) => {
        const updatedComments = comments.map(comment =>
            comment.id === commentId ? { ...comment, adminResponse: response } : comment
        );
        setComments(updatedComments);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className='flex flex-col custom-padding'>
            {comments.length > 0 ? (
                <div>
                    {comments.map(comment => (
                        <div key={comment.id} className='flex justify-between items-center p-4 border-b gap-5'>
                            <div className='flex-1 flex flex-col gap-5'>
                                <div className='flex items-center gap-5'>
                                    <div className='text-lg font-medium'>{comment.username}</div>
                                    <Rate value={comment.rating} color="yellow" allowHalf />
                                </div>
                                <div className='text-gray-500'>{comment.comment}</div>
                                {comment.adminResponse ? (
                                    <div className='text-green-500 italic pl-10'>{comment.adminResponse}</div>
                                ) : (
                                    <div className='flex gap-2'>
                                        <Input
                                            placeholder='Phản hồi của admin...'
                                            value={comment.adminResponse || ''}
                                            onChange={value => handleAdminResponse(comment.id, value)}
                                            style={{ maxWidth: 'calc(100% - 100px)' }}
                                        />
                                        <Button appearance='primary' size='sm' onClick={() => handleAdminResponse(comment.id, comment.adminResponse)}>Gửi</Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    <Divider />
                </div>
            ) : (
                <div className='text-center text-lg font-medium py-10'>
                    Chưa có bình luận nào cần phản hồi.
                </div>
            )}
        </div>
    );
};

export default AdminCommentResponses;
