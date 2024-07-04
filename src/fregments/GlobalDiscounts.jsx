import React, { useState, useEffect } from 'react';

const GlobalDiscounts = () => {

    return (
        <div className="marquee-container bg-sapphire font-medium h-[40px] flex justify-center items-center">
            <div className="marquee text-white flex gap-40 justify-center items-center">
                <div className='flex gap-2 justify-center items-center'>
                    <svg
                        fill="#000000"
                        width="32px"
                        height="32px"
                        viewBox="0 0 24 24"
                        id="shipping"
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon flat-line"
                        transform="matrix(-1, 0, 0, 1, 0, 0)"
                    >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                id="secondary"
                                fill="#2ca9bc"
                                strokeWidth="2"
                                d="M16,6v9a2,2,0,0,0-2,2H10a2,2,0,0,0-4,0H4a1,1,0,0,1-1-1V6A1,1,0,0,1,4,5H15A1,1,0,0,1,16,6Z"
                            ></path>
                            <path
                                id="primary"
                                fill="none"
                                stroke="#ffffff"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M16,15V6a1,1,0,0,0-1-1H4A1,1,0,0,0,3,6V16a1,1,0,0,0,1,1H6"
                            ></path>
                            <path
                                id="primary-2"
                                fill="none"
                                stroke="#ffffff"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M18,17h2a1,1,0,0,0,1-1V12L19.28,8.55a1,1,0,0,0-.9-.55H16"
                            ></path>
                            <path
                                id="primary-3"
                                fill="none"
                                stroke="#ffffff"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M14,17H10M8,15a2,2,0,1,0,2,2A2,2,0,0,0,8,15Zm10,2a2,2,0,1,1-2-2A2,2,0,0,1,18,17Z"
                            ></path>
                        </g>
                    </svg>
                    <div>
                        Free shipping for orders over 500k.
                    </div>
                </div>

                <div className='flex gap-2 justify-center items-center'>
                    <svg
                        width="32px"
                        height="32px"
                        viewBox="0 0 24 24"
                        id="discount"
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon multi-color"
                        fill="#000000"
                    >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <title>discount</title>
                            <path
                                id="tertiary-fill"
                                fill="#b7b7b7"
                                strokeWidth="2"
                                d="M20,10c-.68-.61-1.63-.89-2.31-1.48-.84-.76-1.43-2.23-2.44-2.64s-2.16.37-3.24.37-2.27-.76-3.25-.37S7.16,7.75,6.32,8.51C5.63,9.1,4.68,9.38,4,10a9.68,9.68,0,0,0,.12-1.13,4.23,4.23,0,0,1,.31-1.63A2.94,2.94,0,0,1,5.6,6.38,6.53,6.53,0,0,0,7,5.49,8.26,8.26,0,0,0,8.08,4.17,3.3,3.3,0,0,1,9.11,3a.75.75,0,0,1,.28,0,4.32,4.32,0,0,1,1,.21A6.35,6.35,0,0,0,12,3.48a6.27,6.27,0,0,0,1.56-.27A2.75,2.75,0,0,1,14.91,3a3.51,3.51,0,0,1,1,1.13A7.65,7.65,0,0,0,17,5.49a7.14,7.14,0,0,0,1.38.89,3.14,3.14,0,0,1,1.18.86,4.68,4.68,0,0,1,.3,1.63C19.91,9.21,19.94,9.6,20,10Z"
                            ></path>
                            <path
                                id="secondary-fill"
                                fill="#2ca9bc"
                                strokeWidth="2"
                                d="M11,9.5A1.5,1.5,0,1,1,9.5,8,1.5,1.5,0,0,1,11,9.5ZM14.5,13A1.5,1.5,0,1,0,16,14.5,1.5,1.5,0,0,0,14.5,13Z"
                            ></path>
                            <path
                                id="primary-stroke"
                                fill="none"
                                stroke="#ffffff"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9,15l6-6m5.22.33c-.3-.91-.1-2.08-.65-2.83S17.84,5.56,17.08,5,15.8,3.39,14.89,3.1,13,3.36,12,3.36s-2-.55-2.89-.26S7.68,4.46,6.92,5,5,5.73,4.43,6.5s-.35,1.92-.65,2.83S2.64,11,2.64,12s.86,1.79,1.14,2.67.1,2.08.65,2.83,1.73.94,2.49,1.49S8.2,20.61,9.11,20.9,11,20.64,12,20.64s2,.55,2.89.26,1.43-1.36,2.19-1.91,1.94-.72,2.49-1.49.35-1.92.65-2.83S21.36,13,21.36,12,20.5,10.21,20.22,9.33Z"
                            ></path>
                        </g>
                    </svg>
                    <div>
                        Discount 10% for orders from 300K.
                    </div>
                </div>

                <div className='flex gap-2 justify-center items-center'>
                    <svg
                        width="30px"
                        height="30px"
                        viewBox="0 0 24 24"
                        id="gift"
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon multi-color"
                        fill="#000000"
                    >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <title>gift</title>
                            <path
                                id="tertiary-fill"
                                fill="#b7b7b7"
                                strokeWidth="2"
                                d="M4,15H20a0,0,0,0,1,0,0v3a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V15A0,0,0,0,1,4,15Z"
                            ></path>
                            <rect
                                id="secondary-fill"
                                x="3"
                                y="6"
                                width="18"
                                height="4"
                                rx="1"
                                fill="#2ca9bc"
                                strokeWidth="2"
                            ></rect>
                            <path
                                id="primary-stroke"
                                fill="none"
                                stroke="#ffffff"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M20,10H4A1,1,0,0,1,3,9V7A1,1,0,0,1,4,6H20a1,1,0,0,1,1,1V9A1,1,0,0,1,20,10Zm0,8V10H4v8a1,1,0,0,0,1,1H19A1,1,0,0,0,20,18ZM12,6A5.36,5.36,0,0,0,8,3m8,0a5.36,5.36,0,0,0-4,3m0,13V6"
                            ></path>
                        </g>
                    </svg>
                    <div>
                        Gift with purchase of 2 specified items
                    </div>
                </div>

                <div className='flex gap-2 justify-center items-center'>
                    <svg
                        width="32px"
                        height="32px"
                        viewBox="0 0 24 24"
                        id="discount"
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon multi-color"
                        fill="#000000"
                    >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <title>discount</title>
                            <path
                                id="tertiary-fill"
                                fill="#b7b7b7"
                                strokeWidth="2"
                                d="M20,10c-.68-.61-1.63-.89-2.31-1.48-.84-.76-1.43-2.23-2.44-2.64s-2.16.37-3.24.37-2.27-.76-3.25-.37S7.16,7.75,6.32,8.51C5.63,9.1,4.68,9.38,4,10a9.68,9.68,0,0,0,.12-1.13,4.23,4.23,0,0,1,.31-1.63A2.94,2.94,0,0,1,5.6,6.38,6.53,6.53,0,0,0,7,5.49,8.26,8.26,0,0,0,8.08,4.17,3.3,3.3,0,0,1,9.11,3a.75.75,0,0,1,.28,0,4.32,4.32,0,0,1,1,.21A6.35,6.35,0,0,0,12,3.48a6.27,6.27,0,0,0,1.56-.27A2.75,2.75,0,0,1,14.91,3a3.51,3.51,0,0,1,1,1.13A7.65,7.65,0,0,0,17,5.49a7.14,7.14,0,0,0,1.38.89,3.14,3.14,0,0,1,1.18.86,4.68,4.68,0,0,1,.3,1.63C19.91,9.21,19.94,9.6,20,10Z"
                            ></path>
                            <path
                                id="secondary-fill"
                                fill="#2ca9bc"
                                strokeWidth="2"
                                d="M11,9.5A1.5,1.5,0,1,1,9.5,8,1.5,1.5,0,0,1,11,9.5ZM14.5,13A1.5,1.5,0,1,0,16,14.5,1.5,1.5,0,0,0,14.5,13Z"
                            ></path>
                            <path
                                id="primary-stroke"
                                fill="none"
                                stroke="#ffffff"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9,15l6-6m5.22.33c-.3-.91-.1-2.08-.65-2.83S17.84,5.56,17.08,5,15.8,3.39,14.89,3.1,13,3.36,12,3.36s-2-.55-2.89-.26S7.68,4.46,6.92,5,5,5.73,4.43,6.5s-.35,1.92-.65,2.83S2.64,11,2.64,12s.86,1.79,1.14,2.67.1,2.08.65,2.83,1.73.94,2.49,1.49S8.2,20.61,9.11,20.9,11,20.64,12,20.64s2,.55,2.89.26,1.43-1.36,2.19-1.91,1.94-.72,2.49-1.49.35-1.92.65-2.83S21.36,13,21.36,12,20.5,10.21,20.22,9.33Z"
                            ></path>
                        </g>
                    </svg>
                    <div>
                        Voucher 40k for orders from 599k
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GlobalDiscounts
