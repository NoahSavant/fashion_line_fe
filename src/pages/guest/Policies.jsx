import React from 'react';
import { useNavigate } from 'react-router-dom';

const Policies = () => {
    const navigate = useNavigate();

    return (
        <div className="custom-padding flex flex-col gap-5">
            <div className='bg-gray-100 p-2 mb-4 -mt-3 flex gap-2 items-center'>
                <a href='/' className='text-base font-medium text-blue-500 cursor-pointer'>
                    Trang chủ
                </a>
                <div>/</div>
                <div className='text-base font-medium text-black'>
                    Chính sách
                </div>
            </div>
            <h1 className="text-4xl font-bold mb-6 text-center text-sapphire">Chính sách của chúng tôi</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-start justify-center">
                    <img src="https://res.cloudinary.com/dvcdmxgyk/image/upload/v1720934236/2210.i101.018.F.m004.c9.product_quality_control_isometric_vjm5na.jpg" alt="Policies" className="rounded-lg shadow-lg" />
                </div>
                <div className="flex flex-col justify-center">
                    <p className="text-lg mb-4">
                        Tại Fashionline, chúng tôi cam kết mang đến cho khách hàng những sản phẩm chất lượng cao và dịch vụ hoàn hảo. Dưới đây là các chính sách chính mà chúng tôi áp dụng:
                    </p>
                    <p className="text-lg mb-4">
                        <strong>Chính sách đổi trả:</strong> Chúng tôi chấp nhận đổi trả sản phẩm trong vòng 30 ngày kể từ ngày mua hàng, miễn là sản phẩm còn nguyên vẹn và chưa qua sử dụng.
                    </p>
                    <p className="text-lg mb-4">
                        <strong>Chính sách bảo hành:</strong> Sản phẩm của chúng tôi được bảo hành trong vòng 1 năm đối với lỗi kỹ thuật do nhà sản xuất. Quý khách vui lòng liên hệ với chúng tôi để biết thêm chi tiết về các trường hợp bảo hành.
                    </p>
                    <p className="text-lg mb-4">
                        <strong>Chính sách hoàn tiền:</strong> Trong trường hợp sản phẩm không đáp ứng được yêu cầu của quý khách, chúng tôi sẽ hoàn lại tiền một cách nhanh chóng và thuận tiện.
                    </p>
                    <p className="text-lg mb-4">
                        <strong>Chính sách vận chuyển:</strong> Chúng tôi cung cấp dịch vụ giao hàng nhanh chóng và đảm bảo. Quý khách có thể chọn phương thức giao hàng tiêu chuẩn hoặc nhanh chóng phù hợp với nhu cầu.
                    </p>
                    <p className="text-lg mb-4">
                        <strong>Chính sách bảo mật:</strong> Chúng tôi cam kết bảo vệ thông tin cá nhân của khách hàng và sử dụng nó chỉ cho mục đích nội bộ để cải thiện dịch vụ.
                    </p>
                    <p className="text-lg mb-4">
                        <strong>Chính sách thanh toán:</strong> Chúng tôi chấp nhận thanh toán bằng nhiều phương thức an toàn và tiện lợi như thẻ tín dụng, chuyển khoản ngân hàng và thanh toán khi nhận hàng.
                    </p>
                    <a href='mailto:fashionlineunique@gmail.com' className="cursor-pointer w-fit px-6 py-3 bg-sapphire rounded-3xl justify-center items-center gap-2.5 flex p-btn">
                        <div className="text-white text-base font-medium capitalize leading-normal">Liên hệ qua mail</div>
                    </a>
                </div>

            </div>
            <div className="text-center mt-8">
                <p className="text-lg">
                    Hãy yên tâm mua sắm tại Fashionline với những cam kết về chất lượng và dịch vụ tuyệt vời nhất!
                </p>
            </div>
        </div>
    );
};

export default Policies;
