import React, { useState, useEffect } from 'react';
import { Button, Divider, IconButton, Input, Rate } from 'rsuite';
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

const CommentAndRate = () => {
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(true);
    const [visibleComments, setVisibleComments] = useState(3); // Number of comments to initially display

    useEffect(() => {
        // Simulate an API call to fetch comments
        setTimeout(() => {
            setComments(fakeComments);
            setLoading(false);
        }, 1000);
    }, []);

    const addComment = () => {
        const newComment = {
            id: comments.length + 1,
            username: 'Người dùng', // Replace with actual user data or integrate authentication
            comment: commentText,
            rating: rating,
            adminResponse: null, // No admin response initially
        };

        setComments([...comments, newComment]);
        setCommentText('');
        setRating(0);
    };

    const toggleVisibleComments = () => {
        setVisibleComments(visibleComments === 3 ? comments.length : 3); // Toggle to show all comments or limit to 3
    };

    const calculateAverageRating = () => {
        if (comments.length === 0) return 0;

        const totalRating = comments.reduce((acc, comment) => acc + comment.rating, 0);
        return (totalRating / comments.length).toFixed(1);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className='flex flex-col'>
            {comments.length > 0 ? (
                <div>
                    {comments.slice(0, visibleComments).map(comment => (
                        <div key={comment.id} className='flex justify-between items-center p-4 border-b gap-5'>
                            <div className='flex-1 flex flex-col gap-5'>
                                <div className='flex items-center gap-5'>
                                    <div className='text-lg font-medium'>{comment.username}</div>
                                    <Rate value={comment.rating} color="yellow" allowHalf />
                                </div>
                                <div className='text-gray-500'>{comment.comment}</div>
                                {comment.adminResponse && (
                                    <div className='text-green-500 italic pl-10'>{comment.adminResponse}</div>
                                )}
                            </div>
                        </div>
                    ))}
                    {comments.length > 3 && (
                        <div className='flex justify-center mt-4'>
                            <Button onClick={toggleVisibleComments}>
                                {visibleComments === 3 ? 'Xem thêm' : 'Thu gọn'}
                            </Button>
                        </div>
                    )}
                    <Divider />
                </div>
            ) : (
                <div className='text-center text-lg font-medium py-10'>
                    Chưa có nhận xét nào về sản phẩm này.
                </div>
            )}

            <div className='p-4'>
                <Input
                    as="textarea"
                    rows={3}
                    placeholder="Viết nhận xét của bạn..."
                    value={commentText}
                    onChange={value => setCommentText(value)}
                    block
                />
                <div className='mt-4'>
                    <Rate value={rating} onChange={value => setRating(value)} color="yellow" allowHalf />
                </div>
                <Button appearance="primary" onClick={addComment} className='mt-4'>Gửi nhận xét</Button>
            </div>

            <div className='p-4'>
                <div className='text-lg font-medium mb-2'>Đánh giá trung bình: {calculateAverageRating()}</div>
                <Rate value={parseFloat(calculateAverageRating())} allowHalf />
            </div>
        </div>
    );
};

export default CommentAndRate;
