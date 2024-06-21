import React from 'react';

const Loading = () => {
    return (
        <div className='loading w-full h-full absolute top-0 left-0 z-10 bg-black bg-opacity-50 flex justify-center items-center'>
            <div className='spin-loader'></div>
        </div>
    )
};

export default Loading;
