import { Panel } from "rsuite";
import { name_web, icon } from '@/assets/images'

const BaseFooter = () => {
    return (
        <div className="lg:px-[100px] md:px-[60px] px-[20px] flex flex-col gap-8 bg-sapphire py-[30px]">
            <div className="flex md:flex-row flex-col gap-[40px] justify-between">
                <div className="flex-col justify-start items-start gap-8 flex">
                    <div className="flex-col justify-center items-start gap-2 flex">
                        <div className="text-pale_cornflower_blue text-base font-semibold font-['Outfit', Arial, sans-serif] leading-loose uppercase">Contact us </div>
                        <div className="flex flex-col gap-2 text-white text-sm font-normal font-['Outfit', Arial, sans-serif] leading-tight">
                            <a href="tel:<?php echo get_theme_mod('phone') ?>" className="flex gap-3">
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
                                <p>phone</p>
                            </a>
                            <a href="mailto:email" className="flex gap-3">
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
                                <p>Email</p>
                            </a>
                            <a className="flex gap-3" href="<?php echo get_theme_mod('mapurl') ?>" target="_blank">
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
                                <p className="leading-tight">Address</p>
                            </a>
                        </div>
                    </div>

                    <div className="flex gap-4 flex-wrap">
                        <a className="flex justify-center items-center" href="<?php echo get_theme_mod('facebook_url') ?>" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                <g clipPath="url(#clip0_106_1946)">
                                    <path d="M30 15C30 6.71552 23.2845 0 15 0C6.71552 0 0 6.71552 0 15C0 22.035 4.84303 27.9371 11.3764 29.5585V19.5837H8.2833V15H11.3764V13.025C11.3764 7.91906 13.6868 5.55265 18.699 5.55265C19.6497 5.55265 21.2894 5.73949 21.9601 5.92574V10.0809C21.6059 10.0438 20.9912 10.025 20.2273 10.025C17.7678 10.025 16.8171 10.9568 16.8171 13.3792V15H21.7167L20.875 19.5837H16.8171V29.8904C24.2446 28.9933 30 22.6692 30 15Z" fill="white" />
                                    <path d="M20.875 19.5838L21.7166 15.0001H16.817V13.3793C16.817 10.9569 17.7677 10.025 20.2272 10.025C20.9911 10.025 21.6058 10.0439 21.96 10.081V5.92582C21.2893 5.73957 19.6496 5.55273 18.6989 5.55273C13.6867 5.55273 11.3763 7.91973 11.3763 13.025V15.0001H8.2832V19.5838H11.3763V29.5586C12.5368 29.8463 13.7504 30.0001 14.9999 30.0001C15.6152 30.0001 16.2211 29.9624 16.817 29.8905V19.5838H20.875Z" fill="#2C4FA3" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_106_1946">
                                        <rect width="30" height="30" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </a>
                        <a className="flex justify-center items-center" href="<?php echo get_theme_mod('linkedin_url') ?>" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                <g clipPath="url(#clip0_106_1950)">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M6.7749 0.0695801H23.2251C25.0203 0.0747333 26.7406 0.79017 28.01 2.0596C29.2794 3.32902 29.9948 5.04925 30 6.84448V23.158C29.9942 24.9528 29.2785 26.6724 28.0091 27.9413C26.7398 29.2102 25.0199 29.9253 23.2251 29.9304H6.7749C4.98009 29.9253 3.26023 29.2102 1.99087 27.9413C0.721518 26.6724 0.00579691 24.9528 0 23.158V6.84448C0.00515319 5.04925 0.72059 3.32902 1.99002 2.0596C3.25944 0.79017 4.97967 0.0747333 6.7749 0.0695801Z" fill="white" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12.0093 11.6443H15.8008V13.5974H15.8545C16.3843 12.6501 17.6733 11.6443 19.5996 11.6443C23.6011 11.6443 24.3408 14.1345 24.3408 17.3743V24.2249H20.3882V18.136C20.3882 16.7419 20.3589 14.9475 18.3325 14.9475C16.3062 14.9475 15.9595 16.4636 15.9595 18.0359V24.2371H12.0093V11.6443ZM9.76563 7.83081C9.76563 8.23738 9.64506 8.63482 9.41918 8.97288C9.1933 9.31093 8.87225 9.57441 8.49663 9.73C8.12101 9.88558 7.70768 9.92629 7.30892 9.84698C6.91016 9.76766 6.54388 9.57187 6.25639 9.28438C5.9689 8.99689 5.77312 8.63061 5.6938 8.23185C5.61448 7.83309 5.65519 7.41977 5.81078 7.04414C5.96636 6.66852 6.22984 6.34747 6.5679 6.12159C6.90595 5.89571 7.30339 5.77515 7.70996 5.77515C8.25496 5.77579 8.77745 5.99258 9.16282 6.37795C9.54819 6.76332 9.76498 7.28581 9.76563 7.83081ZM5.65918 11.6443H9.76563V24.2249H5.65918V11.6443Z" fill="#2C4FA3" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_106_1950">
                                        <rect width="30" height="29.8608" fill="white" transform="translate(0 0.0695801)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </a>
                        <a className="flex justify-center items-center" href="<?php echo get_theme_mod('twitter_url') ?>" target="_blank">
                            <svg width="30" height="28" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.6262 0.363647H28.2262L18.1763 11.9174L30 27.6364H20.7425L13.4925 18.1017L5.195 27.6364H0.5925L11.3425 15.278L0 0.364905H9.4925L16.0462 9.07991L23.6262 0.363647ZM22.0125 24.868H24.5613L8.1075 2.98745H5.3725L22.0125 24.868Z" fill="white" />
                            </svg>
                        </a>
                        <a className="flex justify-center items-center" href="<?php echo get_theme_mod('instagram_url') ?>" target="_blank">
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 11.28C14.2643 11.28 13.545 11.4982 12.9333 11.9069C12.3215 12.3157 11.8447 12.8967 11.5632 13.5764C11.2816 14.2562 11.2079 15.0041 11.3515 15.7257C11.495 16.4473 11.8493 17.1102 12.3696 17.6304C12.8898 18.1507 13.5527 18.505 14.2743 18.6485C14.9959 18.7921 15.7438 18.7184 16.4236 18.4368C17.1033 18.1553 17.6843 17.6785 18.0931 17.0667C18.5018 16.455 18.72 15.7357 18.72 15C18.72 14.5115 18.6238 14.0277 18.4368 13.5764C18.2499 13.1251 17.9759 12.715 17.6304 12.3696C17.285 12.0241 16.8749 11.7501 16.4236 11.5632C15.9723 11.3762 15.4885 11.28 15 11.28ZM29.895 7.605C29.8871 6.44664 29.6738 5.29886 29.265 4.215C28.9639 3.42189 28.4981 2.70164 27.8982 2.10178C27.2984 1.50192 26.5781 1.03608 25.785 0.735C24.7011 0.326196 23.5534 0.112891 22.395 0.105C20.46 -1.04308e-07 19.89 0 15 0C10.11 0 9.54 -1.04308e-07 7.605 0.105C6.44664 0.112891 5.29886 0.326196 4.215 0.735C3.42189 1.03608 2.70164 1.50192 2.10178 2.10178C1.50192 2.70164 1.03608 3.42189 0.735 4.215C0.326196 5.29886 0.112891 6.44664 0.105 7.605C-1.04308e-07 9.54 0 10.11 0 15C0 19.89 -1.04308e-07 20.46 0.105 22.395C0.121146 23.5574 0.334161 24.7087 0.735 25.8C1.03474 26.5895 1.50019 27.3056 2.1 27.9C2.69729 28.5035 3.41908 28.9693 4.215 29.265C5.29886 29.6738 6.44664 29.8871 7.605 29.895C9.54 30 10.11 30 15 30C19.89 30 20.46 30 22.395 29.895C23.5534 29.8871 24.7011 29.6738 25.785 29.265C26.5809 28.9693 27.3027 28.5035 27.9 27.9C28.4998 27.3056 28.9653 26.5895 29.265 25.8C29.6734 24.7108 29.8867 23.5582 29.895 22.395C30 20.46 30 19.89 30 15C30 10.11 30 9.54 29.895 7.605ZM26.085 19.605C26.0369 20.5307 25.8393 21.4424 25.5 22.305C25.2088 23.0245 24.7759 23.6782 24.227 24.227C23.6782 24.7759 23.0245 25.2088 22.305 25.5C21.4343 25.8204 20.5174 25.9977 19.59 26.025H10.41C9.4826 25.9977 8.56573 25.8204 7.695 25.5C6.95115 25.2236 6.27942 24.7826 5.73 24.21C5.1865 23.6719 4.76677 23.0218 4.5 22.305C4.17834 21.4352 4.00591 20.5173 3.99 19.59V10.41C4.00591 9.48274 4.17834 8.56483 4.5 7.695C4.77642 6.95115 5.21741 6.27942 5.79 5.73C6.3305 5.18944 6.9799 4.77014 7.695 4.5C8.56573 4.17961 9.4826 4.00231 10.41 3.975H19.59C20.5174 4.00231 21.4343 4.17961 22.305 4.5C23.0488 4.77642 23.7206 5.21741 24.27 5.79C24.8135 6.32812 25.2332 6.9782 25.5 7.695C25.8204 8.56573 25.9977 9.4826 26.025 10.41V15C26.025 18.09 26.13 18.405 26.085 19.59V19.605ZM23.685 8.445C23.5064 7.96048 23.2248 7.52046 22.8597 7.15532C22.4945 6.79018 22.0545 6.50859 21.57 6.33C20.9047 6.09939 20.204 5.98769 19.5 6H10.5C9.7924 6.00692 9.0916 6.13895 8.43 6.39C7.95289 6.56048 7.51754 6.83057 7.15288 7.1823C6.78821 7.53403 6.50259 7.95936 6.315 8.43C6.09716 9.09805 5.99074 9.79739 6 10.5V19.5C6.01487 20.2068 6.14665 20.9063 6.39 21.57C6.5686 22.0545 6.85018 22.4945 7.21532 22.8597C7.58046 23.2248 8.02048 23.5064 8.505 23.685C9.145 23.9204 9.81848 24.052 10.5 24.075H19.5C20.2076 24.0681 20.9084 23.9361 21.57 23.685C22.0545 23.5064 22.4945 23.2248 22.8597 22.8597C23.2248 22.4945 23.5064 22.0545 23.685 21.57C23.9361 20.9084 24.0681 20.2076 24.075 19.5V10.5C24.0754 9.7917 23.9432 9.08958 23.685 8.43V8.445ZM15 20.73C14.2482 20.73 13.5038 20.5817 12.8095 20.2935C12.1151 20.0054 11.4845 19.5831 10.9536 19.0508C10.4227 18.5185 10.002 17.8868 9.71572 17.1916C9.42939 16.4965 9.28303 15.7518 9.285 15C9.285 13.8661 9.62144 12.7576 10.2517 11.815C10.882 10.8724 11.7778 10.138 12.8257 9.70475C13.8736 9.2715 15.0265 9.15891 16.1384 9.38122C17.2503 9.60353 18.2713 10.1508 19.072 10.9536C19.8728 11.7565 20.4173 12.7789 20.6367 13.8914C20.8561 15.0039 20.7405 16.1564 20.3045 17.2032C19.8685 18.2499 19.1318 19.1438 18.1875 19.7716C17.2432 20.3994 16.1339 20.733 15 20.73ZM21 10.395C20.6684 10.3599 20.3615 10.2033 20.1385 9.95546C19.9155 9.70758 19.7921 9.38594 19.7921 9.0525C19.7921 8.71906 19.9155 8.39742 20.1385 8.14954C20.3615 7.90167 20.6684 7.7451 21 7.71C21.3316 7.7451 21.6385 7.90167 21.8615 8.14954C22.0845 8.39742 22.2079 8.71906 22.2079 9.0525C22.2079 9.38594 22.0845 9.70758 21.8615 9.95546C21.6385 10.2033 21.3316 10.3599 21 10.395Z" fill="white" />
                            </svg>
                        </a>
                        <a className="flex justify-center items-center" href="<?php echo get_theme_mod('youtube_url') ?>" target="_blank">
                            <svg width="30" height="22" viewBox="0 0 30 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 15.5L19.785 11L12 6.5V15.5ZM29.34 3.755C29.535 4.46 29.67 5.405 29.76 6.605C29.865 7.805 29.91 8.84 29.91 9.74L30 11C30 14.285 29.76 16.7 29.34 18.245C28.965 19.595 28.095 20.465 26.745 20.84C26.04 21.035 24.75 21.17 22.77 21.26C20.82 21.365 19.035 21.41 17.385 21.41L15 21.5C8.715 21.5 4.8 21.26 3.255 20.84C1.905 20.465 1.035 19.595 0.66 18.245C0.465 17.54 0.33 16.595 0.24 15.395C0.135 14.195 0.0899999 13.16 0.0899999 12.26L0 11C0 7.715 0.24 5.3 0.66 3.755C1.035 2.405 1.905 1.535 3.255 1.16C3.96 0.965 5.25 0.83 7.23 0.74C9.18 0.635 10.965 0.59 12.615 0.59L15 0.5C21.285 0.5 25.2 0.74 26.745 1.16C28.095 1.535 28.965 2.405 29.34 3.755Z" fill="white" />
                            </svg>
                        </a>
                        <a className="flex justify-center items-center" href="<?php echo get_theme_mod('tiktok_url') ?>" target="_blank">
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 0C12.0333 0 9.13319 0.879734 6.66645 2.52796C4.19972 4.17618 2.27713 6.51885 1.14181 9.25975C0.00649926 12.0006 -0.290551 15.0166 0.288228 17.9263C0.867006 20.8361 2.29562 23.5088 4.3934 25.6066C6.49119 27.7044 9.16394 29.133 12.0737 29.7118C14.9834 30.2906 17.9994 29.9935 20.7403 28.8582C23.4811 27.7229 25.8238 25.8003 27.472 23.3335C29.1203 20.8668 30 17.9667 30 15C29.996 11.023 28.4144 7.20997 25.6022 4.39778C22.79 1.5856 18.977 0.00397107 15 0ZM23.9085 11.5695V12.5385C23.9085 12.6127 23.8937 12.6861 23.8649 12.7544C23.836 12.8227 23.7938 12.8846 23.7407 12.9363C23.6875 12.9881 23.6246 13.0286 23.5555 13.0556C23.4864 13.0826 23.4126 13.0955 23.3385 13.0935C21.7548 12.9813 20.2397 12.403 18.984 11.4315V18.5235C18.9838 19.3084 18.8272 20.0855 18.5233 20.8092C18.2194 21.5329 17.7743 22.1888 17.214 22.7385C16.6487 23.302 15.977 23.7473 15.2379 24.0486C14.4988 24.3499 13.7071 24.5011 12.909 24.4935C11.3039 24.4907 9.7634 23.8609 8.616 22.7385C7.88609 22.0026 7.36035 21.0893 7.0905 20.0886C6.82065 19.0879 6.816 18.0341 7.07701 17.031C7.31551 16.068 7.79701 15.183 8.47651 14.4615C8.98325 13.8421 9.62201 13.3438 10.3461 13.0031C11.0702 12.6623 11.8613 12.4877 12.6615 12.492H13.8915V15.0465C13.892 15.1207 13.8768 15.1941 13.8467 15.262C13.8166 15.3298 13.7724 15.3904 13.7171 15.4398C13.6617 15.4892 13.5965 15.5262 13.5257 15.5484C13.4549 15.5706 13.3802 15.5775 13.3065 15.5685C12.5923 15.354 11.8228 15.4251 11.1601 15.767C10.4973 16.1088 9.99322 16.6946 9.75397 17.4008C9.51472 18.1071 9.55904 18.8787 9.87758 19.5529C10.1961 20.2271 10.764 20.7513 11.4615 21.015C11.8665 21.2475 12.3195 21.384 12.7845 21.4155C13.1445 21.4305 13.5045 21.3855 13.8465 21.2775C14.4177 21.0853 14.9145 20.7194 15.2677 20.231C15.6208 19.7426 15.8125 19.1561 15.816 18.5535V5.631C15.8158 5.56016 15.8296 5.48997 15.8566 5.42446C15.8835 5.35896 15.9232 5.29942 15.9732 5.24925C16.0232 5.19909 16.0827 5.15929 16.1481 5.13213C16.2135 5.10498 16.2837 5.091 16.3545 5.091H18.477C18.615 5.09081 18.7478 5.14361 18.848 5.23852C18.9483 5.33342 19.0082 5.46318 19.0155 5.601C19.0931 6.26277 19.3034 6.90209 19.6339 7.4807C19.9643 8.05932 20.408 8.56534 20.9385 8.9685C21.6556 9.50683 22.5074 9.83694 23.4 9.9225C23.5337 9.93393 23.6587 9.99342 23.7519 10.0899C23.8452 10.1865 23.9002 10.3135 23.907 10.4475L23.9085 11.5695Z" fill="white" />
                            </svg>
                        </a>
                    </div>
                </div>

                <div className="flex flex-wrap lg:gap-x-[87px] md:gap-x-[40px] gap-y-[40px] justify-between">
                    <div className="flex-col justify-start items-start gap-2 flex">
                        <a href="/about-us" className="text-pale_cornflower_blue text-base font-semibold font-['Outfit', Arial, sans-serif] leading-loose uppercase">About</a>
                        <div className="flex flex-col gap-2 text-white text-sm font-normal font-['Outfit', Arial, sans-serif] leading-tight">
                            <a href="/">A2B Tax</a>
                            <a href="/careers">Career</a>
                            <a href="/legal">Legal</a>
                            <a href="/blogs">Blogs</a>
                            <a href="/guides-and-templates">Guides & Templates</a>
                        </div>
                    </div>

                    <div className="flex-col justify-start items-start gap-2 flex">
                        <a href="/services" className="text-pale_cornflower_blue text-base font-semibold font-['Outfit', Arial, sans-serif] leading-loose uppercase">Services </a>
                        <div className="flex flex-col gap-2 text-white text-sm font-normal font-['Outfit', Arial, sans-serif] leading-tight">
                            <a href="/services/?service=accounts-preparation">Accounts preparation</a>
                            <a href="/services/?service=tax-returns-and-self-assessment">Tax returns & Self assessment</a>
                            <a href="/services/?service=vat-returns">VAT returns</a>
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
