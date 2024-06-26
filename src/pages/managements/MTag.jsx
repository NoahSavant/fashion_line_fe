import React, { useState, useEffect, useContext } from 'react';
import { getConstantData } from '@/helpers/constantHelpers';
import PaginationDefault from '@/constants/PaginationDefault';
import { useNavigate } from 'react-router-dom';
import { InputNumber, Input } from "rsuite";
import {
    FunnelIcon
} from '@/components/icons.js';
import { TableTag, Toolbar, BasePagination } from './components';
import { productEndpoints, tagEndpoints } from '@/apis'
import { useConfirmation, useApi } from '@/hooks';
import { ProductStatus } from '@/constants';
import { ColorPicker, SelectCategory, SingleSelect } from '@/components/selects'
import { Loading } from '@/components';
import { PopupConfirmContext } from '@/contexts/PopupConfirmContext';
import { getIds } from '@/helpers/dataHelpers';


const MTag = () => {
    const {
        isConfirmationOpen,
        openConfirmation,
        handleConfirm,
        handleCancel,
        confirmType,
        confirmData,
        confirmValue,
        setConfirmValue,
        message
    } = useContext(PopupConfirmContext);

    const navigate = useNavigate();
    const [pagination, setPagination] = useState({
        page: PaginationDefault.PAGE,
        limit: PaginationDefault.LIMIT,
        order: PaginationDefault.ORDER,
        column: PaginationDefault.COLUMN,
        search: PaginationDefault.SEARCH
    });
    const [checkedKeys, setCheckedKeys] = useState([]);
    const handlePagination = (data) => {
        setPagination({
            ...pagination,
            ...data
        })
        setFetchTag(true);
    };

    const [tag, setTag] = useState({
        name: '',
        color: '#ffffff'
    })

    const [fetchTag, setFetchTag] = useState(true);
    const { data: tagData, callApi: handleGetTag, loading: tagLoading } = useApi();
    const { data: createTagData, callApi: handleCreateTag, loading: createTagLoading } = useApi();
    const { data: deleteTagsData, callApi: handleDeleteTags, loading: deleteTagsLoading } = useApi();

    useEffect(() => {
        if (!fetchTag) return;
        handleGetTag(tagEndpoints.get, {
            params: {
                ...pagination,
            }
        });
        setFetchTag(false);
        setCheckedKeys([]);
    }, [fetchTag]);

    useEffect(() => {
        if (!createTagData) return;
        setTag({...tag, name: ''})
        setFetchTag(true);
    }, [createTagData]);

    const createTag = () => {
        handleCreateTag(tagEndpoints.create, {
            method: "POST",
            data: {
                ...tag
            }
        })
    }

    const confirmDeleteTags = (rowData=null) => {
        const tagIds = rowData ? [[rowData.id]] : [getIds(checkedKeys)];
        const message = rowData ? 'Are you sure to delete this tag ?' : 'Are you sure to delete ' + checkedKeys.length + ' tag(s) ?';
        openConfirmation(deleteTags, tagIds, message);
    }

    const deleteTags = async (ids) => {
        await handleDeleteTags(
            tagEndpoints.delete,
            {
                method: 'DELETE',
                data: { ids }
            }
        );

        setFetchTag(true);
    };

    return (
        <div className='p-5 flex flex-col gap-4'>
            <div className='rounded-md shadow-md bg-white py-2'>
                <div className='text-lg font-semibold px-2 text-sapphire'>Tag management</div>
            </div>
            <div className='py-2 flex gap-5 lg:flex-row flex-col'>
                <div className='md:min-w-[620px] md:h-[420px] md:p-4 p-2 rounded-md shadow-md bg-white'>
                    <TableTag items={tagData?.items} dataLoading={(tagLoading)} handleSort={handlePagination} checkedKeys={checkedKeys} setCheckedKeys={setCheckedKeys} onDelete={confirmDeleteTags} onEdit={() => { }} />
                    <BasePagination pagination={tagData?.pagination} handlePagination={handlePagination} className='flex md:flex-row flex-col md:gap-0 gap-3'/>
                </div>
                <div className='flex flex-col gap-2 p-4 rounded-md shadow-md bg-white w-full'>
                    <div className='text-lg font-semibold px-2'>Create Tag</div>
                    <div className='flex flex-col gap-4 items-end'>
                        <div className='flex flex-col gap-1.5 w-full'>
                            <label>Name</label>
                            <Input
                                placeholder="Name"
                                value={tag.name}
                                onChange={(value) => setTag({ ...tag, name: value })}
                            />
                        </div>
                        <div className='flex flex-col gap-1.5 w-full'>
                            <label>Color</label>
                            <ColorPicker color={tag.color} setColor={(value) => setTag({ ...tag, color: value })} />
                        </div>
                        <div className="cursor-pointer px-3 py-2 bg-sapphire rounded-md justify-center items-center flex p-btn gap-2 shadow-ful w-fit" onClick={createTag}>
                            {createTagLoading && <Loading size={20}/>}
                            <div className="text-white text-sm font-normal capitalize leading-normal">Create</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MTag;
