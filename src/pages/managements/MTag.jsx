import React, { useState, useEffect, useContext } from 'react';
import PaginationDefault from '@/constants/PaginationDefault';
import { Input, Modal, Button } from "rsuite";
import { TableTag, BasePagination } from './components';
import { tagEndpoints } from '@/apis'
import { useApi } from '@/hooks';
import { ColorPicker } from '@/components/selects'
import { Loading } from '@/components';
import { PopupConfirmContext } from '@/contexts/PopupConfirmContext';
import { getIds } from '@/helpers/dataHelpers';


const MTag = () => {
    const {
        openConfirmation,
    } = useContext(PopupConfirmContext);

    const [editData, setEditData] = useState(null);

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
    const { data: editTagData, callApi: handleEditTag, loading: editTagLoading } = useApi();

    useEffect(() => {
        setFetchTag(true);
    }, [deleteTagsData, editTagData]);

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
        const message = rowData ? 'Are you sure to delete ' + checkedKeys.length + ' tag(s) ?' : 'Are you sure to delete this tag ?';
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
    };

    const confirmEditTags = () => {
        openConfirmation(editTags, [editData], 'Are you sure to update this tag ?');
    }

    const editTags = async (tagDataEdit) => {
        await handleEditTag(
            tagEndpoints.update + tagDataEdit.id,
            {
                method: 'PUT',
                data: { ...tagDataEdit }
            }
        );
    };

    return (
        <div className='p-5 flex flex-col gap-4'>
            <Modal size='sm' open={editData} onClose={() => setEditData(null)}>
                <Modal.Header>
                    <Modal.Title>Update tag</Modal.Title>
                </Modal.Header>
                <Modal.Body className='!overflow-visible'>
                    <div className='flex flex-col gap-4 items-end'>
                        <div className='flex flex-col gap-1.5 w-full'>
                            <label>Name</label>
                            <Input
                                placeholder="Name"
                                value={editData?.name}
                                onChange={(value) => setEditData({ ...editData, name: value })}
                            />
                        </div>
                        <div className='flex flex-col gap-1.5 w-full'>
                            <label>Color</label>
                            <ColorPicker color={editData?.color} setColor={(value) => setEditData({ ...editData, color: value })} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="pt-2">
                    <Button onClick={() => setEditData(null)} appearance="subtle">
                        Cancel
                    </Button>
                    <Button onClick={confirmEditTags} appearance="primary">
                        {editTagLoading && <Loading size={20} />}
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className='rounded-md shadow-md bg-white py-2'>
                <div className='text-lg font-semibold px-2 text-sapphire'>Tag management</div>
            </div>
            <div className='flex gap-5 lg:flex-row flex-col'>
                <div className='md:min-w-[620px] md:h-[420px] md:p-4 p-2 rounded-md shadow-md bg-white'>
                    <TableTag items={tagData?.items} dataLoading={(tagLoading || deleteTagsLoading)} handleSort={handlePagination} checkedKeys={checkedKeys} setCheckedKeys={setCheckedKeys} onDelete={confirmDeleteTags} onMultyDelete={() => confirmDeleteTags(null)} onEdit={setEditData} />
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
