import { ButtonToolbar, Button } from 'rsuite';
import { useState } from 'react';

import { TrashIcon, TbStatusChange, PlusIcon } from '@/components/icons';

const Toolbar = ({ checkedKeys, addClick, deleteClick, changeStatusClick }) => {
    return (
        <>
            <ButtonToolbar className='pb-4'>
                <Button color="green" className='bg-green-600 p-btn' appearance="primary" startIcon={<PlusIcon />} onClick={addClick}>
                    New
                </Button>
                <Button disabled={!checkedKeys?.length} color="red" className='bg-red-600 p-btn' appearance="primary" startIcon={<TrashIcon />} onClick={deleteClick}>
                    Delete
                </Button>
                <Button disabled={!checkedKeys?.length} color="cyan" className='bg-cyan-500 p-btn' appearance="primary" startIcon={<TbStatusChange />} onClick={changeStatusClick}>
                    Change status
                </Button>
            </ButtonToolbar>
        </>
        
    );
}

export default Toolbar
