import { ButtonToolbar, Button } from 'rsuite';
import { useState } from 'react';

import { TrashIcon, TbStatusChange, PlusIcon } from '@/components/icons';

const Toolbar = ({ checkedKeys, addClick=null, deleteClick=null, changeStatusClick=null }) => {
    return (
        <>
            <ButtonToolbar className='p-2'>
                {addClick && 
                    <Button color="green" className='bg-green-600 p-btn' appearance="primary" startIcon={<PlusIcon />} onClick={addClick}>
                        Add
                    </Button>
                }
                {deleteClick &&
                    <Button disabled={!checkedKeys?.length} color="red" className='bg-red-600 p-btn' appearance="primary" startIcon={<TrashIcon />} onClick={deleteClick}>
                        Delete
                    </Button>
                }
                {changeStatusClick &&
                    <Button disabled={!checkedKeys?.length} color="cyan" className='bg-cyan-500 p-btn' appearance="primary" startIcon={<TbStatusChange />} onClick={changeStatusClick}>
                        Change status
                    </Button>
                }
            </ButtonToolbar>
        </>
        
    );
}

export default Toolbar
