import React from "react";
import { useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "./Login.css";

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="form-title">Sign-Up</h2>
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
       
          <Button type="submit" label="Sign-Up" className="p-button-primary p-mt-3" />
        </form>
      </div>
    </div>
  );
};

export default SignUp;