import React, { useEffect, useRef } from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { OverlayPanel } from 'primereact/overlaypanel';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './NavBar.css';
import { useNavigate } from 'react-router-dom';
import { useSendLogoutMutation } from '../features/auth/authApiSlice';
import useAuth from '../hooks/useAuth';

const NavBar = () => {
    const profileMenu = useRef(null);
const navigate=useNavigate()
const[logout,{isError,isSuccess}]=useSendLogoutMutation()

const handleLogout=()=>{
    logout()
}
useEffect(()=>{if(isSuccess)
navigate("/login")},[isSuccess])
const {profil,role}=useAuth()
const userNavigation = [
    { label: 'שאלון הכוונה', command:()=>{ navigate("holland")} },
    //{ label: 'מאגר הלימודים' },
    { label: 'מאגר העיסוקים',command:()=>{navigate("jobs")} },
];
const adminNavigation=[
 { label:'שאלות',command:()=>{navigate("view")}},

]
const navigationList=role==='admin'?adminNavigation:userNavigation
    // const items = [
    //     { label: 'שאלון הכוונה', command:()=>{ navigate("holland")} },
    //     //{ label: 'מאגר הלימודים' },
    //     { label: 'מאגר העיסוקים',command:()=>{navigate("jobs")} },
    // ];

    const end = (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Button  icon="pi pi-heart-fill" className="p-button-rounded p-button-secondary" />
            <Button icon="pi pi-search" className="p-button-rounded p-button-secondary" />
            <Avatar
                //icon="pi pi-user"
                image={`http://localhost:2890/uploads/${profil}`}
                shape="circle"
                className="p-mr-2"
                style={{ cursor: 'pointer' }}
                onClick={(e) => profileMenu.current.toggle(e)}
            />
           {/* <img src={`http://localhost:2890/uploads/${profil}`}/> */}
            <OverlayPanel ref={profileMenu} dismissable>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Button label="Log Out" onClick={handleLogout} icon="pi pi-sign-out" className="p-button-text" />
                    <Button label="Edit profile" onClick={()=>navigate("edit")}icon="pi pi-user-edit" className="p-button-text" />
                </div>
            </OverlayPanel>
        </div>
    );

    return (
        <Menubar model={navigationList} end={end} className="custom-menubar" />
    );
};

export default NavBar;