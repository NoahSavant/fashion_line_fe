import { CheckPicker, SelectPicker, CheckboxGroup, Checkbox, RadioGroup, Radio } from "rsuite";
import React from 'react';
import { useState, useEffect } from "react";
import { useApi } from '@/hooks'
import collectionEndpoints from "@/apis/enpoints/collection";

const SelectCollection = ({ single=false, select=true, value, setValue, readOnly=false, className='' }) => {
    const { data: collectionData, loading: collectionLoading, callApi: handleGetCollection } = useApi();

    useEffect(() => {
        handleGetCollection(collectionEndpoints.get, {
            params: {
                all: true
            }
        });
    }, []);

    const data = select ? collectionData?.map(item => ({
        label: item.name,
        value: item.id
    })) ?? [] : collectionData ?? [];

    return (
        <>
            {select ? (
                single ? (
                    <SelectPicker
                        className={`w-full h-full ${className}`}
                        data={data}
                        value={value}
                        onChange={setValue}
                        loading={collectionLoading}
                        readOnly={readOnly}
                    />
                ) : (
                    <CheckPicker
                        className={`w-full h-full ${className}`}
                        data={data}
                        value={value}
                        onChange={setValue}
                        loading={collectionLoading}
                        readOnly={readOnly}
                    />
                )
            ) : (
                single ? (
                        <RadioGroup name="radio-group-controlled" value={value} onChange={setValue} className={`grid grid-cols-2 ${className}`} loading={collectionLoading}>
                        {data.map((item) => (
                            <Radio key={item.id} value={item.id}>
                                {item.name}
                            </Radio>
                        ))}
                    </RadioGroup>
                ) : (
                    <CheckboxGroup
                        name="checkbox-group"
                        value={value}
                        onChange={setValue}
                        className={`grid grid-cols-2 ${className}`}
                        loading={collectionLoading}
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
}
export default SelectCollection
