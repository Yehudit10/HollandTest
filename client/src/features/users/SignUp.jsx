import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import {useAddUserMutation}from "./userApiSlice"
import{useNavigate}from "react-router-dom"
import "../auth/login/Form.css"
import { FileUpload } from "primereact/fileupload";
import { Avatar } from "primereact/avatar";
const SignUp = () => {
  const navigate=useNavigate()
const [image, setImage] = useState(null);
const [preview, setPreview] = useState()
  const { register, handleSubmit,control, formState: { errors } } = useForm();
const [signUp,{isError,isLoading,isSuccess}]=useAddUserMutation()
  const onSubmit = (data) => {
    const formData =new FormData()
    formData.append("imgUrl",image)
    Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      })
    signUp(formData)
  };
  useEffect(()=>{
if(isSuccess)
navigate("/login")
  },[isSuccess])
  
  useEffect(() => {
    if (!image) {
        setPreview(undefined)
        return
    }
    const objectUrl = URL.createObjectURL(image)
    setPreview(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
}, [image])

const handleImageChange = (e) => {
  if (!e.files || e.files.length === 0) {
      setImage(undefined)
      return
  }
  setImage(e.files[0])
}
  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="form-title">Sign-Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
                    <Avatar
                    key={preview}
                    size="large"
                    image={preview || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}  // אם אין תמונה, תראה ברירת מחדל
                    shape="circle"
                    />
                        <FileUpload
                            mode="basic"
                            accept="image/*"
                            chooseLabel="Choose Image"
                            onSelect={handleImageChange}
                            // customUpload uploadHandler={handleImageChange}
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
          <Controller name="password"
            control={control}
            rules={{required:"Password is required"}}
            className={`p-password custom-password ${errors.password ? "p-invalid" : ""}`}
            render={({field})=><Password
              placeholder="Password"
               {...field}
              toggleMask
              feedback={false}
            />}
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
       
          <Button type="submit" label="Sign-Up" className="p-button-primary p-mt-3" />
        </form>
      </div>
    </div>
  );
};

export default SignUp;