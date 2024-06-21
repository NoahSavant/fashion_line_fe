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
                {/* <div className="carousel-item w-full h-full">
                    <div className="flex justify-between px-[40px] py-[30px] items-center w-full h-full">
                        <div className="flex items-center">
                            <div className="py-5 flex-col justify-start items-start gap-8 flex">
                                <div className="flex-col justify-start items-start gap-4 flex">
                                    <div className="text-sapphire lg:text-[48px] text-4xl font-semibold  leading-10">Title</div>
                                    <div className="text-boston_blue lg:text-[48px] text-4xl font-semibold  leading-10">Content</div>
                                    <div className="text-cinder text-base font-light  leading-normal">description</div>
                                </div>
                                <div className="get-an-instant-quote-btn px-6 py-3 bg-sapphire rounded-3xl justify-center items-center gap-2.5 flex">
                                    <div className="text-white text-base font-medium  capitalize leading-normal">button-title</div>
                                </div>
                            </div>
                        </div>

                        <div className="h-full lg:flex hidden items-center md:relative absolute bottom-0 right-0 justify-end">
                            <div className="flex-col justify-center items-end gap-8 flex h-full">
                                <div className="px-3.5 py-2.5 bg-catskill_white rounded-lg shadow justify-start items-center gap-2 flex">
                                    <div className="w-12 h-12 bg-white rounded-3xl flex-col justify-center items-center gap-2.5 flex">
                                        <div className="w-8 h-8 relative">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                                <path d="M16 3C13.4288 3 10.9154 3.76244 8.77759 5.1909C6.63975 6.61935 4.97351 8.64968 3.98957 11.0251C3.00563 13.4006 2.74819 16.0144 3.2498 18.5362C3.75141 21.0579 4.98953 23.3743 6.80762 25.1924C8.6257 27.0105 10.9421 28.2486 13.4638 28.7502C15.9856 29.2518 18.5995 28.9944 20.9749 28.0104C23.3503 27.0265 25.3807 25.3603 26.8091 23.2224C28.2376 21.0846 29 18.5712 29 16C28.9964 12.5533 27.6256 9.24882 25.1884 6.81163C22.7512 4.37445 19.4467 3.00364 16 3ZM11.5 12C11.7967 12 12.0867 12.088 12.3334 12.2528C12.58 12.4176 12.7723 12.6519 12.8858 12.926C12.9994 13.2001 13.0291 13.5017 12.9712 13.7926C12.9133 14.0836 12.7704 14.3509 12.5607 14.5607C12.3509 14.7704 12.0836 14.9133 11.7926 14.9712C11.5017 15.0291 11.2001 14.9994 10.926 14.8858C10.6519 14.7723 10.4176 14.58 10.2528 14.3334C10.088 14.0867 10 13.7967 10 13.5C10 13.1022 10.158 12.7206 10.4393 12.4393C10.7206 12.158 11.1022 12 11.5 12ZM21.865 19.5C20.5788 21.7238 18.4413 23 16 23C13.5588 23 11.4213 21.725 10.135 19.5C10.0627 19.3862 10.0141 19.2589 9.99218 19.1258C9.97029 18.9927 9.97555 18.8566 10.0076 18.7256C10.0397 18.5946 10.098 18.4715 10.1789 18.3636C10.2598 18.2557 10.3617 18.1652 10.4785 18.0978C10.5952 18.0303 10.7245 17.9871 10.8583 17.9708C10.9922 17.9546 11.128 17.9655 11.2575 18.0031C11.3871 18.0407 11.5077 18.1041 11.6121 18.1895C11.7164 18.2749 11.8025 18.3805 11.865 18.5C12.7988 20.1138 14.2663 21 16 21C17.7338 21 19.2013 20.1125 20.135 18.5C20.1975 18.3805 20.2836 18.2749 20.388 18.1895C20.4924 18.1041 20.6129 18.0407 20.7425 18.0031C20.872 17.9655 21.0078 17.9546 21.1417 17.9708C21.2756 17.9871 21.4048 18.0303 21.5215 18.0978C21.6383 18.1652 21.7402 18.2557 21.8211 18.3636C21.902 18.4715 21.9603 18.5946 21.9924 18.7256C22.0245 18.8566 22.0297 18.9927 22.0078 19.1258C21.9859 19.2589 21.9374 19.3862 21.865 19.5ZM20.5 15C20.2033 15 19.9133 14.912 19.6667 14.7472C19.42 14.5824 19.2277 14.3481 19.1142 14.074C19.0007 13.7999 18.971 13.4983 19.0288 13.2074C19.0867 12.9164 19.2296 12.6491 19.4393 12.4393C19.6491 12.2296 19.9164 12.0867 20.2074 12.0288C20.4983 11.9709 20.7999 12.0006 21.074 12.1142C21.3481 12.2277 21.5824 12.42 21.7472 12.6666C21.912 12.9133 22 13.2033 22 13.5C22 13.8978 21.842 14.2794 21.5607 14.5607C21.2794 14.842 20.8978 15 20.5 15Z" fill="#328BA9" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="flex-col justify-between items-start flex h-full">
                                        <div className="text-boston_blue text-stitle font-extrabold ">4.8</div>
                                        <div className="text-boston_blue text-sm font-normal  leading-tight">Happy ratings</div>
                                    </div>
                                </div>
                                <div className="px-4 py-2.5 bg-catskill_white rounded-lg shadow flex-col justify-start items-start gap-2 flex">
                                    <div className="justify-start items-center gap-4 flex">
                                        <div className="w-12 h-12 bg-white rounded-3xl flex-col justify-center items-center gap-2.5 flex">
                                            <div className="w-6 h-6 relative">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <g clip-path="url(#clip0_117_197)">
                                                        <path d="M0 19.0001C0.00158786 20.3257 0.528882 21.5966 1.46622 22.5339C2.40356 23.4712 3.67441 23.9985 5 24.0001H19C20.3256 23.9985 21.5964 23.4712 22.5338 22.5339C23.4711 21.5966 23.9984 20.3257 24 19.0001V10.0001H0V19.0001ZM17 14.5001C17.2967 14.5001 17.5867 14.5881 17.8334 14.7529C18.08 14.9177 18.2723 15.152 18.3858 15.4261C18.4993 15.7002 18.5291 16.0018 18.4712 16.2928C18.4133 16.5837 18.2704 16.851 18.0607 17.0608C17.8509 17.2706 17.5836 17.4134 17.2926 17.4713C17.0017 17.5292 16.7001 17.4995 16.426 17.3859C16.1519 17.2724 15.9176 17.0802 15.7528 16.8335C15.588 16.5868 15.5 16.2968 15.5 16.0001C15.5 15.6023 15.658 15.2208 15.9393 14.9395C16.2206 14.6582 16.6022 14.5001 17 14.5001ZM12 14.5001C12.2967 14.5001 12.5867 14.5881 12.8334 14.7529C13.08 14.9177 13.2723 15.152 13.3858 15.4261C13.4994 15.7002 13.5291 16.0018 13.4712 16.2928C13.4133 16.5837 13.2704 16.851 13.0607 17.0608C12.8509 17.2706 12.5836 17.4134 12.2926 17.4713C12.0017 17.5292 11.7001 17.4995 11.426 17.3859C11.1519 17.2724 10.9176 17.0802 10.7528 16.8335C10.588 16.5868 10.5 16.2968 10.5 16.0001C10.5 15.6023 10.658 15.2208 10.9393 14.9395C11.2206 14.6582 11.6022 14.5001 12 14.5001ZM7 14.5001C7.29667 14.5001 7.58668 14.5881 7.83336 14.7529C8.08003 14.9177 8.27229 15.152 8.38582 15.4261C8.49935 15.7002 8.52906 16.0018 8.47118 16.2928C8.4133 16.5837 8.27044 16.851 8.06066 17.0608C7.85088 17.2706 7.58361 17.4134 7.29264 17.4713C7.00166 17.5292 6.70006 17.4995 6.42597 17.3859C6.15189 17.2724 5.91762 17.0802 5.7528 16.8335C5.58797 16.5868 5.5 16.2968 5.5 16.0001C5.5 15.6023 5.65804 15.2208 5.93934 14.9395C6.22064 14.6582 6.60218 14.5001 7 14.5001Z" fill="#328BA9" />
                                                        <path d="M19 2H18V1C18 0.734784 17.8946 0.48043 17.7071 0.292893C17.5196 0.105357 17.2652 0 17 0C16.7348 0 16.4804 0.105357 16.2929 0.292893C16.1054 0.48043 16 0.734784 16 1V2H8V1C8 0.734784 7.89464 0.48043 7.70711 0.292893C7.51957 0.105357 7.26522 0 7 0C6.73478 0 6.48043 0.105357 6.29289 0.292893C6.10536 0.48043 6 0.734784 6 1V2H5C3.67441 2.00159 2.40356 2.52888 1.46622 3.46622C0.528882 4.40356 0.00158786 5.67441 0 7L0 8H24V7C23.9984 5.67441 23.4711 4.40356 22.5338 3.46622C21.5964 2.52888 20.3256 2.00159 19 2Z" fill="#328BA9" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_117_197">
                                                            <rect width="24" height="24" fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="flex-col justify-between items-start flex h-full">
                                            <div className="text-boston_blue text-stitle font-extrabold ">1k</div>
                                            <div className="text-boston_blue text-sm font-normal  leading-tight whitespace-nowrap">Satisfied Clients</div>
                                        </div>
                                    </div>
                                    <div className="justify-start items-start flex flex-wrap">
                                        <img className="w-9 h-9 rounded-full border border-white" src="<?php echo $icon['icon']['url'] ?? null ?>" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div> */}
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
            {/* <div className="custom-padding flex flex-col gap-10 items-center">
                <div className="flex flex-col gap-2 items-center">
                    <div className="text-sapphire lg:text-5xl md:text-4xl text-3xl font-semibold  leading-[1] text-center">Various genres for you</div>
                </div>
                <div className=" flex flex-wrap lg:gap-12 md:gap-6 gap-5 relative justify-center custom-box">
                    <div className="flex flex-col w-full justify-center items-center group cursor-pointer animation-iv fade-in lg:max-w-72 lg:w-[calc(25%-36px)] md:w-[calc(33.33%-16px)]">
                        <div className="h-[300px] w-full overflow-hidden rounded-b-3xl relative">
                            <img className="w-full h-full object-cover group-hover:scale-125 transform transition-transform duration-500 ease-in-out shadow-full" src="https://res.cloudinary.com/dvcdmxgyk/image/upload/v1718419325/files/parker-burchfield-tvG4WvjgsEY-unsplash_h48a95.jpg" />
                            <div className="absolute lg:bottom-[-50%] bottom-0 group-hover:bottom-0 transform transition-all duration-500 ease-in-out left-0 w-full h-1/2 overflow-auto bg-black text-white bg-opacity-50 p-4">


                            </div>
                        </div>
                        <div className="w-full text-base font-medium text-center bg-white group-hover:bg-sapphire text-sapphire group-hover:text-white px-4 py-2 border-2 border-sapphire rounded-t-3xl transform transition-all duration-500 ease-in-out shadow-full">
                            collection 1
                        </div>
                    </div>
                    <div className="flex flex-col w-full justify-center items-center group cursor-pointer animation-iv fade-in lg:max-w-72 lg:w-[calc(25%-36px)] md:w-[calc(33.33%-16px)]">
                        <div className="h-[300px] w-full overflow-hidden rounded-b-3xl relative">
                            <img className="w-full h-full object-cover group-hover:scale-125 transform transition-transform duration-500 ease-in-out shadow-full" src="https://res.cloudinary.com/dvcdmxgyk/image/upload/v1718419325/files/waldemar-NPPNHZK1U0s-unsplash_okve7n.jpg" />
                            <div className="absolute lg:bottom-[-50%] bottom-0 group-hover:bottom-0 transform transition-all duration-500 ease-in-out left-0 w-full h-1/2 overflow-auto bg-black text-white bg-opacity-50 p-4">


                            </div>
                        </div>
                        <div className="w-full text-base font-medium text-center bg-white group-hover:bg-sapphire text-sapphire group-hover:text-white px-4 py-2 border-2 border-sapphire rounded-t-3xl transform transition-all duration-500 ease-in-out shadow-full">
                            collection 1
                        </div>
                    </div>
                    <div className="flex flex-col w-full justify-center items-center group cursor-pointer animation-iv fade-in lg:max-w-72 lg:w-[calc(25%-36px)] md:w-[calc(33.33%-16px)]">
                        <div className="h-[300px] w-full overflow-hidden rounded-b-3xl relative">
                            <img className="w-full h-full object-cover group-hover:scale-125 transform transition-transform duration-500 ease-in-out shadow-full" src="https://res.cloudinary.com/dvcdmxgyk/image/upload/v1718419325/files/luis-felipe-lins-J2-wAQDckus-unsplash_y9m8lq.jpg" />
                            <div className="absolute lg:bottom-[-50%] bottom-0 group-hover:bottom-0 transform transition-all duration-500 ease-in-out left-0 w-full h-1/2 overflow-auto bg-black text-white bg-opacity-50 p-4">


                            </div>
                        </div>
                        <div className="w-full text-base font-medium text-center bg-white group-hover:bg-sapphire text-sapphire group-hover:text-white px-4 py-2 border-2 border-sapphire rounded-t-3xl transform transition-all duration-500 ease-in-out shadow-full">
                            collection 1
                        </div>
                    </div>
                    <div className="flex flex-col w-full justify-center items-center group cursor-pointer animation-iv fade-in lg:max-w-72 lg:w-[calc(25%-36px)] md:w-[calc(33.33%-16px)]">
                        <div className="h-[300px] w-full overflow-hidden rounded-b-3xl relative">
                            <img className="w-full h-full object-cover group-hover:scale-125 transform transition-transform duration-500 ease-in-out shadow-full" src="https://res.cloudinary.com/dvcdmxgyk/image/upload/v1718419324/files/benjamin-r-t34i3FBsF90-unsplash_otlc3l.jpg" />
                            <div className="absolute lg:bottom-[-50%] bottom-0 group-hover:bottom-0 transform transition-all duration-500 ease-in-out left-0 w-full h-1/2 overflow-auto bg-black text-white bg-opacity-50 p-4">

                            </div>
                        </div>
                        <div className="w-full text-base font-medium text-center bg-white group-hover:bg-sapphire text-sapphire group-hover:text-white px-4 py-2 border-2 border-sapphire rounded-t-3xl transform transition-all duration-500 ease-in-out shadow-full">
                            collection 1
                        </div>
                    </div>
                    <div className="flex flex-col w-full justify-center items-center group cursor-pointer animation-iv fade-in lg:max-w-72 lg:w-[calc(25%-36px)] md:w-[calc(33.33%-16px)]">
                        <div className="h-[300px] w-full overflow-hidden rounded-b-3xl relative">
                            <img className="w-full h-full object-cover group-hover:scale-125 transform transition-transform duration-500 ease-in-out shadow-full" src="https://res.cloudinary.com/dvcdmxgyk/image/upload/v1718419325/files/waldemar-NPPNHZK1U0s-unsplash_okve7n.jpg" />
                            <div className="absolute lg:bottom-[-50%] bottom-0 group-hover:bottom-0 transform transition-all duration-500 ease-in-out left-0 w-full h-1/2 overflow-auto bg-black text-white bg-opacity-50 p-4">


                            </div>
                        </div>
                        <div className="w-full text-base font-medium text-center bg-white group-hover:bg-sapphire text-sapphire group-hover:text-white px-4 py-2 border-2 border-sapphire rounded-t-3xl transform transition-all duration-500 ease-in-out shadow-full">
                            collection 1
                        </div>
                    </div>
                    <div className="flex flex-col w-full justify-center items-center group cursor-pointer animation-iv fade-in lg:max-w-72 lg:w-[calc(25%-36px)] md:w-[calc(33.33%-16px)]">
                        <div className="h-[300px] w-full overflow-hidden rounded-b-3xl relative">
                            <img className="w-full h-full object-cover group-hover:scale-125 transform transition-transform duration-500 ease-in-out shadow-full" src="https://res.cloudinary.com/dvcdmxgyk/image/upload/v1718419325/files/luis-felipe-lins-J2-wAQDckus-unsplash_y9m8lq.jpg" />
                            <div className="absolute lg:bottom-[-50%] bottom-0 group-hover:bottom-0 transform transition-all duration-500 ease-in-out left-0 w-full h-1/2 overflow-auto bg-black text-white bg-opacity-50 p-4">


                            </div>
                        </div>
                        <div className="w-full text-base font-medium text-center bg-white group-hover:bg-sapphire text-sapphire group-hover:text-white px-4 py-2 border-2 border-sapphire rounded-t-3xl transform transition-all duration-500 ease-in-out shadow-full">
                            collection 1
                        </div>
                    </div>
                    <div className="flex flex-col w-full justify-center items-center group cursor-pointer animation-iv fade-in lg:max-w-72 lg:w-[calc(25%-36px)] md:w-[calc(33.33%-16px)]">
                        <div className="h-[300px] w-full overflow-hidden rounded-b-3xl relative">
                            <img className="w-full h-full object-cover group-hover:scale-125 transform transition-transform duration-500 ease-in-out shadow-full" src="https://res.cloudinary.com/dvcdmxgyk/image/upload/v1718419324/files/benjamin-r-t34i3FBsF90-unsplash_otlc3l.jpg" />
                            <div className="absolute lg:bottom-[-50%] bottom-0 group-hover:bottom-0 transform transition-all duration-500 ease-in-out left-0 w-full h-1/2 overflow-auto bg-black text-white bg-opacity-50 p-4">

                            </div>
                        </div>
                        <div className="w-full text-base font-medium text-center bg-white group-hover:bg-sapphire text-sapphire group-hover:text-white px-4 py-2 border-2 border-sapphire rounded-t-3xl transform transition-all duration-500 ease-in-out shadow-full">
                            collection 1
                        </div>
                    </div>
                </div>
                <PButton
                    href="/"
                    title="View all categories"
                />
            </div> */}
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
            <Collection collection={collection}/>

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
