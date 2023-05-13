import { Nav } from '_components';
import { SideBar } from '_components/SideBar';
import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className=''>
            <div className='fixed top-0 left-0 z-40 w-64 h-screen border-right'>
                <SideBar />
            </div>
            <div className='h-screen'>
                <Nav />
                <div className='max-w-2xl mx-auto my-20 pb-20'>
                    <main>{children}</main>
                </div>
            </div>
        </div>
    )
}

export default Layout;