import { Container, Header, Content, Footer, Sidebar } from 'rsuite';

import BaseHeader from './BaseHeader';
import BaseFooter from './BaseFooter'

const GuestComponent = ({ children }) => {
    return (
        <div className="show-container">
            <div className='flex flex-col gap-0 w-full'>
                <Header>
                    <BaseHeader></BaseHeader>
                </Header>
                {children}
                <BaseFooter />
            </div>
        </div>
    );
    
};

export default GuestComponent
