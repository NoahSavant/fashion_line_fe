import { Table, Checkbox, Input, InputGroup } from 'rsuite';
import React, { useState } from 'react';

import {
    BaseCell,
    ActionCell,
    ImageCell,
    CheckCell,
    ConstantCell,
    DateTimeCell,
    DiscountValueCell
} from './TableCell';
import { SearchIcon } from '@/components/icons';
import Toolbar from './Toolbar';
import { DiscountStatus, DiscountCondition, DiscountSubject } from '@/constants';

const { Column, HeaderCell } = Table;

const TableDiscount = ({ items, dataLoading, handleSort, checkedKeys, setCheckedKeys, onEdit, onDelete, onMultyDelete }) => {
    const [sortColumn, setSortColumn] = useState();
    const [sortType, setSortType] = useState();
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');

    let checked = false;
    let indeterminate = false;

    const handleSortColumn = (sortColumn, sortType) => {
        handleSort({ column: sortColumn, order: sortType });
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSortColumn(sortColumn);
            setSortType(sortType);
        }, 500);
    };

    const handleSearch = () => {
        handleSort({ search: search });
    }

    if (checkedKeys?.length === items?.length) {
        checked = true;
    } else if (checkedKeys?.length === 0) {
        checked = false;
    } else if (checkedKeys?.length > 0 && checkedKeys?.length < items?.length) {
        indeterminate = true;
    }

    const handleCheckAll = (value, checked) => {
        const keys = checked ? items.map(item => item) : [];
        setCheckedKeys(keys);
    };

    const handleCheck = (value, checked) => {
        const keys = checked ? [...checkedKeys, value] : checkedKeys.filter(item => item !== value);
        setCheckedKeys(keys);
    };

    const rowClick = (rowData) => {
        if (checkedKeys.length == 1 && checkedKeys.includes(rowData)) {
            setCheckedKeys([]);
            return;
        }
        setCheckedKeys([rowData]);
    }

    return (
        <div className='flex flex-col gap-2 w-full'>
            <div className='flex justify-between md:items-center items-start'>
                <div className='flex gap-2 items-center md:flex-row flex-col'>
                    <div className='text-lg font-semibold px-2'>Discounts</div>
                    <Toolbar checkedKeys={checkedKeys} deleteClick={onMultyDelete} />
                </div>
                <InputGroup className='ml-4 max-w-[300px]'>
                    <Input value={search} onChange={setSearch} />
                    <InputGroup.Addon className='hover:bg-blue-500 hover:text-white hover:cursor-pointer' onClick={handleSearch}>
                        <SearchIcon />
                    </InputGroup.Addon>
                </InputGroup>
            </div>
            <Table
                data={items}
                loading={(loading || dataLoading)}
                hover={true}
                bordered
                sortColumn={sortColumn}
                sortType={sortType}
                onSortColumn={handleSortColumn}
                onRowClick={rowClick}
                height={300}
                maxButtons={3}
            >
                <Column width={40} align="center">
                    <HeaderCell style={{ padding: 0 }}>
                        <div style={{ lineHeight: '40px' }}>
                            <Checkbox
                                inline
                                checked={checked}
                                indeterminate={indeterminate}
                                onChange={handleCheckAll}
                            />
                        </div>
                    </HeaderCell>
                    <CheckCell dataKey="id" checkedKeys={checkedKeys} onChange={handleCheck} />
                </Column>
                <Column width={420} fullText sortable>
                    <HeaderCell>Name</HeaderCell>
                    <BaseCell dataKey='name' />
                </Column>

                <Column width={150}>
                    <HeaderCell className='text-center'>Image</HeaderCell>
                    <ImageCell dataKey={["image_url"]} className='h-[36px] w-[48px]' />
                </Column>
                <Column width={120}>
                    <HeaderCell className='text-center'>Status</HeaderCell>
                    <ConstantCell dataKey="status" constant={DiscountStatus} colors={['green', 'red']} />
                </Column>
                <Column width={120}>
                    <HeaderCell className='text-center'>Condition</HeaderCell>
                    <ConstantCell dataKey="condition" constant={DiscountCondition} colors={['gray', 'yellow']} />
                </Column>
                <Column width={120}>
                    <HeaderCell className='text-center'>Subject</HeaderCell>
                    <ConstantCell dataKey="subject" constant={DiscountSubject} colors={['gray', 'blue']} />
                </Column>
                <Column width={180}>
                    <HeaderCell className='text-center'>Value</HeaderCell>
                    <DiscountValueCell dataKey="value" condition='condition' />
                </Column>
                <Column width={150}>
                    <HeaderCell className='text-center'>Ended at</HeaderCell>
                    <DateTimeCell dataKey="ended_at" />
                </Column>
                <Column width={90}>
                    <HeaderCell className='text-center'>Action</HeaderCell>
                    <ActionCell onEdit={onEdit} onDelete={onDelete} />
                </Column>
            </Table>
        </div>
    );
}
export default TableDiscount
