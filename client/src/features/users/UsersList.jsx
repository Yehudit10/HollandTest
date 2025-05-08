
import { useGetUsersQuery } from "./userApiSlice"
import Loading from "../../components/generals/Loading"

import React, { useEffect, useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { Avatar } from 'primereact/avatar';
import { Toast } from 'primereact/toast';
import './UsersList.css';
import useGetFilePath from "../../hooks/useGetFilePath";
const UsersList=()=>{
   const{data:usersData,isError,isLoading,isSuccess}=useGetUsersQuery()
   const usersList=usersData?.data
const {getFilePath}=useGetFilePath()
const [filteredUsers, setFilteredUsers] = useState([]);
const [selectedRole, setSelectedRole] = useState(null);
useEffect(()=>{
  if(isSuccess)
  setFilteredUsers(usersList)
},[isSuccess])


   const roleLabels = {
    user: 'משתמש',
    admin: 'מנהל',
    counselor: 'יועץ'
};

const roleTemplate = (rowData) => {
    const severity = {
        user: 'info',
        admin: 'danger',
        counselor: 'success'
    };
    return <Tag value={roleLabels[rowData.role]} severity={severity[rowData.role]} />;
};

const nameTemplate = (rowData) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* <Avatar
                image={getFilePath(rowData.imgUrl)}
                label={rowData.firstname?.[0]}
                shape="circle"
                size="large"
            /> */}
            <span>{rowData.firstname} {rowData.lastname}</span>
        </div>
    );
};

const isActiveTemplate = (rowData) => {
    return rowData.isActive ? 'כן' : 'לא';
};

const profileTemplate = (rowData) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Avatar
                image={getFilePath(rowData.imgUrl)}
                label={rowData.firstname?.[0]}
                shape="circle"
                size="small"
            />
        </div>
    );
};

const handleRoleFilter = (e) => {
    setSelectedRole(e.value);
    if (e.value === 'all') {
      setFilteredUsers(usersList);
  } else {
      setFilteredUsers(usersList.filter(user => user.role === e.value));
  }
};

const roleOptions = [
    { label: 'הכל', value: "all" },
    { label: 'משתמש רגיל', value: 'user' },
    { label: 'יועץ תעסוקתי', value: 'counselor' }
];










     if(isLoading)
     return <Loading/>
    
return(<>

<div className="card" style={{ maxWidth: '95%', margin: 'auto' }}>
            {/* <Toast ref={toast} /> */}
            <h2 style={{ textAlign: 'center' }}>רשימת משתמשים</h2>

            <div className="custom-dropdown-container">
                <Dropdown
                    value={selectedRole}
                    options={roleOptions}
                    onChange={handleRoleFilter}
                    placeholder="סינון לפי תפקיד"
                    className="custom-dropdown"
                />
            </div>
<DataTable value={filteredUsers} paginator rows={10} stripedRows responsiveLayout="scroll">
<Column header="פעיל" body={isActiveTemplate} />
<Column body={roleTemplate} header="סוג משתמש" />
<Column field="address" header="כתובת" />
<Column field="phone" header="טלפון" />
<Column field="email" header="אימייל" />
<Column body={nameTemplate} header="שם מלא" />
                    <Column field="username" header="שם משתמש" />
                    
                    <Column header="" body={profileTemplate} style={{ width: '4rem', textAlign: 'right' }} /> עמודה חדשה עבור הפרופיל
                </DataTable>
                </div>
</>)
}
export default UsersList