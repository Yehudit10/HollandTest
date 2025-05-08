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
import { useSendLogoutMutation } from '../../features/auth/authApiSlice';
import useAuth from '../../hooks/useAuth';
import useGetFilePath from '../../hooks/useGetFilePath';
import {useGetUserByIdQuery} from '../../features/users/userApiSlice'
import { Badge } from 'primereact/badge';

const NavBar = () => {
    const profileMenu = useRef(null);
const navigate=useNavigate()
const {_id}=useAuth()
const[logout,{isError,isSuccess:logoutIsSuccess}]=useSendLogoutMutation()
const {data:userData,isLoading:userIsLoading,isError:userIsError,error:userError}=useGetUserByIdQuery(_id)
const {imgUrl,role,isActive,favoraites}=userData?.data||{}
const handleLogout=()=>{
    logout()
    navigate("/login")
}


const userNavigation = [
    { label: 'שאלון התאמה תעסוקתית', command: () => navigate("holland") },
    { label: 'מאגר עיסוקים', command: () => navigate("jobs") },
    { label: 'התוצאות שלי', command: () => navigate("holland/results") },
    { label: 'פנייה ליועץ', command: () => navigate("userchat") },
  ];
  
  const adminNavigation = [
    { label: 'ניהול שאלות', command: () => navigate("questions") },
    { label: 'צפיה במשתמשים', command: () => navigate("users") },
    { label: 'הוספת יועץ חדש', command: () => navigate("counsler-register") },
    { label: 'ניהול העיסוקים', command: () => navigate("viewjobs") },
    { label: 'סטטיסטיקות', command: () => navigate("statistics") },
  ];
  
  const counselorNavigation = [
    { label: 'התחלת פגישת ייעוץ', command: () => navigate("counselorchat") },
  ];
const navigationList=role==='admin'?adminNavigation:role==="user"?userNavigation:role==="counselor"&&isActive?counselorNavigation:[]
  
const {getFilePath}=useGetFilePath()
    const end = (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
 
            {role==='user'&&
            <div style={{ position: 'relative', display: 'inline-block' }}>
            <Button  icon="pi pi-heart-fill" style={{borderRadius:'50px',padding:'1.5rem'}} className="p-button-rounded p-button-secondary" onClick={()=>{navigate('favoraites')}} />
            
            {/* <Button icon="pi pi-search" className="p-button-rounded p-button-secondary" /> */}
            <Badge
          value={favoraites?.length||0}
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
                icon="pi pi-user"
                image={getFilePath(imgUrl)}
                shape="circle"
                className="p-mr-2"
                style={{ cursor: 'pointer' }}
                onClick={(e) => profileMenu.current.toggle(e)}
            />
            <OverlayPanel ref={profileMenu} dismissable>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Button label="התנתקות" onClick={handleLogout} icon="pi pi-sign-out" className="p-button-text" />
                    <Button label="עריכת פרופיל" onClick={()=>navigate("edit")}icon="pi pi-user-edit" className="p-button-text" />
                </div>
            </OverlayPanel>
        </div>
    );

if(userIsLoading)
   return <Loading/>
    if(userIsError)
        return <Error error={userError.data.message}/>
    return (
        <Menubar model={navigationList} end={end} className="custom-menubar" />
    );
};

export default NavBar;