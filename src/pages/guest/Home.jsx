import { useEffect, useRef } from "react";
import { redirect, useSearchParams, useNavigate } from "react-router-dom";
import { Panel, Carousel } from "rsuite";
import {
    FaArrowLeftLong,
    VisibleIcon,
    FaStar
} from '@/components/icons.js';
import { PButton, Collection, Categories } from './components';
import BlogCarousel from "./BlogCarousel";

const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.75;
        }
    }, []);

    useEffect(() => {

        if (searchParams.has('code') && !searchParams.has('state')) {
            navigate('/signup?code=' + searchParams.get('code'));
            return;
        }

        if (searchParams.has('code') && searchParams.has('state')) {
            navigate('/signup-employee?code=' + searchParams.get('code') + "&state=" + searchParams.get('state'));
            return;
        }
    }, []);

    const resizeVideoFrames = () => {
        const frames = document.querySelectorAll('.video-frame');
        frames.forEach(frame => {
            const width = frame.offsetWidth;
            frame.style.height = `${width / 1.77777778}px`;
        });
    };

    useEffect(() => {
        resizeVideoFrames();

        window.addEventListener('resize', resizeVideoFrames);

        return () => {
            window.removeEventListener('resize', resizeVideoFrames);
        };
    }, []);

    return (
        <div className="flex flex-col">
            {/* Carousel */}
            <Carousel className="custom-carousel relative" autoplayinterval={5000} shape="bar">
                <div className="carousel-item relative">
                    <div onClick={() => navigate('/shop')} className="cursor-pointer absolute top-[calc(50% - 24px)] left-[calc(50% - 76px)] px-6 py-3 bg-sapphire rounded-3xl justify-center items-center gap-2.5 flex p-btn">
                        <div className="text-white text-base font-medium  capitalize leading-normal">Khám phá ngay</div>
                    </div>
                    <img src="https://res.cloudinary.com/dvcdmxgyk/image/upload/v1717733581/files/oqctc4z6v4fcple9k0pz.webp" />
                </div>
                <div className="carousel-item relative">
                    <div onClick={() => navigate('/shop')} className="cursor-pointer absolute top-[calc(50% - 24px)] left-[calc(50% - 76px)] px-6 py-3 bg-sapphire rounded-3xl justify-center items-center gap-2.5 flex p-btn">
                        <div className="text-white text-base font-medium  capitalize leading-normal">Khám phá ngay</div>
                    </div>
                    <img src="https://res.cloudinary.com/dvcdmxgyk/image/upload/v1717733325/files/lg8lb7qnqfwywxbjvjft.webp" />
                </div>
                <div className="carousel-item relative">
                    <div onClick={() => navigate('/shop')} className="cursor-pointer absolute top-[calc(50% - 24px)] left-[calc(50% - 76px)] px-6 py-3 bg-sapphire rounded-3xl justify-center items-center gap-2.5 flex p-btn">
                        <div className="text-white text-base font-medium  capitalize leading-normal">Khám phá ngay</div>
                    </div>
                    <img src="https://res.cloudinary.com/dvcdmxgyk/image/upload/v1717670382/files/yvxxta9ab9emazandibu.webp" />
                </div>
                <div className="carousel-item relative">
                    <div onClick={() => navigate('/shop')} className="cursor-pointer absolute top-[calc(50% - 24px)] left-[calc(50% - 76px)] px-6 py-3 bg-sapphire rounded-3xl justify-center items-center gap-2.5 flex p-btn">
                        <div className="text-white text-base font-medium  capitalize leading-normal">Khám phá ngay</div>
                    </div>
                    <img src="https://res.cloudinary.com/dvcdmxgyk/image/upload/v1717670440/files/rdcl3iy70vhzeryeh4dk.webp" />
                </div>
                <div className="carousel-item relative">
                    <div onClick={() => navigate('/shop')} className="cursor-pointer absolute top-[calc(50% - 24px)] left-[calc(50% - 76px)] px-6 py-3 bg-sapphire rounded-3xl justify-center items-center gap-2.5 flex p-btn">
                        <div className="text-white text-base font-medium  capitalize leading-normal">Khám phá ngay</div>
                    </div>
                    <img src="https://res.cloudinary.com/dvcdmxgyk/image/upload/v1717733536/files/mkr413cgkxs34pymizxf.webp" />
                </div>
            </Carousel>

            {/* Collection */}
            <Categories/>
            

            {/* Videos */}
            <div className="flex flex-col">
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 bg-zircon custom-padding">
                    <div className="flex-col justify-center items-start gap-4 flex animation-iv fade-in-left w-full h-full">
                        <div className="text-sapphire lg:text-[48px] text-4xl font-semibold  leading-[1]">Summer Fashion Styles</div>
                        <div className="text-boston_blue lg:text-[48px] text-4xl font-semibold  leading-[1]">Keep You Cool and Chic</div>
                        <div className="text-cinder text-base font-light  leading-normal">As temperatures rise and days lengthen, refresh your wardrobe with the latest summer fashion styles. Whether at the beach, a garden party, or enjoying a sunny day, these trendy outfits ensure you stay comfortable and stylish</div>
                    </div>
                    <div className="animation-iv fade-in-right">
                        <iframe className="video-frame rounded-3xl shadow-full w-full" src="https://www.youtube.com/embed/d3nmcELq4Sk?si=1XauK8D2DSTp-N2P"
                            frameBorder="0" allowFullScreen></iframe>
                    </div>
                </div>
                {/* <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 custom-padding">
                    <div className="flex-col justify-center items-start gap-4 flex animation-iv fade-in-right w-full h-full">
                        <div className="text-sapphire lg:text-[48px] text-4xl font-semibold  leading-[1]">Summer Fashion Trends</div>
                        <div className="text-boston_blue lg:text-[48px] text-4xl font-semibold  leading-[1]">Get ready for a stylish</div>
                        <div className="text-cinder text-base font-light  leading-normal">Ustainable fashion continues to rise, featuring recycled fabrics and upcycled pieces. Bright and neon colors are in, with neon tops and accessories adding vibrant pops. Finally, comfort reigns with relaxed silhouettes, including baggy pants and flowy dresses. Stay cool and trendy by embracing these summer styles!</div>
                    </div>
                    <div className="animation-iv fade-in-left lg:order-last">
                        <iframe className="video-frame rounded-3xl shadow-full w-full" src="https://www.youtube.com/embed/70uOrr6bZIg?si=NgZjHreDMWWL568u"
                            frameBorder="0" allowFullScreen></iframe>
                    </div>
                </div> */}
            </div>

            {/* Product */}
            <Collection limit={3} name='Các sản phẩm bán chạy'/>
            <Collection limit={3} name='Các sản phẩm mới' />

            <div className="relative">
                <video ref={videoRef} id="heroVideoBg" autoPlay loop muted className="w-full h-full max-h-[calc(100vh-100px)] object-cover group-hover:scale-125 transform transition-transform duration-500 ease-in-out shadow-full relative">
                    <source src="https://res.cloudinary.com/dvcdmxgyk/video/upload/v1718428337/files/3205917-hd_1920_1080_25fps_jc91ah.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center gap-5">
                    <div className="text-5xl text-white font-semibold line-clamp-2 p-4">Bộ sưu tập mùa hè</div>
                    <div className="shadow-full bg-transparent hover:bg-white border-2 rounded-none hover:rounded-lg border-white py-2 px-4 flex justify-start items-center group cursor-pointer overflow-hidden transform transition-all duration-500 ease-in-out">
                        <div onClick={() => navigate('/shop?collection[]=3')} className="text-white group-hover:text-sapphire flex gap-2 justify-center items-center ">
                            <div className="font-medium text-xl">View fashion</div>
                            <FaArrowLeftLong className="rotate-180" />
                        </div>
                    </div>
                </div>
            </div>
            

            {/* Blogs */}
            <BlogCarousel />
        </div>
    )
}

export default Home
