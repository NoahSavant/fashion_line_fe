import React, { useState } from 'react';
import { InputNumber, Input, RadioGroup, Radio, CheckboxGroup, Checkbox } from "rsuite";
import {
    FunnelIcon
} from '@/components/icons.js';
import Collection from './Collection';
import { SelectTag, SelectCategory, SingleSelect, SelectCollection } from '@/components/selects'

const Filter = ({filter, setFilter, filterClick}) => {
    const [setting, setSetting] = useState({
        categoriesIsOpen: true,
        tagsIsOpen: true,
        collectionsIsOpen: true,
        sortIsOpen: true
    });

    const toThousands = (value) => {
        return value ? `${value}`.replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&.') : value;
    }

    return (
        <div className='p-3 bg-white flex flex-col gap-4'>
            <div className="text-white cursor-pointer px-3 py-2 bg-sapphire rounded-md justify-center items-center flex p-btn gap-2 w-full" onClick={filterClick}>
                <FunnelIcon />
                <div className="text-sm font-normal capitalize leading-normal">Tìm ngay</div>
            </div>
            <Input className='max-w-[700px] shadow-full' placeholder='Search...' value={filter.search} onChange={(value) => setFilter({ ...filter, search: value})}/>
            <div className='flex gap-2'>
                <InputNumber step={1000} postfix="đ̲" formatter={toThousands} value={filter.minPrice} onChange={(value) => setFilter({ ...filter, minPrice: value < filter.maxPrice ? value : filter.maxPrice })} />
                <InputNumber step={1000} postfix="đ̲" formatter={toThousands}  value={filter.maxPrice} onChange={(value) => setFilter({ ...filter, maxPrice: value > filter.minPrice ? value : filter.minPrice })} />
            </div>
            <div className='flex flex-col gap-4'>
                <div className='w-full flex gap-2 justify-center items-center'>
                    <div className={`${setting.categoriesIsOpen ? 'rotate-90' : '-rotate-90'} transform transition-all duration-500 ease-in-out`} onClick={() => setSetting({ ...setting, categoriesIsOpen: !setting.categoriesIsOpen })}>
                        <svg
                            version="1.1"
                            id="Layer_1"
                            width="25px"
                            height="25px"
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
                    <div className='w-full h-0.5 bg-slate-300'></div>
                    <div className='px-2 bg-white font-medium text-base text-nowrap'>Danh mục</div>
                    <div className='w-full h-0.5 bg-slate-300'></div>
                </div>
                <SelectCategory value={filter.category} setValue={(value) => setFilter({ ...filter, category: value })} single={true} select={false} className={`grid grid-cols-2 px-2 ${setting.categoriesIsOpen ? '' : 'hidden'}`} />
            </div>
            <div className='flex flex-col gap-4'>
                <div className='w-full flex gap-2 justify-center items-center'>
                    <div className={`${setting.tagsIsOpen ? 'rotate-90' : '-rotate-90'} transform transition-all duration-500 ease-in-out`} onClick={() => setSetting({ ...setting, tagsIsOpen: !setting.tagsIsOpen })}>
                        <svg
                            version="1.1"
                            id="Layer_1"
                            width="25px"
                            height="25px"
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
                    <div className='w-full h-0.5 bg-slate-300'></div>
                    <div className='px-2 bg-white font-medium text-base text-nowrap'>Thẻ</div>
                    <div className='w-full h-0.5 bg-slate-300'></div>
                </div>
                <SelectTag value={filter.tags}
                    setValue={(value) => setFilter({ ...filter, tags: value })} className={`grid grid-cols-2 px-2 ${setting.tagsIsOpen ? '' : 'hidden'}`} select={false}/>
                
            </div>
            <div className='flex flex-col gap-4'>
                <div className='w-full flex gap-2 justify-center items-center'>
                    <div className={`${setting.collectionsIsOpen ? 'rotate-90' : '-rotate-90'} transform transition-all duration-500 ease-in-out`} onClick={() => setSetting({ ...setting, collectionsIsOpen: !setting.collectionsIsOpen })}>
                        <svg
                            version="1.1"
                            id="Layer_1"
                            width="25px"
                            height="25px"
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
                    <div className='w-full h-0.5 bg-slate-300'></div>
                    <div className='px-2 bg-white font-medium text-base text-nowrap'>Bộ sưu tập</div>
                    <div className='w-full h-0.5 bg-slate-300'></div>
                </div>
                <SelectCollection value={filter.collections}
                    setValue={(value) => setFilter({ ...filter, collections: value })}
                    className={`grid grid-cols-2 px-2 ${setting.collectionsIsOpen ? '' : 'hidden'}`} select={false}/>
                
            </div>
            <div className='flex flex-col gap-4'>
                <div className='w-full flex gap-2 justify-center items-center'>
                    <div className={`${setting.sortIsOpen ? 'rotate-90' : '-rotate-90'} transform transition-all duration-500 ease-in-out`} onClick={() => setSetting({ ...setting, sortIsOpen: !setting.sortIsOpen })}>
                        <svg
                            version="1.1"
                            id="Layer_1"
                            width="25px"
                            height="25px"
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
                    <div className='w-full h-0.5 bg-slate-300'></div>
                    <div className='px-2 bg-white font-medium text-base text-nowrap'>Sắp xếp</div>
                    <div className='w-full h-0.5 bg-slate-300'></div>
                </div>
                <div className={`flex flex-col px-2 ${setting.sortIsOpen ? '' : 'hidden'}`}>
                    <RadioGroup name="radio-group-controlled" value={filter.column} onChange={(value) => setFilter({ ...filter, column: value })} className={`grid grid-cols-2 px-2`}>
                        <Radio value="id">Thời gian</Radio>
                        <Radio value="price">Giá</Radio>
                        <Radio value="name">Tên</Radio>
                        <Radio value="average_rate">Đánh giá</Radio>
                    </RadioGroup>
                    <div className='w-full flex gap-2 justify-center items-center'>
                        <div className='w-full h-0.5 bg-slate-300'></div>
                        <div className='px-2 bg-white font-medium text-base text-nowrap'>Theo</div>
                        <div className='w-full h-0.5 bg-slate-300'></div>
                    </div>
                    <RadioGroup name="radio-group-controlled" value={filter.order} onChange={(value) => setFilter({ ...filter, order: value })} className={`grid grid-cols-2 px-2`}>
                        <Radio value="desc">Decrease</Radio>
                        <Radio value="asc">Increase</Radio>
                    </RadioGroup>
                </div>
                
            </div>
        </div>
    );
};

export default Filter;
