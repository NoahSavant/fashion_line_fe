import React, { useState, useEffect, useRef } from 'react';
import { SingleProduct } from './components';
import { useApi } from '@/hooks';
import { productEndpoints } from '@/apis';
import { Loading } from '@/components';

const LeftScrollIcon = () => {
    return (
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
    );
}

const RightScrollIcon = () => {
    return (
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
    );
}

const Carousel = ({ data, dataMap, loading, title }) => {
    const listScrollRef = useRef(null);

    const handleRightScroll = () => {
        if (listScrollRef.current) {
            const { scrollLeft, clientWidth, scrollWidth } = listScrollRef.current;
            const scrollAmount = clientWidth + 20;
            let targetScrollLeft = scrollLeft + scrollAmount;

            if (targetScrollLeft > scrollWidth - clientWidth) {
                targetScrollLeft = 0;
            }

            listScrollRef.current.scrollTo({
                left: targetScrollLeft,
                behavior: 'smooth',
            });
        }
    };

    const handleLeftScroll = () => {
        if (listScrollRef.current) {
            const { scrollLeft, clientWidth, scrollWidth } = listScrollRef.current;
            const scrollAmount = clientWidth + 20;
            let targetScrollLeft = scrollLeft - scrollAmount;

            if (targetScrollLeft < 0) {
                targetScrollLeft = scrollWidth - clientWidth;
            }

            listScrollRef.current.scrollTo({
                left: targetScrollLeft,
                behavior: 'smooth',
            });
        }
    };

    // Auto scroll interval
    useEffect(() => {
        const autoScrollInterval = setInterval(() => {
            handleRightScroll();
        }, 5000);

        return () => clearInterval(autoScrollInterval);
    }, []);

    return (
        <div className='flex flex-col gap-10'>
            <div className="flex flex-col gap-2 items-center">
                <div className="text-sapphire lg:text-5xl md:text-4xl text-3xl font-semibold  leading-[1] text-center">{title}</div>
            </div>
            <div className="md:px-7 px-5 md:py-7 py-5 flex">
                {loading && <Loading size={40} />}
                {data?.length > 0 ? (
                    <div className="flex justify-center items-center gap-4 container-scroll relative md:px-0 px-1 w-full">
                        <div className="shadow-right-only absolute top-[calc(50%-32px)] md:-left-6 -left-5 cursor-pointer left-scroll bg-white rounded-full z-10" onClick={handleLeftScroll}>
                            <LeftScrollIcon/>
                        </div>
                        <div className="flex gap-5 w-full overflow-auto hidden-scroll-bar list-scroll" ref={listScrollRef}>
                            {dataMap}
                        </div>
                        <div className="shadow-left-only cursor-pointer right-scroll absolute top-[calc(50%-32px)] md:-right-6 -right-5 bg-white rounded-full z-10" onClick={handleRightScroll}>
                            <RightScrollIcon/>
                        </div>
                    </div>
                ) : (
                    <div className='w-full h-[calc(150px)] flex justify-center items-center'>
                        <div className="text-center text-xl text-sapphire font-semibold line-clamp-2">Hiện chưa có</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Carousel;
