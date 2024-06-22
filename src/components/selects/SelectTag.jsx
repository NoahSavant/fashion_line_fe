import { CheckPicker, SelectPicker, CheckboxGroup, Checkbox, RadioGroup, Radio } from "rsuite";
import React from 'react';
import { useState, useEffect } from "react";
import { useApi } from '@/hooks'
import tagEndpoints from "@/apis/enpoints/tag";

const SelectTag = ({ single=false, select=true, value, setValue, readOnly=false, className='' }) => {
    const { data: tagData, loading: tagLoading, callApi: handleGetTag } = useApi();

    useEffect(() => {
        handleGetTag(tagEndpoints.get, {
            params: {
                all: true
            }
        });
    }, []);

    const data = select ? tagData?.map(item => ({
        label: item.name,
        value: item.id
    })) ?? [] : tagData ?? [];

    return (
        <>
            {select ? (
                single ? (
                    <SelectPicker
                        className={`w-full h-full ${className}`}
                        data={data}
                        value={value}
                        onChange={setValue}
                        loading={tagLoading}
                        readOnly={readOnly}
                    />
                ) : (
                    <CheckPicker
                        className={`w-full h-full ${className}`}
                        data={data}
                        value={value}
                        onChange={setValue}
                        loading={tagLoading}
                        readOnly={readOnly}
                    />
                )
            ) : (
                single ? (
                        <RadioGroup name="radio-group-controlled" value={value} onChange={setValue} className={`grid grid-cols-2 ${className}`} loading={tagLoading}>
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
                        loading={tagLoading}
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
export default SelectTag
