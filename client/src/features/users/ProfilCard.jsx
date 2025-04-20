import React from "react";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import "primereact/resources/themes/lara-light-blue/theme.css"; // Theme
import "primereact/resources/primereact.min.css"; // Core styles
import "primeicons/primeicons.css"; // Icons
import "./ProfileCard.css"; // External CSS
import useGetFilePath from "../../hooks/useGetFilePath";

const ProfileCard = ({user}) => {
  const {getFilePath}=useGetFilePath()
  return (
    <div className="profile-card">
      {/* Profile Image */}
      <Avatar
        image={getFilePath(user.profil)||"/noavatar.png"} // Replace with actual image
        shape="circle"
        size="xlarge"
      />

      {/* Profile Details */}
      <div className="profile-info">
        <h2 className="profile-name">{user.username}</h2>
        <p className="profile-role">{user.firstname}</p>

        {/* Contact Details */}
        <div className="contact-info">
          <p>
            <FaEnvelope className="icon email-icon" />
            <a href="mailto:Paul_Molive65@gmail.com">{user.email}</a>
          </p>
          <p>
            <FaMapMarkerAlt className="icon" /> {user.address}
          </p>
          <p>
            <FaPhone className="icon" /> {user.phone}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="profile-actions">
          <Button  icon="pi pi-eye" className=" p-button-info action-button" />
          <Button icon="pi pi-pencil" className="p-button-warning action-button" />
          <Button icon="pi pi-trash" className=" p-button-danger action-button" />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
