import React from 'react';

const About = () => {
    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-bold mb-6 text-center">Giới thiệu về Fashionline</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-center justify-center">
                    <img src="https://res.cloudinary.com/dvcdmxgyk/image/upload/v1720360520/files/photo-1-16709177635311734966766-crop-1670918089366925590608_o5kduz.webp" alt="Fashionline" className="rounded-lg shadow-lg" />
                </div>
                <div className="flex flex-col justify-center">
                    <p className="text-lg mb-4">
                        Fashionline là nền tảng mua sắm trực tuyến chuyên cung cấp các sản phẩm thời trang
                        cao cấp và phụ kiện đi kèm. Chúng tôi cam kết mang đến cho khách hàng những trải
                        nghiệm mua sắm tuyệt vời với sự đa dạng về sản phẩm và dịch vụ chăm sóc khách hàng
                        tận tâm.
                    </p>
                    <p className="text-lg mb-4">
                        Chúng tôi tự hào là điểm đến lý tưởng dành cho những người yêu thời trang, nơi bạn
                        có thể tìm thấy những xu hướng mới nhất và những thiết kế độc đáo, từ những thương
                        hiệu nổi tiếng đến những thiết kế độc quyền chỉ có tại Fashionline.
                    </p>
                    <p className="text-lg mb-4">
                        Được thành lập từ năm 2010, Fashionline luôn không ngừng nâng cao chất lượng sản phẩm
                        và dịch vụ để đáp ứng sự mong đợi của khách hàng. Chúng tôi cam kết cung cấp một trải
                        nghiệm mua sắm trực tuyến an toàn, tiện lợi và đầy thú vị.
                    </p>
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
