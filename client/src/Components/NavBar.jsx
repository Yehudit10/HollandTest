import React, { useEffect, useRef } from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { OverlayPanel } from 'primereact/overlaypanel';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './NavBar.css';
import Loading from './Loading'
import Error from './Error'
import { useNavigate } from 'react-router-dom';
import { useSendLogoutMutation } from '../features/auth/authApiSlice';
import useAuth from '../hooks/useAuth';
import useGetFilePath from '../hooks/useGetFilePath';
import {useGetUserByIdQuery} from '../features/users/userApiSlice'
import { Badge } from 'primereact/badge';

const NavBar = () => {
    const profileMenu = useRef(null);
const navigate=useNavigate()
const {profil,role,_id}=useAuth()
const[logout,{isError,isSuccess}]=useSendLogoutMutation()
const {data:userData,isLoading:userIsLoading,isError:userIsError,error:userError}=useGetUserByIdQuery(_id)
const handleLogout=()=>{
    logout()
}
useEffect(()=>{if(isSuccess)
navigate("/login")},[isSuccess])

const userNavigation = [
    { label: 'שאלון הכוונה', command:()=>{ navigate("holland")} },
    { label: 'מאגר העיסוקים',command:()=>{navigate("jobs")} },
    { label:'צפיה בתוצאות',command:()=>{navigate("holland/results")} },
];
const adminNavigation=[
 { label:'שאלות',command:()=>{navigate("view")}},

]
const navigationList=role==='admin'?adminNavigation:userNavigation
  
const {getFilePath}=useGetFilePath()
    const end = (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {role==='user'&&
            <div style={{ position: 'relative', display: 'inline-block' }}>
            <Button  icon="pi pi-heart-fill" className="p-button-rounded p-button-secondary" onClick={()=>{navigate('favoraites')}} />
            
            {/* <Button icon="pi pi-search" className="p-button-rounded p-button-secondary" /> */}
            <Badge
          value={userData?.data?.favoraites?.length}
          severity="info"
          style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            backgroundColor: 'lightblue',
            color: 'black',
            fontWeight: 'bold'
          }}
        />
        </div>}
            <Avatar
                //icon="pi pi-user"
                image={getFilePath(profil)}
               
                shape="circle"
                className="p-mr-2"
                style={{ cursor: 'pointer' }}
                onClick={(e) => profileMenu.current.toggle(e)}
            />
            <OverlayPanel ref={profileMenu} dismissable>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Button label="Log Out" onClick={handleLogout} icon="pi pi-sign-out" className="p-button-text" />
                    <Button label="Edit profile" onClick={()=>navigate("edit")}icon="pi pi-user-edit" className="p-button-text" />
                </div>
            </OverlayPanel>
        </div>
    );

if(userIsLoading)
    return <Loading/>
    if(userIsError)
        return <Error error={userError}/>
    return (
        <Menubar model={navigationList} end={end} className="custom-menubar" />
    );
};

export default NavBar;