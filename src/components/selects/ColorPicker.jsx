import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import { Button } from 'rsuite';

const ColorPicker = ({ color, setColor }) => {
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const [tempColor, setTempColor] = useState(color);

    const handleColorChange = (color) => {
        setTempColor(color.hex);
    };

    const handleConfirm = () => {
        setColor(tempColor);
        setDisplayColorPicker(false);
    };

    const handleCancel = () => {
        setTempColor(color);
        setDisplayColorPicker(false);
    };

    return (
        <div className="relative">
            <div className="flex items-center gap-3 border border-gray-200 rounded-md py-1 px-2 justify-between">
                <span className="font-semibold">{color ?? '#ffffff'}</span>
                <div className='border border-black p-0.5 rounded-md relative'>
                    {displayColorPicker && (
                        <div className="absolute z-10 top-2 -right-[calc(100%-50px)]">
                            <div className="bg-white p-2 rounded-md shadow-lg flex flex-col gap-2 border border-gray-300">
                                <div className="flex items-center justify-between">
                                    <Button className='shadow-md' appearance="primary" onClick={handleConfirm}>Confirm</Button>
                                    <Button appearance="subtle" onClick={handleCancel}>Cancel</Button>
                                </div>
                                <SketchPicker
                                    color={tempColor ?? '#000000'}
                                    onChangeComplete={handleColorChange}
                                />
                            </div>
                        </div>
                    )}
                    <div
                        className="w-8 h-[20.4px] rounded-md shadow-md  cursor-pointer"
                        style={{ backgroundColor: color }}
                        onClick={() => setDisplayColorPicker(true)}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default ColorPicker;
