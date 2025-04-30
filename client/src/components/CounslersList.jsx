import React, { useEffect, useState } from "react";
import {getSocket}from "../socket";
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { ListBox } from 'primereact/listbox';
import { useGetCounslersQuery } from "../features/users/userApiSlice";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const CounselorList = ({ onStartChat }) => {
     
    const {data:counselorsData,isSuccess,isLoading}=useGetCounslersQuery()
    const counselors=counselorsData?.data
  const [availableCounselors, setAvailableCounselors] = useState([]);

  useEffect(() => {
    const socket = getSocket();

    socket.on("availableCounselors", setAvailableCounselors);
    return () => {
      socket.off("availableCounselors", setAvailableCounselors);
    };
  }, []);

  return (
    <Card title="Available Counselors">
      {/* {availableCounselors.length === 0 ? (
        <p>No counselors available.</p>
      ) : ( */}
        <DataTable  value={counselors}>
                <Column field="_id" header="שאלה" />
                <Column field="username" />
                <Column body={(counselor) => {
           return <Button disabled={!availableCounselors.includes(counselor._id)} label="Chat" icon="pi pi-comments" onClick={() => onStartChat(counselor._id)} className="p-button-sm" />
        }} header="האם זמין" />
                
        </DataTable>
        
        {/* <ListBox */}
        {/* //   options={availableCounselors.map(id => ({ label: id, value: id }))}
        //   optionLabel="label"
        //   itemTemplate={(option) => ( */}
        {/* //     <div className="p-d-flex p-jc-between p-ai-center w-100">
        //       <span>{option.label}</span>
        //       <Button label="Chat" icon="pi pi-comments" onClick={() => onStartChat(option.value)} className="p-button-sm" />
        //     </div>
        //   )} */}
        {/* // />
    //   )} */}
    </Card>
  );
};

export default CounselorList;