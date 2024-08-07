import { 
    Table, 
    Button,
    TagGroup,
    Tag,
    Checkbox,
    SelectPicker,
    Avatar,
    AvatarGroup,
    Whisper,
    Tooltip 
} from 'rsuite';
import React from 'react';

import { getDataTimeFormat } from '@/helpers/dateTimeHelpers';
import { getConstantTitle } from '@/helpers/constantHelpers';
import { TrashIcon, EditIcon, CameraRetroIcon, TbHandClick } from '@/components/icons';
import { useState } from 'react';
import { data } from 'browserslist';

const { Cell } = Table;

export const NameCell = ({ rowData, dataKey, dataKeyNote, ...props }) => {
    return (
        <Cell {...props}>
            <div className='flex flex-col justify-center w-full h-full'>
                <p className='text-base -mb-2 -mt-1'>{rowData[dataKey]}</p>
                <p className='text-xs text-gray-400'>{rowData[dataKeyNote]}</p>
            </div>
        </Cell>
    );
}

export const ColorCell = ({ rowData, dataKey, attributes = [], ...props }) => {
    let value = rowData[dataKey];

    attributes.forEach(element => {
        value = value[element]
    });

    return (
        <Cell {...props}>
            <div className='flex flex-col justify-center w-full h-full'>
                <div className={`w-7 h-5 rounded-md shadow-full`} style={{ backgroundColor: value }}></div>
            </div>
        </Cell>

    );
}

export const ImageCell = ({ rowData, dataKey, className = '', ...props }) => {
    return (
        <Cell {...props}>
            <div className='flex justify-center w-full h-full items-center space-x-2'>
                {dataKey.map((key, index) => {
                    let value;

                    if (Array.isArray(key)) {
                        value = key.reduce((acc, k) => (acc ? acc[k] : null), rowData);
                    } else {
                        value = rowData[key];
                    }

                    return (
                        <div key={index} className='flex justify-center items-center'>
                            {value ? (
                                <img 
                                    src={value} 
                                    alt="" 
                                    className={`rounded-md shadow-full object-cover ${className}`} 
                                />
                            ) : (
                                <CameraRetroIcon style={{ fontSize: 40 }} />
                            )}
                        </div>
                    );
                })}
            </div>
        </Cell>
    );
};

export const BaseCell = ({ rowData, dataKey, attributes=[], ...props }) => {
    let value = rowData[dataKey];

    attributes.forEach(element => {
        value = value[element]
    });

    return (
        <Cell {...props}>
            <div className='flex flex-col justify-center w-full h-full'>
                <p>{value}</p>
            </div>
        </Cell>

    );
}

export const DiscountValueCell = ({ rowData, dataKey, attributes = [], condition, ...props }) => {
    const toThousands = (value) => {
        return value ? `${value}`.replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&.') : value;
    }

    let value = rowData[dataKey];
    let currentCondition = typeof condition === 'string' ? rowData[condition] : condition;
    attributes.forEach(element => {
        value = value[element]
    });

    return (
        <Cell {...props}>
            <div className='flex flex-col justify-center w-full h-full items-center'>
                <p>{currentCondition ? value + '%' : toThousands(value) + 'đ̲'}</p>
            </div>
        </Cell>

    );
}

export const TagCell = ({ rowData, dataKey, data = null, ...props }) => {
    return (
        <Cell {...props}>
            <div className='flex flex-col justify-center w-full h-full'>
                <Tag key={rowData['id']} size="md">{rowData[dataKey]}</Tag>
            </div>
        </Cell>

    );
}

export const UsersCell = ({ rowData, dataKey, ...props }) => {
    const users = rowData[dataKey];

    if(!users) {
        return (
            <Cell {...props}>
                <div className='flex flex-col justify-center w-full h-full'>
                    
                </div>
            </Cell>
        );
    }

    const Users = users.map((user, index) => (
        <Tag key={index} size="md">{user}</Tag>
    ));

    return (
        <Cell {...props}>
            <div className='flex flex-col justify-center w-full h-full'>
                <TagGroup>
                    {Users}
                </TagGroup>
            </div>
        </Cell>

    );
}

export const ConstantCell = ({ rowData, dataKey, constant, colors, ...props }) => {
    return (
        <Cell {...props}>
            <div className='flex flex-col justify-center w-full h-full items-center'>
                <TagGroup>
                    <Tag color={colors[rowData[dataKey] ?? 0]} key={rowData['id']} size="md">{getConstantTitle(constant, rowData[dataKey])}</Tag>
                </TagGroup>
            </div>
        </Cell>

    );
}

