import React, { useState } from 'react';
import ProductModal from './ProductModal';
import { useNavigate } from 'react-router-dom';

const SingleProduct = ({ product }) => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const tagClick = (event) => {
        event.stopPropagation();
    };

    return (
        <div className="w-full shadow-xl rounded-xl">
            <div className="flex flex-col cursor-pointer animation-iv fade-in overflow-hidden rounded-xl bg-white">
                <div className="flex-grow overflow-hidden relative group w-full pb-[125%] p-2">
                    <div className="absolute inset-0">
                        <img
                            src={product.first_image_url}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-500 transform group-hover:-translate-x-full"
                            
                        />
                        <img
                            src={product.second_image_url}
                            alt={product.name}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 transform translate-x-full group-hover:translate-x-0"
                        />
                        <div className="z-[5] absolute lg:bottom-[-100%] bottom-0 group-hover:bottom-0 transform transition-all duration-500 ease-in-out left-0 p-4 flex justify-center items-center w-full">
                            <div className="flex overflow-hidden rounded-md shadow-lg bg-white">
                                <div className="p-2 p-btn">
                                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M9.61132 13C9.24662 13 8.91085 13.1985 8.7351 13.5181C8.36855 14.1845 8.85071 15 9.61131 15H18.92C19.4723 15 19.92 15.4477 19.92 16C19.92 16.5523 19.4723 17 18.92 17H17.93H7.92999H7.92004C6.40004 17 5.44004 15.37 6.17004 14.03L7.02318 12.488C7.33509 11.9243 7.35632 11.2448 7.08022 10.6627L4.25211 4.70011C4.04931 4.27254 3.6184 4 3.14518 4H2.92004C2.36776 4 1.92004 3.55228 1.92004 3C1.92004 2.44772 2.36776 2 2.92004 2H3.92398C4.69708 2 5.40095 2.44557 5.7317 3.14435L5.90228 3.50471C5.93443 3.5016 5.96703 3.5 6 3.5H21C21.5523 3.5 22 3.94772 22 4.5C22 4.77321 21.8904 5.02082 21.7129 5.20131C21.7448 5.41025 21.7106 5.63097 21.6008 5.83041L18.22 11.97C17.88 12.59 17.22 13 16.47 13H9.61132ZM7.92999 17C9.03456 17 9.92999 17.8954 9.92999 19C9.92999 20.1046 9.03456 21 7.92999 21C6.82542 21 5.92999 20.1046 5.92999 19C5.92999 17.8954 6.82542 17 7.92999 17ZM17.93 17C16.8254 17 15.93 17.8954 15.93 19C15.93 20.1046 16.8254 21 17.93 21C19.0346 21 19.93 20.1046 19.93 19C19.93 17.8954 19.0346 17 17.93 17ZM19.5108 5.5L17.0408 9.96767C16.6886 10.6046 16.0183 11 15.2905 11H10.7161C9.94301 11 9.23914 10.5544 8.90839 9.85565L6.84671 5.5H19.5108Z" fill="#000000"></path> <path d="M7.92999 20C8.48228 20 8.92999 19.5523 8.92999 19C8.92999 18.4477 8.48228 18 7.92999 18C7.37771 18 6.92999 18.4477 6.92999 19C6.92999 19.5523 7.37771 20 7.92999 20Z" fill="#000000"></path> <path d="M18.93 19C18.93 19.5523 18.4823 20 17.93 20C17.3777 20 16.93 19.5523 16.93 19C16.93 18.4477 17.3777 18 17.93 18C18.4823 18 18.93 18.4477 18.93 19Z" fill="#000000"></path> <path d="M12.5 10.17H13.5V8.67H15V7.67H13.5V6.17H12.5V7.67H11V8.67H12.5V10.17Z" fill="#000000"></path> </g></svg>
                                </div>
                                <div className="p-2 p-btn" onClick={() => setShowModal(true)}>
                                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                                </div>
                            </div>
                        </div>
                        <div className="absolute top-0 left-0 p-4 flex flex-col w-full h-full z-0" onClick={() => navigate(`/product-detail?id=${product.id}`)}>
                            <div className="flex justify-between items-center">
                                <div className={`bg-white p-1 rounded-md ${product.mark ? 'bg-yellow-300' : 'p-btn hover:bg-yellow-300 transform transition-all duration-500 ease-in-out'}`}>
                                    <svg fill="#000000" width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g data-name="Layer 2"> <g data-name="bookmark"> <rect width="24" height="24" opacity="0"></rect> <path d="M6.09 21.06a1 1 0 0 1-1-1L4.94 5.4a2.26 2.26 0 0 1 2.18-2.35L16.71 3a2.27 2.27 0 0 1 2.23 2.31l.14 14.66a1 1 0 0 1-.49.87 1 1 0 0 1-1 0l-5.7-3.16-5.29 3.23a1.2 1.2 0 0 1-.51.15zm5.76-5.55a1.11 1.11 0 0 1 .5.12l4.71 2.61-.12-12.95c0-.2-.13-.34-.21-.33l-9.6.09c-.08 0-.19.13-.19.33l.12 12.9 4.28-2.63a1.06 1.06 0 0 1 .51-.14z"></path> </g> </g> </g></svg>
                                </div>
                                {
                                    product.average_rate && <div className="p-1 rounded-md flex gap-2 items-center bg-black bg-opacity-30">
                                        <div className="text-white text-base font-semibold pl-1">{parseFloat(product.rate).toFixed(1)}</div>
                                        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" fill="#e0d806"></path> </g></svg>
                                    </div>
                                }

                            </div>
                            <div className="flex flex-col h-full justify-center gap-2 -mt-[38px]">
                                {product.tags.map((tag, index) => (
                                    <a href={`/shop?tags[]=${tag.id}`} onClick={tagClick} key={index} className="px-2 py-1 min-w-[50px] rounded-md w-fit p-btn" style={{ backgroundColor: tag.color }}>
                                        <div className="text-base text-white font-semibold text-center">{tag.name}</div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-2 flex flex-col">
                    <div className="text-xl text-sapphire font-semibold line-clamp-2">{product.name}</div>
                        <div className="text-lg text-boston_blue font-bold line-clamp-1">
                            <span className="line-through text-gray-400 font-normal text-xs">
                                {product.original_price > 0 ? product.original_price.toLocaleString('de-DE') + 'đ̲ ' : ''}
                            </span>
                                {product.price.toLocaleString('de-DE')}đ̲
                        </div>
                    <div className="text-base text-black font-medium line-clamp-3">{product.short_description}</div>
                </div>
            </div>
            <ProductModal show={showModal} onClose={() => setShowModal(false)} product={product} />
        </div>

    );
};

export default SingleProduct;
