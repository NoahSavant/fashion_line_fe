import { Container, Header, Content, Footer, Sidebar } from 'rsuite';

import BaseHeader from './BaseHeader';
import BaseFooter from './BaseFooter'

const GuestComponent = ({ children }) => {
    return (
        <div className="show-container">
            <div className='flex flex-col gap-0 w-full relative'>
                <div className='lg:h-[100px] h-[134px]'></div>
                <Header className='fixed top-0 left-0 z-50 bg-white w-full shadow-full'>
                    <BaseHeader></BaseHeader>
                </Header>
                {children}
                <BaseFooter />
            </div>
        </div>
    );
    
};

export default GuestComponent