export const SelectCell = ({ rowData, dataKey, handleChange, name, ...props }) => {
    const data = rowData[dataKey]?.map(item => ({
        label: item.name,
        value: item.id
    })) ?? [];

    const [open, setOpen] = useState(false);

    const handleSelectClick = (event) => {
        setOpen(!open);
        event.stopPropagation();
    };

    return (
        <Cell {...props}>
            <div className='flex flex-col justify-center w-full h-full'>
                <SelectPicker data={data} onChange={handleChange} onClick={handleSelectClick} open={open} placeholder={name + '(' + data.length + ')'} />

            </div>
        </Cell>

    );
}

export const DateTimeCell = ({ rowData, dataKey, ...props }) => {
    return (
        <Cell {...props}>
            <div className='flex flex-col justify-center w-full h-full'>
                <p>{getDataTimeFormat(rowData[dataKey])}</p>
            </div>
        </Cell>

    );
}

export const UserCell = ({ rowData, dataKeys, images, ...props }) => {
    let image = rowData;
    let name = rowData;

    images.forEach(element => {
        image = image[element];
    });

    dataKeys.forEach(element => {
        name = name[element];
    });

    return (
        <Cell {...props}>
            <div className="flex flex-row items-center gap-3 w-full h-full">
                <Avatar
                    size="sm"
                    circle
                    src={image}
                />
                <p className='text-base'>{name}</p>
            </div>
        </Cell>

    );
}

export const ImagesCell = ({ rowData, dataKeys, ...props }) => {
    let users = rowData;
    const max = 7;
    dataKeys.forEach(element => {
        users = users[element];
    });

    return (
        <Cell {...props}>
            <div className="flex flex-row items-center gap-3 w-full h-full">
                <AvatarGroup stack>
                    {users
                        .filter((user, i) => i < max)
                        .map(user => (
                            <Whisper key={user.id}
                                trigger="hover"
                                placement="topStart"
                                speaker={
                                    <Tooltip>{user.name}</Tooltip>
                                }
                            >
                                <Avatar size="sm" circle src={user.image_url} alt={user.name} />
                            </Whisper>
                        ))}
                    {
                        users.length - max > 0 &&
                        <Avatar circle size="sm" className='bg-black'>
                            +{users.length - max}
                        </Avatar>
                    }

                </AvatarGroup>
            </div>
            
        </Cell>

    );
}

export const ActionCell = ({ rowData, dataKey, onEdit, onDelete, onSelect, ...props }) => {
    return (
        <Cell {...props}>
            <div className='flex flex-row justify-center w-full h-full'>
                {
                    typeof onEdit === 'function' && 
                    <Button appearance="link" onClick={() => onEdit(rowData)} startIcon={<EditIcon />} className='hover:text-lg hover:text-blue-700'>
                    </Button>
                }
                {
                    typeof onDelete === 'function' &&
                    <Button appearance="link" onClick={() => onDelete(rowData)} startIcon={<TrashIcon />} className='hover:text-lg hover:text-red-600'>
                    </Button>
                }
                {
                    typeof onSelect === 'function' &&
                    <Button appearance="link" onClick={() => onSelect(rowData)} startIcon={<TbHandClick className='rs-icon' />} className='hover:text-lg hover:text-red-600'>
                    </Button>
                }
            </div>
        </Cell>
    );
}

export const CheckCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => (
    <Cell {...props} style={{ padding: 0 }}>
        <div style={{ lineHeight: '46px' }}>
            <Checkbox
                value={rowData}
                inline
                onChange={onChange}
                checked={checkedKeys.some(item => item.id === rowData[dataKey])}
            />
        </div>
    </Cell>
);

export const TagGroupCell = ({ rowData, dataKey, ...props }) => {
    const tags = rowData[dataKey];

    if (!tags || !Array.isArray(tags) || tags.length === 0) {
        return (
            <Cell {...props}>
                <div className='flex flex-col justify-center w-full h-full'>
                    
                </div>
            </Cell>
        );
    }

    return (
        <Cell {...props}>
            <div className='flex flex-col justify-center w-full h-full'>
                <TagGroup>
                    {tags.map((item, index) => (
                        <Tag key={item.id || index} size="md">
                            {item.id ? item.name : item}
                        </Tag>
                    ))}
                </TagGroup>
            </div>
        </Cell>
    );
};

