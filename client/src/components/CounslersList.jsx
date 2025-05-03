import React, { useEffect, useState } from "react";
import {getSocket}from "../socket";
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useGetCounslersQuery } from "../features/users/userApiSlice";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Avatar } from "primereact/avatar";
import useGetFilePath from "../hooks/useGetFilePath";
import { ScrollPanel } from "primereact/scrollpanel";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const CounselorList = ({ onStartChat }) => {
     
    const {data:counselorsData,isSuccess,isLoading}=useGetCounslersQuery()
    const counselors=counselorsData?.data
  const [availableCounselors, setAvailableCounselors] = useState([]);
const {getFilePath}=useGetFilePath()
const socket = getSocket();
const showToastMessage = (counselorId) => {
 
    toast.info(`היועץ ${counselorId} התפנה`, {
        position: "bottom-right",
        hideProgressBar: true,
        toastId: `counselor-${counselorId}`,
        autoClose: 5000,
        style: {
          background: "#fff",
          color: "#202124",
          borderRadius: "12px",
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.2)",
          padding: "12px 16px",
          fontSize: "20px",
          fontFamily: "Roboto, sans-serif",
          display: "flex",
          alignItems: "center",
          height:'25vh',
          width:'30vw'
        },
      });
  };
  useEffect(() => {
    
    socket.on("availableCounselors", setAvailableCounselors);

    return () => {
      socket.off("availableCounselors", setAvailableCounselors);
    };
  }, []);
  const[notifications,setNotifications]=useState(()=>{
    const stored = sessionStorage.getItem("notifications");
  return stored ? new Set(JSON.parse(stored)) : new Set();
})
useEffect(() => {
  sessionStorage.setItem("notifications", JSON.stringify([...notifications]));
}, [notifications]);
// const waitForCounselor=(counselorId)=>{
//     socket.emit("notifyWhenAvailable", { counselorId })
//     setNotifications(prevSet => new Set(prevSet).add(counselorId));
//     socket.on("NotifyCounselorAvailable", ({ counselorId }) => {
//       showToastMessage(counselorId);
//       removeWaiting(counselorId)
//     });
// }
// const removeWaiting=(counselorId)=>{
//     socket.off("NotifyCounselorAvailable")
//     setNotifications(prev => (prev.delete(counselorId), new Set(prev)));
// }
const waitForCounselor=(counselorId)=>{
   setNotifications(prevSet => new Set(prevSet).add(counselorId));
   socket.on(`NotifyCounselorAvailable-${counselorId}`, ({ counselorId }) => {
     showToastMessage(counselorId);
     removeWaiting(counselorId)
   });
}
const removeWaiting=(counselorId)=>{
   socket.off(`NotifyCounselorAvailable-${counselorId}`)
   setNotifications(prev => (prev.delete(counselorId), new Set(prev)));
}


  return (
    <Card title="בחר יועץ תעסוקתי לשיחה אישית" subTitle="בחר יועץ מתוך הרשימה למטה כדי להתחיל שיחה.">
     
        <DataTable  value={counselors}>
        <Column body={(counselor) => {
           return <Avatar
           icon="pi pi-user"
           image={getFilePath(counselor.imgUrl)}
           shape="circle"
           className="p-mr-2"
           style={{ cursor: 'pointer' }}
          
       />
        }}  />
                <Column field="username" header="שם משתמש" />
                <Column field="firstname" header="שם פרטי"/>
                <Column field="lastname" header="שם משפחה"/>
                {/* <Column field="profile" header="עלי"/> */}
                <Column body={(counselor) => {
           return <ScrollPanel style={{
            width: '100%',
            maxWidth: '300px',
            height: '4em',
            overflow: 'auto',
            overflowY: 'scroll',
          }}>{counselor.profile}</ScrollPanel>}}/>

        <Column body={(counselor) => {
           return <Button disabled={!availableCounselors.includes(counselor._id)} label="Chat" icon="pi pi-comments" onClick={() => onStartChat(counselor._id,counselor.username)} className="p-button-sm" />
        }} />
          
          <Column body={(counselor) => 
          {if (!availableCounselors.includes(counselor._id)) {
            return (
              <Button 
                label={notifications.has(counselor._id)?"בטל הרשמה לתזכורת":"שלח לי הודעה כשהיועץ יתפנה" }
                icon="pi pi-bell" 
                className="p-button-outlined p-mt-3"
                onClick={() => {
                if(notifications.has(counselor._id))
                removeWaiting(counselor._id)
                else
                waitForCounselor(counselor._id)
                }}
              />
            );
          } else {
            return <></>; }
          }
        
        } />  
        </DataTable>
       
    </Card>
  );


};

export default CounselorList;



// <ScrollPanel style={{
//             width: '100%',
//             maxWidth: '300px',
//             height: '4em',
//             overflow: 'auto',
//             overflowY: 'scroll',
//           }}>{counselor.profile}</ScrollPanel>