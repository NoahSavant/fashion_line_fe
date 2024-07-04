import { useEffect, useRef } from "react";
import { redirect, useSearchParams, useNavigate } from "react-router-dom";
import { Panel, Carousel } from "rsuite";
import {
    FaArrowLeftLong,
    VisibleIcon,
    FaStar
} from '@/components/icons.js';
import { PButton, Collection, Categories } from './components';

const collection = {
    title: "Our Best Sellers",
    image: "https://res.cloudinary.com/dvcdmxgyk/image/upload/v1718419325/files/parker-burchfield-tvG4WvjgsEY-unsplash_h48a95.jpg",
    slug: "best-sellers",
    products: [
        {
            first_image: "https://res.cloudinary.com/dvcdmxgyk/image/upload/v1718419325/files/parker-burchfield-tvG4WvjgsEY-unsplash_h48a95.jpg",
            second_image: "https://res.cloudinary.com/dvcdmxgyk/image/upload/v1718419325/files/parker-burchfield-tvG4WvjgsEY-unsplash_h48a95.jpg",
            name: "Product 1",
            original_price: 120000,
            price: 100000,
            rate: 4.5,
            short_description: "This is a short description of Product 1.",
            tags: [
                { content: "New", color: "#28a745" },
                { content: "Sale", color: "#dc3545" }
            ],
            mark: true
        },
        {
            first_image: "https://res.cloudinary.com/dvcdmxgyk/image/upload/v1718419325/files/parker-burchfield-tvG4WvjgsEY-unsplash_h48a95.jpg",
            second_image: "https://res.cloudinary.com/dvcdmxgyk/image/upload/v1718419325/files/parker-burchfield-tvG4WvjgsEY-unsplash_h48a95.jpg",
            name: "Product 2",
            original_price: 150000,
            price: 130000,
            rate: 4.0,
            short_description: "This is a short description of Product 2.",
            tags: [
                { content: "Featured", color: "#007bff" }
            ],
            mark: false
        },
        {
            first_image: "https://res.cloudinary.com/dvcdmxgyk/image/upload/v1718419325/files/parker-burchfield-tvG4WvjgsEY-unsplash_h48a95.jpg",
            second_image: "https://res.cloudinary.com/dvcdmxgyk/image/upload/v1718419325/files/parker-burchfield-tvG4WvjgsEY-unsplash_h48a95.jpg",
            name: "Product 3",
            original_price: 180000,
            price: 170000,
            rate: 5.0,
            short_description: "This is a short description of Product 3.",
            tags: [
                { content: "Best Seller", color: "#6f42c1" },
                { content: "Limited Edition", color: "#fd7e14" }
            ],
            mark: true
        }
    ]
};


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
                    <div className="cursor-pointer absolute top-[calc(50% - 24px)] left-[calc(50% - 76px)] px-6 py-3 bg-sapphire rounded-3xl justify-center items-center gap-2.5 flex p-btn">
                        <div className="text-white text-base font-medium  capitalize leading-normal">Shopping now</div>
                    </div>
                    <img src="https://res.cloudinary.com/dvcdmxgyk/image/upload/v1717733581/files/oqctc4z6v4fcple9k0pz.webp" />
                </div>
                <div className="carousel-item relative">
                    <div className="cursor-pointer absolute top-[calc(50% - 24px)] left-[calc(50% - 76px)] px-6 py-3 bg-sapphire rounded-3xl justify-center items-center gap-2.5 flex p-btn">
                        <div className="text-white text-base font-medium  capitalize leading-normal">Shopping now</div>
                    </div>
                    <img src="https://res.cloudinary.com/dvcdmxgyk/image/upload/v1717733325/files/lg8lb7qnqfwywxbjvjft.webp" />
                </div>
                <div className="carousel-item relative">
                    <div className="cursor-pointer absolute top-[calc(50% - 24px)] left-[calc(50% - 76px)] px-6 py-3 bg-sapphire rounded-3xl justify-center items-center gap-2.5 flex p-btn">
                        <div className="text-white text-base font-medium  capitalize leading-normal">Shopping now</div>
                    </div>
                    <img src="https://res.cloudinary.com/dvcdmxgyk/image/upload/v1717670382/files/yvxxta9ab9emazandibu.webp" />
                </div>
                <div className="carousel-item relative">
                    <div className="cursor-pointer absolute top-[calc(50% - 24px)] left-[calc(50% - 76px)] px-6 py-3 bg-sapphire rounded-3xl justify-center items-center gap-2.5 flex p-btn">
                        <div className="text-white text-base font-medium  capitalize leading-normal">Shopping now</div>
                    </div>
                    <img src="https://res.cloudinary.com/dvcdmxgyk/image/upload/v1717670440/files/rdcl3iy70vhzeryeh4dk.webp" />
                </div>
                <div className="carousel-item relative">
                    <div className="cursor-pointer absolute top-[calc(50% - 24px)] left-[calc(50% - 76px)] px-6 py-3 bg-sapphire rounded-3xl justify-center items-center gap-2.5 flex p-btn">
                        <div className="text-white text-base font-medium  capitalize leading-normal">Shopping now</div>
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
            <Collection limit={3} name='New'/>

            <div className="relative">
                <video ref={videoRef} id="heroVideoBg" autoPlay loop muted className="w-full h-full max-h-[calc(100vh-100px)] object-cover group-hover:scale-125 transform transition-transform duration-500 ease-in-out shadow-full relative">
                    <source src="https://res.cloudinary.com/dvcdmxgyk/video/upload/v1718428337/files/3205917-hd_1920_1080_25fps_jc91ah.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center gap-5">
                    <div className="text-5xl text-white font-semibold line-clamp-2 p-4">Collection title</div>
                    <div className="shadow-full bg-transparent hover:bg-white border-2 rounded-none hover:rounded-lg border-white py-2 px-4 flex justify-start items-center group cursor-pointer overflow-hidden transform transition-all duration-500 ease-in-out">
                        <div className="text-white group-hover:text-sapphire flex gap-2 justify-center items-center ">
                            <div className="font-medium text-xl">View fashion</div>
                            <FaArrowLeftLong className="rotate-180" />
                        </div>
                    </div>
                </div>
            </div>
            

            {/* Blogs */}
            <div className="custom-padding flex flex-col gap-10">
                <div className="flex flex-col gap-2 items-center">
                    <div className="text-sapphire lg:text-5xl md:text-4xl text-3xl font-semibold  leading-[1] text-center">Fashion News</div>
                </div>
                <div className="flex justify-center items-center gap-4 container-scroll relative md:px-0 px-1">
                    <div className="shadow-right-only absolute top-[calc(50%-32px)] md:-left-6 -left-5 cursor-pointer left-scroll bg-white rounded-full z-10">
                        <svg
                            version="1.1"
                            id="Layer_1"
                            width="50px"
                            height="50px"
                            viewBox="0 0 100 100"
                            enableBackground="new 0 0 100 100"
                            xmlSpace="preserve"
                            style={{ fill: '#2c4fa3', stroke: '#2c4fa3' }}
                        >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <g>
                                    <path
                                        d="M44.942,50.412l14.037-15.487c0.742-0.818,0.68-2.083-0.139-2.824c-0.817-0.742-2.083-0.679-2.824,0.139L40.784,49.044 c-0.409,0.451-0.565,1.038-0.493,1.598c-0.016,0.564,0.196,1.131,0.647,1.539L57.74,67.412c0.383,0.348,0.864,0.519,1.344,0.519 c0.545,0,1.087-0.222,1.482-0.657c0.741-0.818,0.68-2.083-0.139-2.824L44.942,50.412z"
                                    ></path>
                                    <path
                                        d="M84.133,49.756c0-18.448-15.01-33.457-33.458-33.457S17.218,31.308,17.218,49.756c0,18.449,15.009,33.458,33.457,33.458 S84.133,68.205,84.133,49.756z M50.675,79.214c-16.243,0-29.457-13.215-29.457-29.458c0-16.242,13.214-29.457,29.457-29.457 c16.243,0,29.458,13.215,29.458,29.457C80.133,65.999,66.918,79.214,50.675,79.214z"
                                    ></path>
                                </g>
                            </g>
                        </svg>
                    </div>
                    <div className="flex gap-5 w-full overflow-auto hidden-scroll-bar list-scroll">
                        <div className="flex-none lg:w-[calc(33.33%-13.33px)] md:w-[calc(50%-10px)] w-full flex flex-col gap-4">
                            <img className="w-full h-80 object-cover" src="https://res.cloudinary.com/dvcdmxgyk/image/upload/v1718419325/files/parker-burchfield-tvG4WvjgsEY-unsplash_h48a95.jpg" />
                            <div className="flex flex-col gap-2 px-2">
                                <div className="text-xl text-sapphire font-semibold line-clamp-2">Name</div>
                                <div className="flex justify-between items-center">
                                    <div className="text-base text-gray-400 flex justify-center items-center gap-1">
                                        <div>3.1k</div>
                                        <VisibleIcon/>
                                    </div>
                                    <div className="w-full h-px bg-gray-400 mx-2"></div>
                                    <div className="text-base text-gray-400 flex justify-center items-center">
                                        <div>4.1</div>
                                        <FaStar />
                                    </div>
                                </div>
                                <div className="text-base text-black font-medium line-clamp-3">mô tả slfgjsl;d nadjksgh lksdng lakdhfglnd fh.df l;sdng ldfhlg jlngd hladfg</div>
                                <div className="flex justify-between items-center">
                                    <div className="text-base text-gray-400">Jun, 20 2024</div>
                                    <div className="text-base text-sapphire hover:text-orange-500 cursor-pointer font-medium">Read more</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-none lg:w-[calc(33.33%-13.33px)] md:w-[calc(50%-10px)] w-full flex flex-col gap-4">
                            <img className="w-full h-80 object-cover" src="https://res.cloudinary.com/dvcdmxgyk/image/upload/v1718419325/files/parker-burchfield-tvG4WvjgsEY-unsplash_h48a95.jpg" />
                            <div className="flex flex-col gap-2 px-2">
                                <div className="text-xl text-sapphire font-semibold line-clamp-2">Name</div>
                                <div className="flex justify-between items-center">
                                    <div className="text-base text-gray-400 flex justify-center items-center gap-1">
                                        <div>3.1k</div>
                                        <VisibleIcon />
                                    </div>
                                    <div className="w-full h-px bg-gray-400 mx-2"></div>
                                    <div className="text-base text-gray-400 flex justify-center items-center">
                                        <div>4.1</div>
                                        <FaStar />
                                    </div>
                                </div>
                                <div className="text-base text-black font-medium line-clamp-3">mô tả slfgjsl;d nadjksgh lksdng lakdhfglnd fh.df l;sdng ldfhlg jlngd hladfg</div>
                                <div className="flex justify-between items-center">
                                    <div className="text-base text-gray-400">Jun, 20 2024</div>
                                    <div className="text-base text-sapphire hover:text-orange-500 cursor-pointer font-medium">Read more</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-none lg:w-[calc(33.33%-13.33px)] md:w-[calc(50%-10px)] w-full flex flex-col gap-4">
                            <img className="w-full h-80 object-cover" src="https://res.cloudinary.com/dvcdmxgyk/image/upload/v1718419325/files/parker-burchfield-tvG4WvjgsEY-unsplash_h48a95.jpg" />
                            <div className="flex flex-col gap-2 px-2">
                                <div className="text-xl text-sapphire font-semibold line-clamp-2">Name</div>
                                <div className="flex justify-between items-center">
                                    <div className="text-base text-gray-400 flex justify-center items-center gap-1">
                                        <div>3.1k</div>
                                        <VisibleIcon />
                                    </div>
                                    <div className="w-full h-px bg-gray-400 mx-2"></div>
                                    <div className="text-base text-gray-400 flex justify-center items-center">
                                        <div>4.1</div>
                                        <FaStar />
                                    </div>
                                </div>
                                <div className="text-base text-black font-medium line-clamp-3">mô tả slfgjsl;d nadjksgh lksdng lakdhfglnd fh.df l;sdng ldfhlg jlngd hladfg</div>
                                <div className="flex justify-between items-center">
                                    <div className="text-base text-gray-400">Jun, 20 2024</div>
                                    <div className="text-base text-sapphire hover:text-orange-500 cursor-pointer font-medium">Read more</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-none lg:w-[calc(33.33%-13.33px)] md:w-[calc(50%-10px)] w-full h-96 bg-black">
                            4
                        </div>
                        <div className="flex-none lg:w-[calc(33.33%-13.33px)] md:w-[calc(50%-10px)] w-full h-96 bg-black">
                            5
                        </div>
                        <div className="flex-none lg:w-[calc(33.33%-13.33px)] md:w-[calc(50%-10px)] w-full h-96 bg-white">
                            6
                        </div>
                        <div className="flex-none lg:w-[calc(33.33%-13.33px)] md:w-[calc(50%-10px)] w-full h-96 bg-black">
                            1
                        </div>
                        <div className="flex-none lg:w-[calc(33.33%-13.33px)] md:w-[calc(50%-10px)] w-full h-96 bg-black">
                            2
                        </div>
                        <div className="flex-none lg:w-[calc(33.33%-13.33px)] md:w-[calc(50%-10px)] w-full h-96 bg-black">
                            3
                        </div>
                        <div className="flex-none lg:w-[calc(33.33%-13.33px)] md:w-[calc(50%-10px)] w-full h-96 bg-black">
                            4
                        </div>
                        <div className="flex-none lg:w-[calc(33.33%-13.33px)] md:w-[calc(50%-10px)] w-full h-96 bg-black">
                            5
                        </div>
                        <div className="flex-none lg:w-[calc(33.33%-13.33px)] md:w-[calc(50%-10px)] w-full h-96 bg-black">
                            6
                        </div>
                    </div>
                    <div className="shadow-left-only cursor-pointer right-scroll absolute top-[calc(50%-32px)] md:-right-6 -right-5 bg-white rounded-full z-10">
                        <svg
                            version="1.1"
                            id="Layer_1"
                            width="50px"
                            height="50px"
                            viewBox="0 0 100 100"
                            enableBackground="new 0 0 100 100"
                            xmlSpace="preserve"
                            style={{
                                fill: '#2c4fa3',
                                stroke: '#2c4fa3',
                                transform: 'rotate(180deg)', // Rotate by 180 degrees
                            }}
                        >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <g>
                                    <path
                                        d="M44.942,50.412l14.037-15.487c0.742-0.818,0.68-2.083-0.139-2.824c-0.817-0.742-2.083-0.679-2.824,0.139L40.784,49.044 c-0.409,0.451-0.565,1.038-0.493,1.598c-0.016,0.564,0.196,1.131,0.647,1.539L57.74,67.412c0.383,0.348,0.864,0.519,1.344,0.519 c0.545,0,1.087-0.222,1.482-0.657c0.741-0.818,0.68-2.083-0.139-2.824L44.942,50.412z"
                                    ></path>
                                    <path
                                        d="M84.133,49.756c0-18.448-15.01-33.457-33.458-33.457S17.218,31.308,17.218,49.756c0,18.449,15.009,33.458,33.457,33.458 S84.133,68.205,84.133,49.756z M50.675,79.214c-16.243,0-29.457-13.215-29.457-29.458c0-16.242,13.214-29.457,29.457-29.457 c16.243,0,29.458,13.215,29.458,29.457C80.133,65.999,66.918,79.214,50.675,79.214z"
                                    ></path>
                                </g>
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
