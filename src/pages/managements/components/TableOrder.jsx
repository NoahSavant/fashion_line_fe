import { Table, Checkbox, Input, InputGroup } from 'rsuite';
import React, { useState } from 'react';

import { UserStatus, OrderPaymentMethod, OrderStatus } from '@/constants';
import {
    BaseCell,
    ConstantCell,
    ActionCell,
    CheckCell,
    ImageCell,
    DateTimeCell,
    UserCell,
    DiscountValueCell
} from './TableCell';
import { SearchIcon } from '@/components/icons';
import Toolbar from './Toolbar';

const { Column, HeaderCell } = Table;

const TableOrder = ({ items, dataLoading, handleSort, checkedKeys, setCheckedKeys, onEdit, onDelete, onCreate, onMultyDelete, onSelect, height = 400 }) => {
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
                    <div className='text-lg font-semibold px-2'>Orders</div>
                    <Toolbar checkedKeys={checkedKeys} deleteClick={onMultyDelete} addClick={onCreate} />
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
                height={height}
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
                <Column width={280} fullText sortable>
                    <HeaderCell>User</HeaderCell>
                    <UserCell dataKeys={['user', 'username']} images={['user','image_url']}/>
                </Column>
                <Column width={140} fullText sortable>
                    <HeaderCell>Code</HeaderCell>
                    <BaseCell dataKey='code' />
                </Column>
                <Column width={180}>
                    <HeaderCell className='text-center'>Total Price</HeaderCell>
                    <DiscountValueCell dataKey="total_price" condition={false} />
                </Column>
                <Column width={180}>
                    <HeaderCell className='text-center'>Paid</HeaderCell>
                    <DiscountValueCell dataKey="paid" condition={false} />
                </Column>
                <Column width={150} sortable>
                    <HeaderCell className='text-center'>Status</HeaderCell>
                    <ConstantCell dataKey="status" constant={OrderStatus} colors={['yellow', 'green', 'red']} />
                </Column>
                <Column width={150} sortable>
                    <HeaderCell className='text-center'>Payment Method</HeaderCell>
                    <ConstantCell dataKey="payment_method" constant={OrderPaymentMethod} colors={['blue', 'pink']} />
                </Column>
                <Column width={250} fullText sortable>
                    <HeaderCell>Ended At</HeaderCell>
                    <DateTimeCell dataKey='ended_at' />
                </Column>
                <Column width={90} fixed="right">
                    <HeaderCell>Action</HeaderCell>
                    <ActionCell onEdit={onEdit} onDelete={onDelete} onSelect={onSelect} />
                </Column>
            </Table>
        </div>
    );
}
export default TableOrder;
