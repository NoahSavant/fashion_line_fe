import { useEffect } from "react";
import { redirect, useSearchParams, useNavigate } from "react-router-dom";
import { Panel, Carousel } from "rsuite";

const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

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

    return (
        <div>
            <Carousel className="custom-carousel" autoplayInterval={5000} shape="bar">
                <div className="carousel-item w-full h-full">
                    <div className="flex justify-between px-[40px] py-[30px] items-center w-full h-full">
                        <div className="flex items-center">
                            <div className="py-5 flex-col justify-start items-start gap-8 flex">
                                <div className="flex-col justify-start items-start gap-4 flex">
                                    <div className="text-sapphire lg:text-[48px] text-4xl font-semibold font-outfit leading-10">Title</div>
                                    <div className="text-boston_blue lg:text-[48px] text-4xl font-semibold font-outfit leading-10">Content</div>
                                    <div className="text-cinder text-base font-light font-outfit leading-normal">description</div>
                                </div>
                                <div className="get-an-instant-quote-btn px-6 py-3 bg-sapphire rounded-3xl justify-center items-center gap-2.5 flex">
                                    <div className="text-white text-base font-medium font-outfit capitalize leading-normal">button-title</div>
                                </div>
                            </div>
                        </div>

                        <img className="object-cover rounded-xl w-1/2" src="https://res.cloudinary.com/dvcdmxgyk/image/upload/v1717734844/files/xl72fv0fhyh6xz1bbedr.jpg" />

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
                                        <div className="text-boston_blue text-stitle font-extrabold font-outfit">4.8</div>
                                        <div className="text-boston_blue text-sm font-normal font-outfit leading-tight">Happy ratings</div>
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
                                            <div className="text-boston_blue text-stitle font-extrabold font-outfit">1k</div>
                                            <div className="text-boston_blue text-sm font-normal font-outfit leading-tight whitespace-nowrap">Satisfied Clients</div>
                                        </div>
                                    </div>
                                    <div className="justify-start items-start flex flex-wrap">
                                        <img className="w-9 h-9 rounded-full border border-white" src="<?php echo $icon['icon']['url'] ?? null ?>" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <img className="carousel-item" src="https://res.cloudinary.com/dvcdmxgyk/image/upload/v1717733325/files/lg8lb7qnqfwywxbjvjft.webp"/>
                <img className="carousel-item" src="https://res.cloudinary.com/dvcdmxgyk/image/upload/v1717670382/files/yvxxta9ab9emazandibu.webp"/>
                <img className="carousel-item" src="https://res.cloudinary.com/dvcdmxgyk/image/upload/v1717670440/files/rdcl3iy70vhzeryeh4dk.webp"/>
                <img className="carousel-item" src="https://res.cloudinary.com/dvcdmxgyk/image/upload/v1717733536/files/mkr413cgkxs34pymizxf.webp"/>
                <img className="carousel-item" src="https://res.cloudinary.com/dvcdmxgyk/image/upload/v1717670507/files/oqctc4z6v4fcple9k0pz.webp"/>
            </Carousel>
        </div>
    )

}

export default Home
