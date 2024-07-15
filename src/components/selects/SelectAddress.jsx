import React, { useState, useEffect } from 'react';
import { SelectPicker } from 'rsuite';
import { useApi } from '@/hooks';
import addressEndpoints from '@/apis/enpoints/address';

const SelectedAddress = ({ onChange, className = '' }) => {
    const { data: addressData, loading: addressLoading, callApi: handleGetAddress } = useApi();
    const [id, setId] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);

    useEffect(() => {
        handleGetAddress(addressEndpoints.get, {
            params: {
                all: true
            }
        });
    }, []);

    useEffect(() => {
        if (!addressData || addressData.length === 0) return;

        const defaultAddress = addressData.find(item => item.default == 1);
        if (defaultAddress) {
            setId(defaultAddress.id);
            setSelectedAddress(defaultAddress);
            onChange(defaultAddress);
        }
    }, [addressData]);

    const handleChange = (value) => {
        const selected = addressData.find(item => item.id === value);
        setId(value);
        setSelectedAddress(selected);
        onChange(selected);
    };

    const data = addressData?.map(item => ({
        label: item.name,
        value: item.id
    })) ?? [];

    return (
        <div className={`${className} flex flex-col gap-5`}>
            <SelectPicker
                className={`w-full h-full`}
                data={data}
                value={id}
                onChange={handleChange}
                loading={addressLoading}
            />

            {selectedAddress && (
                <div className='px-5 py-2 rounded-md border border-gray-400'>
                    <p>{selectedAddress.content}</p>
                    <p>{selectedAddress.detail}</p>
                </div>
            )}
        </div>
    );
};

export default SelectedAddress;
