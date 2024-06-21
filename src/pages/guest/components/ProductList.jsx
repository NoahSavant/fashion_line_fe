import React from 'react';
import SingleProduct from './SingleProduct';
import { Pagination } from "rsuite";

import {
    FaArrowLeftLong
} from '@/components/icons.js';

const ProductList = ({ products, pagination }) => (
    <div className="custom-padding flex flex-col gap-10 items-center">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-7 md:gap-6 gap-5 custom-box">
            {products.map((product, index) => (
                <SingleProduct
                    product={product}
                    key={index}
                />
            ))}
        </div>
        <div>
            <Pagination
                prev
                last
                next
                first
                size="sm"
                total={100}
                limit={10}
                activePage={activePage}
                onChangePage={setActivePage}
            />
        </div>
    </div>
);

export default ProductList;
