import React from 'react';

const Loading = ({ size = 40 }) => {
    const sizeWithUnit = `${size}px`;
    const borderSize = size / 8;

    return (
        <div className='loading w-full h-full absolute top-0 left-0 z-10 bg-white bg-opacity-60 flex justify-center items-center'>
            <div
                className='spin-loader'
                style={{
                    width: sizeWithUnit,
                    height: sizeWithUnit,
                    borderWidth: `${borderSize}px`,
                    borderTopWidth: `${borderSize}px`,
                }}
            ></div>
        </div>
    );
};

export default Loading;
