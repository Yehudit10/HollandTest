import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Avatar } from "primereact/avatar";
import { FileUpload } from 'primereact/fileupload';
import './Profil.css'
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "../auth/login/Form.css"


const Profil = () => {
    const [image, setImage] = useState(null);
    const [profileData, setProfileData] = useState({ 
        username: "Elisheva",
        firstname: "Klor",
        lastname: "Klor",
        password: "1234",
        address: "asas",
        email: "sasa",
        phone: "sasa",
    });

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: profileData, 
    });

    const onSubmit = (data) => {
        console.log("Form Data:", data);
        setProfileData(data); 
       //??איך לשמור את התמונה
    };

    const handleImageChange = (e) => {
        const file = e.files[0]; // שנה מ-e.target.files[0] ל-e.files[0]
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                console.log("File read:", reader.result);
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            console.log("No file selected");
        }
    };
    
    

    return (
        <div className="Form-container">
            <div className="Form-card">
                <h2 className="Form-title">Edit Profile</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                    <Avatar
                    key={image}
                    size="large"
                    image={image || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}  // אם אין תמונה, תראה ברירת מחדל
                    shape="circle"
                    className="p-mb-3"
                    />
                        <FileUpload
                            mode="basic"
                            accept="image/*"
                            chooseLabel="Choose Image"
                            onSelect={handleImageChange}
                            className="p-mb-3"
                        />
                    </div>

                    <div className="form-group">
                        <InputText
                            id="username"
                            placeholder="Username"
                            {...register("username", { required: "Username is required" })}
                            className={`p-inputtext ${errors.username ? "p-invalid" : ""}`}
                        />
                        {errors.username && <small className="p-error">{errors.username.message}</small>}
                    </div>

                    <div className="form-group">
                        <InputText
                            id="firstname"
                            placeholder="Firstname"
                            {...register("firstname")}
                            className={`p-inputtext ${errors.firstname ? "p-invalid" : ""}`}
                        />
                        {errors.firstname && <small className="p-error">{errors.firstname.message}</small>}
                    </div>

                    <div className="form-group">
                        <InputText
                            id="lastname"
                            placeholder="Lastname"
                            {...register("lastname")}
                            className={`p-inputtext ${errors.lastname ? "p-invalid" : ""}`}
                        />
                        {errors.lastname && <small className="p-error">{errors.lastname.message}</small>}
                    </div>

                    <div className="form-group">
                        <Password
                            id="password"
                            placeholder="Password"
                            {...register("password", { required: "Password is required" })}
                            toggleMask
                            feedback={false}
                            className={`p-password custom-password ${errors.password ? "p-invalid" : ""}`}
                        />
                        {errors.password && <small className="p-error">{errors.password.message}</small>}
                    </div>

                    <div className="form-group">
                        <InputText
                            id="address"
                            placeholder="Address"
                            {...register("address")}
                            className={`p-inputtext ${errors.address ? "p-invalid" : ""}`}
                        />
                        {errors.address && <small className="p-error">{errors.address.message}</small>}
                    </div>

                    <div className="form-group">
                        <InputText
                            id="email"
                            placeholder="Email"
                            {...register("email", { required: "Email is required" })}
                            className={`p-inputtext ${errors.email ? "p-invalid" : ""}`}
                        />
                        {errors.email && <small className="p-error">{errors.email.message}</small>}
                    </div>

                    <div className="form-group">
                        <InputText
                            id="phone"
                            placeholder="Phone"
                            {...register("phone")}
                            className={`p-inputtext ${errors.phone ? "p-invalid" : ""}`}
                        />
                        {errors.phone && <small className="p-error">{errors.phone.message}</small>}
                    </div>

                    <Button type="submit" label="Edit" className="p-button-primary p-mt-3" />
                </form>
            </div>
        </div>
    );
};

export default Profil;