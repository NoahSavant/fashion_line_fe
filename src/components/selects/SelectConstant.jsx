import { CheckPicker, SelectPicker, CheckboxGroup, Checkbox, RadioGroup, Radio } from "rsuite";
import React from 'react';
import { getConstantData } from '@/helpers/constantHelpers';

const SelectConstant = ({ single = false, select = true, value, setValue, readOnly = false, className = '', constant }) => {
    const data = getConstantData(constant)?.map(item => ({
        label: item.label,
        value: item.value,
        id: item.value,
        name: item.label
    })) ?? [];

    const handleChange = (val) => {
        if (!readOnly) {
            setValue(val);
        }
    };

    return (
        <>
            {select ? (
                single ? (
                    <SelectPicker
                        className={`w-full h-full ${className}`}
                        data={data}
                        value={value}
                        onChange={handleChange}
                        readOnly={readOnly}
                    />
                ) : (
                    <CheckPicker
                        className={`w-full h-full ${className}`}
                        data={data}
                        value={Array.isArray(value) ? value : []}
                        onChange={handleChange}
                        readOnly={readOnly}
                    />
                )
            ) : (
                single ? (
                    <RadioGroup
                        name="radio-group-controlled"
                        value={value}
                        onChange={handleChange}
                        className={`grid grid-cols-2 ${className}`}
                    >
                        {data.map((item) => (
                            <Radio key={item.id} value={item.id}>
                                {item.name}
                            </Radio>
                        ))}
                    </RadioGroup>
                ) : (
                    <CheckboxGroup
                        name="checkbox-group"
                        value={Array.isArray(value) ? value : []}
                        onChange={handleChange}
                        className={`grid grid-cols-2 ${className}`}
                    >
                        {data.map((item) => (
                            <Checkbox key={item.id} value={item.id}>
                                {item.name}
                            </Checkbox>
                        ))}
                    </CheckboxGroup>
                )
            )}
        </>
    );
};

export default SelectConstant;
