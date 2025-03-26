import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "./Form.css";

import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../authApiSlice";

const Login = () => {
  const { register, handleSubmit ,control,formState: { errors } } = useForm();
  const [login,{isError,isSuccess,isLoading,data}]=useLoginMutation()
 
const navigate=useNavigate()
useEffect(()=>{
if(isSuccess)
{
navigate("/home")}
},[isSuccess])
  const onSubmit = (data) => {
    login(data)
  
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="form-title">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
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

          <Button type="submit" label="Login" className="p-button-primary p-mt-3" />
        </form>
      </div>
    </div>
  );
};

export default Login;