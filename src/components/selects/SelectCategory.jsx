import { CheckPicker, SelectPicker, CheckboxGroup, Checkbox, RadioGroup, Radio } from "rsuite";
import React from 'react';
import { useState, useEffect } from "react";
import { useApi } from '@/hooks'
import categoryEndpoints from "@/apis/enpoints/category";

const SelectCategory = ({ single=false, select=true, value, setValue, readOnly=false, className='' }) => {
    const { data: categoryData, loading: categoryLoading, callApi: handleGetCategory } = useApi();

    useEffect(() => {
        handleGetCategory(categoryEndpoints.get, {
            params: {
                all: true
            }
        });
    }, []);

    const data = select ? categoryData?.map(item => ({
        label: item.name,
        value: item.id
    })) ?? [] : categoryData ?? [];

    return (
        <>
            {select ? (
                single ? (
                    <SelectPicker
                        className={`w-full h-full ${className}`}
                        data={data}
                        value={value}
                        onChange={setValue}
                        loading={categoryLoading}
                        readOnly={readOnly}
                    />
                ) : (
                    <CheckPicker
                        className={`w-full h-full ${className}`}
                        data={data}
                        value={value}
                        onChange={setValue}
                        loading={categoryLoading}
                        readOnly={readOnly}
                    />
                )
            ) : (
                single ? (
                        <RadioGroup name="radio-group-controlled" value={value} onChange={setValue} className={`grid grid-cols-2 ${className}`} loading={categoryLoading}>
                        {data.map((item) => (
                            <Radio key={item.id} value={item.name}>
                                {item.name}
                            </Radio>
                        ))}
                    </RadioGroup>
                ) : (
                    <CheckboxGroup
                        name="checkbox-group"
                        value={filter.collections}
                        onChange={(value) => setFilter({ ...filter, collections: value })}
                        className={`grid grid-cols-2 ${className}`}
                        loading={categoryLoading}
                    >
                        {data.map((item) => (
                            <Checkbox key={item.id} value={item.name}>
                                {item.name}
                            </Checkbox>
                        ))}
                    </CheckboxGroup>
                )
            )}
        </>
    );
}
export default SelectCategory
