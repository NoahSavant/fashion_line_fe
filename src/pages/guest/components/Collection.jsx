import React from 'react';
import SingleProduct from './SingleProduct';
import {
    FaArrowLeftLong
} from '@/components/icons.js';

const Banner = ({ collection }) => (
    <div className="h-full w-full overflow-hidden relative flex gap-0">
        <img className="w-full h-full md:max-h-none max-h-[300px] object-cover" src={collection.image} alt={collection.title} />
        <div className="z-10 absolute top-0 left-0 p-4 flex flex-col justify-center items-center w-full h-full gap-6">
            <div className="text-xl text-white font-semibold line-clamp-2 p-4 bg-black bg-opacity-60">{collection.title}</div>
            <a href={`/shop?collection=${collection.slug}`} className="cursor-pointer px-3 py-2 bg-white rounded-md justify-center items-center flex p-btn gap-2 min-w-24 shadow-full">
                <div className="text-sapphire text-sm font-medium capitalize leading-normal">Discover now</div>
                <FaArrowLeftLong className="text-sapphire rotate-180" />
            </a>
        </div>
    </div>
);

const Collection = ({ collection }) => (
    <div className="custom-padding flex flex-col gap-10 items-center">
        <div className="flex flex-col gap-2 items-center">
            <div className="text-sapphire lg:text-[48px] text-4xl font-semibold leading-[1] text-center">Best sellers</div>
            <div className="w-full h-1 bg-sapphire"></div>
        </div>
        <div className="md:hidden flex flex-col w-full justify-center items-center group cursor-pointer animation-iv fade-in overflow-hidden rounded-xl bg-white shadow-full">
            <Banner collection={collection} />
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-7 md:gap-6 gap-5 custom-box">
            <div className="md:flex hidden flex-col w-full justify-center items-center group cursor-pointer animation-iv fade-in overflow-hidden rounded-xl bg-white shadow-full">
                <Banner collection={collection} />
            </div>
            {collection.products.map((product, index) => (
                <SingleProduct
                    product={product}
                    key={index}
                />
            ))}
        </div>
    </div>
);

export default Collection;
