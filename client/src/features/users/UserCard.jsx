import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "./userCard.css"
import { useDeleteUserMutation } from "./userApiSlice";
const UserCard = ({user}) => {
    const [deleteUser,{isLoading,isSuccess,isError}]=useDeleteUserMutation()
    const handleDelete=()=>{
deleteUser(user)
    }
    const handleEdit=()=>{

    }
  return (
    <Card className="user-card">
      <div className="user-info">
        <img src={user.profil} alt="User" className="user-avatar" />
        <div>
          <h3 className="user-name">{user.username}</h3>
          <p className="user-email">{user.email}</p>
        </div>
      </div>

      <div className="card-actions">
        <Button label="עריכה" icon="pi pi-pencil" className="p-button-sm p-button-info" onClick={() => {}} />
        <Button label="מחיקה" icon="pi pi-trash" className="p-button-sm p-button-danger" onClick={handleDelete} />
      </div>
    </Card>
  );
};

export default UserCard;

