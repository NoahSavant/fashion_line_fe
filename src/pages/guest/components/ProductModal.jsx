import React, { useEffect, useState } from 'react';
import { Modal, Carousel, InputNumber } from 'rsuite';
import { useApi } from '@/hooks';
import { variantEndpoints } from '@/apis';
import { IoCartOutline } from '@/components/icons.js';
import { useNavigate } from 'react-router-dom';
import Loading from '@/components/Loading';
import { convertStringToArray } from '../../../helpers/dataHelpers';

const ProductModal = ({ show, onClose, product }) => {
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
        if (show) {
            handleGetVariants(variantEndpoints.get + '/' + product.id, {
                params: {
                    all: true
                }
            });
        }
    }, [show]);

    useEffect(() => {
        if (variantsData) {
            const sizesMap = {};
            const colorsMap = {
                'first': {
                    'color': 'first',
                    'sizes': [],
                    'image_url': product.first_image_url
                },
                'second': {
                    'color': 'second',
                    'sizes': [],
                    'image_url': product.second_image_url
                }
            };
            const newVariants = [
                {
                    index: 0,
                    product_color: {
                        image_url: product.first_image_url,
                    },
                    product_size: {}
                },
                {
                    index: 1,
                    product_color: {
                        image_url: product.second_image_url,
                    },
                    product_size: {}
                }
            ];

            variantsData.forEach((variant, index) => {
                newVariants.push({ ...variant, index: index + 2});

                // Update sizes
                if (!sizesMap[variant.product_size.size]) {
                    sizesMap[variant.product_size.size] = { size: variant.product_size.size, colors: [] };
                }

                if (!sizesMap[variant.product_size.size].colors.includes(variant.product_color.color)) {
                    sizesMap[variant.product_size.size].colors.push(variant.product_color.color);
                }

                // Update colors
                if (!colorsMap[variant.product_color.color]) {
                    colorsMap[variant.product_color.color] = { color: variant.product_color.color, sizes: [], image_url: variant.product_color.image_url };
                }

                if (!colorsMap[variant.product_color.color].sizes.includes(variant.product_size.size)) {
                    colorsMap[variant.product_color.color].sizes.push(variant.product_size.size);
                }
            });

            setSizes(Object.values(sizesMap));
            setColors(Object.values(colorsMap));
            setVariants(newVariants);
            setSelectedVariant(newVariants[2]);
        }
    }, [variantsData]);

    useEffect(() => {
        if (selectedSize) {
            if (selectedColor) {
                if (selectedColor.sizes.includes(selectedSize.size)) {
                    const temp = variants.find(variant => (variant.product_size.size == selectedSize.size && variant.product_color.color == selectedColor.color));
                    if (temp) {
                        setSelectedVariant(temp);
                    }
                } else {
                    setSelectedColor(colors.find(color => color.color == selectedSize.colors[0]));
                }
            } else {
                setSelectedColor(colors.find(color => color.color == selectedSize.colors[0]));
            }
        }
    }, [selectedSize]);

    useEffect(() => {
        if (selectedColor) {
            if(selectedColor.sizes.length == 0) {
                setSelectedVariant(null);
                setSelectedSize(null);
                return;
            }
            if (selectedSize) {
                if (selectedSize.colors.includes(selectedColor.color)) {
                    const temp = variants.find(variant => (variant.product_size.size == selectedSize.size && variant.product_color.color == selectedColor.color));
                    if (temp) {
                        setSelectedVariant(temp);
                    }
                } else {
                    setSelectedSize(sizes.find(size => size.size == selectedColor.sizes[0]));
                }
            } else {
                setSelectedSize(sizes.find(size => size.size == selectedColor.sizes[0]))
            }
        }
    }, [selectedColor]);

    useEffect(() => {
        if (selectedVariant) {
            const matchingSize = sizes.find(size => selectedVariant.product_size.size == size.size) ?? null;
            setSelectedSize(matchingSize);

            const matchingColor = colors.find(color => color.color == selectedVariant.product_color.color) ?? null;
            setSelectedColor(matchingColor);

            setNumber(1);
        }
    }, [selectedVariant]);

    return (
        <Modal open={show} onClose={onClose} size="lg">
            <Modal.Header>
                
            </Modal.Header>
            <Modal.Body>
                { variantsLoading && <Loading/>}
                <div className="flex gap-5">
                    <div className="flex-1 flex flex-col gap-2">
                        <Carousel className="custom-slider" shape='bar' activeIndex={colors.indexOf(selectedColor)} onSelect={(index) => setSelectedColor(colors[index])}>
                            {colors.map((color, index) => (
                                <img
                                    key={index}
                                    src={color?.image_url}
                                    alt="Product Variant"
                                    className="w-full object-contain bg-white"
                                />
                            ))}
                        </Carousel>
                        <div className="flex justify-center gap-2">
                            {colors.map((color, index) => (
                                <div key={index} className={`w-14 h-14 p-1 cursor-pointer border object-contain ${(selectedColor?.color == color.color) ? 'border-black' : 'border-transparent'}`}>
                                    <img
                                        src={color?.image_url}
                                        alt="Product Variant Thumbnail"
                                        className={`w-full h-full cursor-pointer border object-contain`}
                                        onClick={() => setSelectedColor(color)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                        <div className='flex flex-col gap-2'>
                            <h3 className="text-xl font-bold text-sapphire">{product.name}</h3>
                            <div>
                                <strong className="">Description:</strong>
                                <div className="text-base text-black font-medium line-clamp-4">{product.description}</div>
                            </div>
                            <div>
                                <strong className="">Tags:</strong>
                                <div className="flex items-center gap-2 py-2">
                                    {product.tags.map((tag, index) => (
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
                                        <div key={index} className={`border-2 ${selectedSize?.size === size.size ? 'border-sapphire text-white bg-sapphire' : selectedColor?.sizes.includes(size.size) ? 'border-sapphire text-sapphire bg-white' : 'border-gray-400 text-gray-400 '}  rounded-md py-1 px-2 min-w-8 flex justify-center items-center cursor-pointer`} onClick={() => setSelectedSize(size)}>
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
                                        color.sizes?.length > 0 ? (
                                            <div
                                                key={index}
                                                className={`border-2 ${selectedColor?.color === color.color ? 'border-sapphire text-white bg-sapphire' : selectedSize?.colors.includes(color.color) ? 'border-sapphire text-sapphire bg-white' : 'border-gray-400 text-gray-400'} rounded-md py-1 px-2 min-w-8 flex justify-center items-center cursor-pointer`}
                                                onClick={() => setSelectedColor(color)}
                                            >
                                                <div className='text-base font-medium'>
                                                    {color.color}
                                                </div>
                                            </div>
                                        ) : null
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
                        
                        <div className='flex gap-4 pt-5'>
                            <InputNumber
                                postfix={selectedVariant?.stock_limit ? '/' + selectedVariant?.stock : ''}
                                max={selectedVariant?.stock_limit ? selectedVariant.stock : undefined}
                                value={number}
                                onChange={(value) => setNumber(Math.ceil(value))}
                                min={1}
                                disabled={selectedVariant?.index < 2}
                            />
                            <div className="cursor-pointer px-3 py-2 bg-sapphire rounded-md justify-center items-center flex p-btn gap-2 shadow-full min-w-fit">
                                <IoCartOutline className="text-white" />
                                <div className="text-white text-sm font-normal capitalize leading-normal whitespace-nowrap">Add to cart</div>
                            </div>
                            <div onClick={() => navigate(`/product-detail?id=${product.id}`)}  className="cursor-pointer px-3 py-2 text-sapphire hover:text-white  bg-white hover:bg-sapphire rounded-md justify-center items-center flex gap-2 shadow-full border-2 border-sapphire min-w-fit">
                                <div className="text-sm font-normal capitalize leading-normal whitespace-nowrap">Product Detail</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ProductModal;
