import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
    const navigate = useNavigate();

    return (
        <div className="custom-padding flex flex-col gap-5">
            <div className='bg-gray-100 p-2 mb-4 -mt-3 flex gap-2 items-center'>
                <a href='/' className='text-base font-medium text-blue-500 cursor-pointer'>
                    Trang chủ
                </a>
                <div>/</div>
                <div className='text-base font-medium text-black'>
                    Giới thiệu
                </div>
            </div>
            <h1 className="text-4xl font-bold mb-6 text-center text-sapphire">Giới thiệu về FashionLine</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-center justify-center">
                    <img src="https://res.cloudinary.com/dvcdmxgyk/image/upload/v1720360520/files/photo-1-16709177635311734966766-crop-1670918089366925590608_o5kduz.webp" alt="Fashionline" className="rounded-lg shadow-lg" />
                </div>
                <div className="flex flex-col justify-center">
                    <p className="text-lg mb-4">
                        Fashionline là nền tảng mua sắm trực tuyến hàng đầu dành cho những người yêu thời trang. Với mục
                        tiêu mang đến sự đổi mới và phong cách đẳng cấp, chúng tôi tự hào là điểm đến lý tưởng cho những
                        ai mong muốn tìm kiếm những sản phẩm thời trang độc đáo và chất lượng nhất.
                    </p>
                    <p className="text-lg mb-4">
                        Tại Fashionline, chúng tôi không chỉ đơn thuần cung cấp sản phẩm mà còn mang đến cho bạn một trải
                        nghiệm mua sắm đáng nhớ. Chúng tôi chăm sóc từng chi tiết nhỏ nhất để đảm bảo rằng bạn luôn cảm
                        thấy hài lòng và tự tin khi chọn lựa sản phẩm của chúng tôi.
                    </p>
                    <p className="text-lg mb-4">
                        Với sứ mệnh "Nâng tầm phong cách, thể hiện cá tính", chúng tôi không ngừng nỗ lực để đáp ứng và
                        vượt qua sự mong đợi của khách hàng. Dù bạn là một tín đồ thời trang hay đang tìm kiếm phong cách
                        mới, Fashionline luôn sẵn sàng phục vụ và mang đến cho bạn những trải nghiệm mua sắm tuyệt vời
                        nhất.
                    </p>
                    <p className="text-lg mb-4">
                        Hãy khám phá ngay hôm nay và cùng chúng tôi khám phá thế giới thời trang đầy màu sắc và phong phú.
                        Chào mừng bạn đến với Fashionline - nơi nâng tầm phong cách của bạn!
                    </p>
                    <div onClick={() => navigate('/shop')} className="cursor-pointer w-fit px-6 py-3 bg-sapphire rounded-3xl justify-center items-center gap-2.5 flex p-btn">
                        <div className="text-white text-base font-medium  capitalize leading-normal">Khám phá ngay</div>
                    </div>
                </div>

            </div>
            <div className="text-center mt-8">
                <p className="text-lg">
                    Hãy tham gia cùng chúng tôi để khám phá và trải nghiệm sự hoàn hảo của thế giới
                    thời trang tại Fashionline ngay hôm nay!
                </p>
            </div>
        </div>
    );
};

export default About;
