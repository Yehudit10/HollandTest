import React, { useRef } from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { OverlayPanel } from 'primereact/overlaypanel';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './NavBar.css'; // קובץ CSS מותאם אישית

const NavBar = () => {
    const profileMenu = useRef(null);

    const items = [
        { label: 'שאלון הכוונה' },
        { label: 'מאגר הלימודים' },
        { label: 'מאגר העיסוקים' },
    ];

    const end = (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Button icon="pi pi-heart-fill" className="p-button-rounded p-button-secondary" />
            <Button icon="pi pi-search" className="p-button-rounded p-button-secondary" />
            <Avatar
                icon="pi pi-user"
                shape="circle"
                className="p-mr-2"
                style={{ cursor: 'pointer' }}
                onClick={(e) => profileMenu.current.toggle(e)}
            />
            <OverlayPanel ref={profileMenu} dismissable>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Button label="Log Out" icon="pi pi-sign-out" className="p-button-text" />
                    <Button label="Switch Account" icon="pi pi-user-edit" className="p-button-text" />
                </div>
            </OverlayPanel>
        </div>
    );

    return (
        <Menubar model={items} end={end} className="custom-menubar" />
    );
};

export default NavBar;