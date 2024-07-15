import React, { useState, useEffect } from 'react';
import { SelectPicker } from 'rsuite';
import { useApi } from '@/hooks';
import discountEndpoints from '@/apis/enpoints/discount';

const SelectedDiscount = ({ onChange, subject, className = '' }) => {
    const { data: discountData, loading: discountLoading, callApi: handleGetDiscount } = useApi();
    const [id, setId] = useState(null);
    const [selectedDiscount, setSelectedDiscount] = useState(null);

    

    const findBestDiscount = (discountData) => {
        if (!discountData || discountData.length === 0) return null;

        let bestDiscount = null;
        let nearestEndAt = Infinity; // Giá trị end_at gần nhất

        for (let i = 0; i < discountData.length; i++) {
            const currentDiscount = discountData[i];

            // So sánh end_at để tìm discount có end_at gần nhất
            const currentEndAt = new Date(currentDiscount.ended_at).getTime();
            if (currentEndAt < nearestEndAt) {
                nearestEndAt = currentEndAt;
                bestDiscount = currentDiscount;
            }
        }

        return bestDiscount;
    };

    useEffect(() => {
        handleGetDiscount(discountEndpoints.get, {
            params: {
                all: true,
                subject
            }
        });
    }, []);

    useEffect(() => {
        if (!discountData || discountData.length === 0) return;

        const defaultDiscount = findBestDiscount(discountData);
        if (defaultDiscount) {
            setId(defaultDiscount.id);
            setSelectedDiscount(defaultDiscount);
            onChange(defaultDiscount);
        }
    }, [discountData]);

    const handleChange = (value) => {
        const selected = discountData.find(item => item.id === value);
        setId(value);
        setSelectedDiscount(selected);
        onChange(selected);
    };

    const data = discountData?.map(item => ({
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
                loading={discountLoading}
            />
        </div>
    );
};

export default SelectedDiscount;
