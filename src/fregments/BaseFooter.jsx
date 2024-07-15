import { Panel } from "rsuite";
import { name_web, icon } from '@/assets/images'

const BaseFooter = () => {
    return (
        <div className="lg:px-[100px] md:px-[60px] px-[20px] flex flex-col gap-8 bg-sapphire py-[30px]">
            <div className="flex lg:flex-row flex-col gap-[40px] justify-between">
                <div className="flex-col justify-start items-start gap-8 flex">
                    <div className="flex-col justify-center items-start gap-2 flex">
                        <div className="text-pale_cornflower_blue text-base font-semibold font-['Outfit', Arial, sans-serif] leading-loose uppercase">Contact us </div>
                        <div className="flex flex-col gap-2 text-white text-sm font-normal font-['Outfit', Arial, sans-serif] leading-tight">
                            <a href="tel:0123456789" className="flex gap-3">
                                <div className="w-4 h-4 relative flex justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                        <g clipPath="url(#clip0_429_1976)">
                                            <path d="M15.3335 7.83304C15.1567 7.83304 14.9872 7.7628 14.8621 7.63778C14.7371 7.51276 14.6669 7.34319 14.6669 7.16638C14.6655 5.75232 14.1031 4.39659 13.1032 3.3967C12.1033 2.39681 10.7476 1.83445 9.33353 1.83304C9.15672 1.83304 8.98715 1.7628 8.86213 1.63778C8.7371 1.51276 8.66686 1.34319 8.66686 1.16637C8.66686 0.989564 8.7371 0.819995 8.86213 0.69497C8.98715 0.569946 9.15672 0.499708 9.33353 0.499708C11.101 0.501649 12.7956 1.20465 14.0454 2.45447C15.2953 3.7043 15.9983 5.39886 16.0002 7.16638C16.0002 7.34319 15.93 7.51276 15.8049 7.63778C15.6799 7.7628 15.5103 7.83304 15.3335 7.83304ZM13.3335 7.16638C13.3335 6.10551 12.9121 5.08809 12.162 4.33795C11.4118 3.5878 10.3944 3.16637 9.33353 3.16637C9.15672 3.16637 8.98715 3.23661 8.86213 3.36164C8.7371 3.48666 8.66686 3.65623 8.66686 3.83304C8.66686 4.00985 8.7371 4.17942 8.86213 4.30445C8.98715 4.42947 9.15672 4.49971 9.33353 4.49971C10.0408 4.49971 10.7191 4.78066 11.2191 5.28076C11.7192 5.78085 12.0002 6.45913 12.0002 7.16638C12.0002 7.34319 12.0704 7.51276 12.1955 7.63778C12.3205 7.7628 12.4901 7.83304 12.6669 7.83304C12.8437 7.83304 13.0132 7.7628 13.1383 7.63778C13.2633 7.51276 13.3335 7.34319 13.3335 7.16638ZM14.7889 15.2757L15.3955 14.5764C15.7817 14.189 15.9985 13.6643 15.9985 13.1174C15.9985 12.5704 15.7817 12.0458 15.3955 11.6584C15.3749 11.6377 13.7709 10.4037 13.7709 10.4037C13.3859 10.0373 12.8746 9.83321 12.3431 9.83396C11.8116 9.8347 11.3008 10.0402 10.9169 10.4077L9.6462 11.4784C8.60898 11.0491 7.66679 10.4192 6.87372 9.62472C6.08065 8.83028 5.45234 7.887 5.02486 6.84904L6.09153 5.58238C6.45934 5.19849 6.66506 4.68763 6.66593 4.15598C6.6668 3.62433 6.46275 3.11279 6.0962 2.72771C6.0962 2.72771 4.86086 1.12571 4.8402 1.10504C4.45983 0.722207 3.94412 0.50439 3.40448 0.498651C2.86485 0.492913 2.34462 0.699715 1.9562 1.07437L1.18953 1.74104C-3.3398 6.99571 6.41353 16.6737 11.8415 16.4997C12.3897 16.5029 12.9329 16.3962 13.4391 16.186C13.9453 15.9758 14.4042 15.6662 14.7889 15.2757Z" fill="#B8C9F5" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_429_1976">
                                                <rect width="16" height="16" fill="white" transform="translate(0 0.5)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <p>0123456789</p>
                            </a>
                            <a href="mailto:fashionlineunique@gmail.com" className="flex gap-3">
                                <div className="w-4 h-4 relative flex justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                        <g clipPath="url(#clip0_429_1985)">
                                            <path d="M15.9693 4.19458L10.3573 9.80658C9.73158 10.4307 8.88383 10.7813 8 10.7813C7.11617 10.7813 6.26842 10.4307 5.64267 9.80658L0.0306667 4.19458C0.0213333 4.29991 0 4.39525 0 4.49991V12.4999C0.00105857 13.3836 0.352588 14.2309 0.97748 14.8558C1.60237 15.4807 2.4496 15.8322 3.33333 15.8332H12.6667C13.5504 15.8322 14.3976 15.4807 15.0225 14.8558C15.6474 14.2309 15.9989 13.3836 16 12.4999V4.49991C16 4.39525 15.9787 4.29991 15.9693 4.19458Z" fill="#B8C9F5" />
                                            <path d="M9.41476 8.86384L15.5041 2.77384C15.2091 2.28472 14.7931 1.87986 14.2961 1.59832C13.7991 1.31679 13.2379 1.16806 12.6668 1.1665H3.33343C2.76224 1.16806 2.20109 1.31679 1.70411 1.59832C1.20713 1.87986 0.791079 2.28472 0.496094 2.77384L6.58543 8.86384C6.96114 9.23805 7.46982 9.44815 8.00009 9.44815C8.53037 9.44815 9.03905 9.23805 9.41476 8.86384Z" fill="#B8C9F5" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_429_1985">
                                                <rect width="16" height="16" fill="white" transform="translate(0 0.5)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <p>fashionlineunique@gmail.com</p>
                            </a>
                            <a className="flex gap-3" href="https://maps.app.goo.gl/Vf5n6kZQAfbTUcDv9" target="_blank">
                                <div className="w-4 h-4 relative flex justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                        <g clipPath="url(#clip0_429_1990)">
                                            <path d="M7.9997 0.52832C6.23566 0.530261 4.54442 1.23184 3.29699 2.47914C2.04957 3.72644 1.34782 5.41762 1.3457 7.18165C1.3457 8.89499 2.67237 11.5763 5.28904 15.151C5.60054 15.5777 6.00841 15.9249 6.47944 16.1643C6.95047 16.4036 7.47135 16.5283 7.9997 16.5283C8.52805 16.5283 9.04894 16.4036 9.51997 16.1643C9.991 15.9249 10.3989 15.5777 10.7104 15.151C13.327 11.5763 14.6537 8.89499 14.6537 7.18165C14.6516 5.41762 13.9498 3.72644 12.7024 2.47914C11.455 1.23184 9.76374 0.530261 7.9997 0.52832ZM7.9997 9.83365C7.47229 9.83365 6.95671 9.67726 6.51818 9.38424C6.07965 9.09122 5.73786 8.67475 5.53602 8.18748C5.33419 7.70021 5.28138 7.16403 5.38428 6.64675C5.48717 6.12946 5.74115 5.65431 6.11409 5.28137C6.48703 4.90843 6.96218 4.65445 7.47946 4.55156C7.99675 4.44867 8.53292 4.50148 9.02019 4.70331C9.50746 4.90514 9.92394 5.24694 10.217 5.68547C10.51 6.124 10.6664 6.63957 10.6664 7.16699C10.6664 7.87423 10.3854 8.55251 9.88532 9.05261C9.38522 9.5527 8.70695 9.83365 7.9997 9.83365Z" fill="#B8C9F5" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_429_1990">
                                                <rect width="16" height="16" fill="white" transform="translate(0 0.5)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <p className="leading-tight">01 Đ. Võ Văn Ngân, Linh Chiểu, Thủ Đức, Hồ Chí Minh, Việt Nam</p>
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-wrap lg:gap-x-[87px] md:gap-x-[40px] gap-y-[40px] justify-between w-full">
                        <div className="flex-col justify-start items-start gap-2 flex">
                            <div className="text-pale_cornflower_blue text-base font-semibold font-['Outfit', Arial, sans-serif] leading-loose uppercase">Page</div>
                            <div className="flex flex-col gap-2 text-white text-sm font-normal font-['Outfit', Arial, sans-serif] leading-tight">
                                <a href="/">Trang chủ</a>
                                <a href="/shop">Sản phẩm</a>
                                <a href="/blog">Bài viết</a>
                                <a href="/policies">Chính sách</a>
                                <a href="/about">Giới thiệu</a>
                            </div>
                        </div>

                        <div className="flex-col justify-start items-start gap-2 flex">
                            <div className="text-pale_cornflower_blue text-base font-semibold font-['Outfit', Arial, sans-serif] leading-loose uppercase">For customer </div>
                            <div className="flex flex-col gap-2 text-white text-sm font-normal font-['Outfit', Arial, sans-serif] leading-tight">
                                <a href="/login">Đăng nhập</a>
                                <a href="/signup">Đăng ký</a>
                                <a href="/verify-account">Tài khoản</a>
                                <a href="/size-map">Bảng thông số quần áo</a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="w-full max-w-[500px]">
                    <div className="widget_text row">
                        <div className="widget_text widget col-12 col-md-12 default no-icon heading-style-1 widget_custom_html">
                            <div className="widget_text widget__inner widget_custom_html__inner c-widget-wrap">
                                <div className="widget_text widget-content">
                                    <div className="textwidget custom-html-widget">
                                        <iframe
                                            title="Facebook Widget"
                                            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D100071853580727&amp;tabs=timeline&amp;width=500&amp;height=400&amp;small_header=true&amp;adapt_container_width=true&amp;hide_cover=true&amp;show_facepile=true"
                                            width="100%" 
                                            height="400"
                                            style={{ border: 'none', overflow: 'hidden' }}
                                            scrolling="no"
                                            frameBorder="0"
                                            allowFullScreen={true}
                                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                        ></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full h-px border border-violet-50"></div>

            <div className="text-center copyright-text text-white text-xs font-normal font-['Outfit', Arial, sans-serif] leading-none">
                Copyright © {new Date().getFullYear()} FashionLine. All rights reserved.<br />
                All materials published on FashionLine, including but not limited are protected by copyright and owned or controlled by FashionLine or the party credited as the provider of the Content.
            </div>
        </div>
    );
}
export default BaseFooter
