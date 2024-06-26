import React from 'react';
import { useApi } from '@/hooks';
import { useState, useEffect } from 'react';
import { categoryEndpoints } from '@/apis'
import { Loading } from '@/components';

const Categories = () => {
    const { data: categories, callApi: handleGetCategories, loading: categoriesLoading } = useApi();

    useEffect(() => {
        handleGetCategories(categoryEndpoints.get, {
            params: {
                all: true
            } 
        });
    }, []);

    return (
        <div className="custom-padding flex flex-col gap-10 items-center">
            {categoriesLoading && 
                <Loading/>
            }
            <div className="flex flex-col gap-2 items-center">
                <div className="text-sapphire lg:text-5xl md:text-4xl text-3xl font-semibold  leading-[1] text-center">Various genres for you</div>
            </div>
            <div className=" flex flex-wrap lg:gap-12 md:gap-6 gap-5 relative justify-center custom-box w-full">
                {categories?.map((category, index) => (
                    <div key={index} className="flex flex-col w-full justify-center items-center group cursor-pointer animation-iv fade-in lg:max-w-72 lg:w-[calc(25%-36px)] md:w-[calc(33.33%-16px)]">
                        <div className="h-[300px] w-full overflow-hidden rounded-b-3xl relative">
                            <img className="w-full h-full object-cover group-hover:scale-125 transform transition-transform duration-500 ease-in-out shadow-full" src={category.image_url} />
                        </div>
                        <div className="capitalize w-full text-base font-medium text-center bg-white group-hover:bg-sapphire text-sapphire group-hover:text-white px-4 py-2 border-2 border-sapphire rounded-t-3xl transform transition-all duration-500 ease-in-out shadow-full">
                            {category.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Categories;
