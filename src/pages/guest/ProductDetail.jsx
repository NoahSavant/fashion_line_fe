import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from "react-router-dom";
import { productEndpoints } from '@/apis';
import { Carousel, InputNumber } from 'rsuite';
import { useApi } from '@/hooks';
import { variantEndpoints } from '@/apis';
import { IoCartOutline } from '@/components/icons.js';
import { convertStringToArray } from '@/helpers/dataHelpers';

const ProductDetail = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [id, setId] = useState(null);

    useEffect(() => {
        if (searchParams.has('id')) {
            setId(searchParams.get('id'));
        } else {
            navigate('/');
        }
    }, []);

    useEffect(() => {
        if (id == null) return;
        handleGetProduct(productEndpoints.getSingle + id, {})
        handleGetVariants(variantEndpoints.get + '/' + id, {
            params: {
                all: true
            }
        });
    }, [id]);

    const { data: productData, callApi: handleGetProduct, loading: productLoading } = useApi();
    const { data: variantsData, callApi: handleGetVariants, loading: variantsLoading } = useApi();
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [variants, setVariants] = useState([]);
    const [selectedVariant, setSelectedVariant] = useState({})
    const navigate = useNavigate();
    const [number, setNumber] = useState(1)

    useEffect(() => {
        if (productData) {
            setVariants([...variants, 
                {
                    index: 0,
                    image_url: productData?.first_image_url,
                    size: []
                },
                {
                    index: 1,
                    image_url: productData?.second_image_url,
                    size: []
                }
            ]);
        }
    }, [productData]);

    useEffect(() => {
        if (variantsData) {
            const sizesMap = {};
            const colorsMap = {};
            const newVariants = [];

            variantsData.forEach((variant, index) => {
                const currentSizes = convertStringToArray(variant.size);
                console.log(currentSizes);
                newVariants.push({ ...variant, index: index + 2, size: currentSizes });

                // Update sizes
                currentSizes.forEach((currentSize, index) => {
                    if (!sizesMap[currentSize]) {
                        sizesMap[currentSize] = { size: currentSize, colors: [] };
                    }

                    if (!sizesMap[currentSize].colors.includes(variant.color)) {
                        sizesMap[currentSize].colors.push(variant.color);
                    }
                })

                // Update colors
                if (!colorsMap[variant.color]) {
                    colorsMap[variant.color] = { color: variant.color, sizes: [] };
                }

                if (colorsMap[variant.color]) {
                    colorsMap[variant.color].sizes = Array.from(new Set([colorsMap[variant.color].sizes, ...currentSizes]));
                }
            });

            setSizes(Object.values(sizesMap));
            setColors(Object.values(colorsMap));
            const currentVariants = [...variants, ...newVariants];
            setVariants(currentVariants);
            setSelectedVariant(currentVariants.find(variant => variant.index === 2));
        }
    }, [variantsData]);

    useEffect(() => {
        if (selectedSize) {
            if (selectedColor) {
                if (selectedColor.sizes.includes(selectedSize.size)) {
                    const temp = variants.find(variant => (variant.size.includes(selectedSize.size) && variant.color === selectedColor.color));
                    if (temp) {
                        setSelectedVariant(temp);
                    }
                } else {
                    setSelectedColor(null);
                }
            }
        }
    }, [selectedSize]);

    useEffect(() => {
        if (selectedColor) {
            if (selectedSize) {
                if (selectedSize.colors.includes(selectedColor.color)) {
                    const temp = variants.find(variant => (variant.size.includes(selectedSize.size) && variant.color === selectedColor.color));
                    if (temp) {
                        setSelectedVariant(temp);
                    }
                } else {
                    setSelectedSize(null);
                }
            }
        }
    }, [selectedColor]);

    useEffect(() => {
        if (selectedVariant) {
            const matchingSize = sizes.find(size => selectedVariant.size.includes(size.size)) ?? null;
            console.log(matchingSize);
            setSelectedSize(matchingSize);

            const matchingColor = colors.find(color => color.color === selectedVariant.color) ?? null;
            setSelectedColor(matchingColor);

            setNumber(1);
        }
    }, [selectedVariant]);

    return (
        <div className='custom-padding flex flex-col'>
            <div className='bg-gray-100 p-2 mb-4 -mt-3 flex gap-2 items-center'>
                <a href='/' className='text-base font-medium text-blue-500 cursor-pointer'>
                    Home
                </a>
                <div>/</div>
                <a href='/shop' className='text-base font-medium text-blue-500 cursor-pointer'>
                    Shop
                </a>
                <div>/</div>
                <a href={`/shop?category=${productData?.category_id}`} className='text-base font-medium text-blue-500 cursor-pointer'>
                    {productData?.category?.name}
                </a>
                <div>/</div>
                <div className='text-base font-medium text-black'>
                    {productData?.name}
                </div>
            </div>
            <div className="flex gap-5">
                <div className="flex-1 flex flex-col gap-2">
                    <Carousel className="custom-slider" shape='bar' activeIndex={selectedVariant?.index} onSelect={(index) => setSelectedVariant(variants[index])}>
                        {variants.map(variant => (
                            <img
                                key={variant.index}
                                src={variant.image_url}
                                alt="Product Variant"
                                className="w-full object-contain bg-white"
                            />
                        ))}
                    </Carousel>
                    <div className="flex justify-center gap-2">
                        {variants.map((variant) => (
                            <div key={variant.index} className={`w-14 h-14 p-1 cursor-pointer border object-contain ${selectedVariant.index === variant.index ? 'border-black' : 'border-transparent'}`}>
                                <img
                                    src={variant.image_url}
                                    alt="Product Variant Thumbnail"
                                    className={`w-full h-full cursor-pointer border object-contain`}
                                    onClick={() => setSelectedVariant(variant)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex-1 flex flex-col justify-between">
                    <div className='flex flex-col gap-2 text-lg'>
                        <h3 className="text-2xl font-bold text-sapphire">{productData?.name}</h3>
                        <div>
                            <strong className="">Description:</strong>
                            <div className="text-lg text-black font-medium line-clamp-4">{productData?.description}</div>
                        </div>
                        <div>
                            <strong className="">Tags:</strong>
                            <div className="flex items-center gap-2 py-2">
                                {productData?.tags.map((tag, index) => (
                                    <a href={`/shop?tags[]=${tag.id}`} key={index} className="px-2 py-1 min-w-[50px] rounded-md w-fit p-btn" style={{ backgroundColor: tag.color }}>
                                        <div className="text-base text-white font-semibold text-center">{tag.name}</div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="">
                            <strong className="">Sizes:</strong>
                            <div className='flex gap-2 py-2'>
                                {sizes?.map((size, index) => (
                                    <div key={index} className={`border-2 ${selectedSize?.size === size.size ? 'border-sapphire text-sapphire' : selectedColor?.sizes.includes(size.size) ? 'border-black text-black' : 'border-gray-400 text-gray-400'}  rounded-md py-1 px-2 min-w-8 flex justify-center items-center cursor-pointer`} onClick={() => setSelectedSize(size)}>
                                        <div className='text-base font-medium'>
                                            {size.size}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <strong className="">Colors:</strong>
                            <div className='flex gap-2 py-2'>
                                {colors?.map((color, index) => (
                                    <div key={index} className={`border-2 ${selectedColor?.color == color.color ? 'border-sapphire text-sapphire' : selectedSize?.colors.includes(color.color) ? 'border-black text-black' : 'border-gray-400 text-gray-400'}  rounded-md py-1 px-2 min-w-8 flex justify-center items-center cursor-pointer`} onClick={() => setSelectedColor(color)}>
                                        <div className='text-base font-medium'>
                                            {color.color}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {
                            selectedVariant?.index > 1 &&
                            <div>
                                <strong className="">Price:</strong>
                                <div className="text-lg text-boston_blue font-bold line-clamp-1">
                                    <span className="line-through text-gray-400 font-normal text-xs">
                                        {selectedVariant?.original_price > 0 ? selectedVariant?.original_price?.toLocaleString('de-DE') + 'đ̲ ' : ''}
                                    </span>
                                    {selectedVariant?.price?.toLocaleString('de-DE')}đ̲
                                </div>
                            </div>
                        }
                    </div>

                    <div className='flex gap-4'>
                        <InputNumber
                            postfix={selectedVariant?.stock_limit ? '/' + selectedVariant?.stock : ''}
                            max={selectedVariant?.stock_limit ? selectedVariant.stock : undefined}
                            value={number}
                            onChange={(value) => setNumber(Math.ceil(value))}
                            min={1}
                            disabled={selectedVariant.index < 2}
                        />
                        <div className="cursor-pointer px-3 py-2 bg-sapphire rounded-md justify-center items-center flex p-btn gap-2 shadow-full min-w-fit">
                            <IoCartOutline className="text-white" />
                            <div className="text-white text-sm font-normal capitalize leading-normal whitespace-nowrap">Add to cart</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
