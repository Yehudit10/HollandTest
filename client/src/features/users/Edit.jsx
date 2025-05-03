import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import {useGetUserByIdQuery, useUpdateUserMutation}from "./userApiSlice"
import{useNavigate}from "react-router-dom"
import "../auth/login/Form.css"
import { FileUpload } from "primereact/fileupload";
import { Avatar } from "primereact/avatar";
import useAuth from "../../hooks/useAuth";
import useGetFilePath from "../../hooks/useGetFilePath";
import { InputTextarea } from "primereact/inputtextarea";
import {  toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const Edit = () => {
  const navigate=useNavigate()
const {data:userData,isSuccess:userIsSuccuss}=useGetUserByIdQuery()
const{_id,username,firstname,lastname,phone,email,role,address,imgUrl,profile}=userData?.data||{}
const [preview, setPreview] = useState()

useEffect(()=>{
  if(userIsSuccuss){
  setPreview(getFilePath(imgUrl))
reset({
  _id,username,firstname,lastname,phone,email,role,address,profile
})
}},[userIsSuccuss])

const {getFilePath}=useGetFilePath()
  const { register, handleSubmit,control, reset,formState: { errors } } = useForm(
    
    );
  const [image, setImage] = useState();

  const [update,{isError,isLoading,isSuccess:updateIsSuccess}]=useUpdateUserMutation()
useEffect(()=>{if(updateIsSuccess){   
   toast.success("העדכון בוצע בהצלחה", {
     position: "top-center",
     hideProgressBar:true
});navigate('/home')}},[updateIsSuccess])///
  const onSubmit = (data) => {
    const formData =new FormData() 
    formData.append("imgUrl",image)
    Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      })
      console.log(formData)
     update(formData)
  };

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
  fileUploadRef.current.clear()

}
const fileUploadRef=useRef()

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="form-title">עדכון פרטים</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
                    <Avatar
                    key={preview}
                    size="large"
                    image={preview || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}  // אם אין תמונה, תראה ברירת מחדל
                    shape="circle"
                    />
                        <FileUpload
                        ref={fileUploadRef}
                            mode="basic"
                            accept="image/*"
                            chooseLabel={image?.name||"Choose Image"}
                           onSelect={handleImageChange}
                            customUpload
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
            className={`p-password custom-password ${errors.password ? "p-invalid" : ""}`}
            render={({field})=><Password
              placeholder="Password"
               {...field}
              toggleMask
              // feedback={}
              
            //  defaultValue={""}
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
          {role==="counselor"&&<div className="form-group">
            <InputTextarea
              id="profile"
              placeholder="Write about yourself...."
              {...register("profile", { required: "Profile is required" })}
              className={`p-inputtext ${errors.profile ? "p-invalid" : ""}`}
            />
            {errors.profile && <small className="p-error">{errors.profile.message}</small>}
        
            
          </div>}
          <Button type="submit" label="עדכון" className="p-button-primary p-mt-3" />
        </form>
      </div>
    </div>
  );
};

export default Edit;