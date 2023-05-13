import { Nav } from '_components';
import { SideBar } from '_components/SideBar';
import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className='grid md:grid-cols-sidebar'>
            <div>
                <SideBar />
            </div>
            <div>
                <Nav />
                <main>{children}</main>
            </div>
        </div>
    )
}

export default Layout;