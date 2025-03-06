import React from "react";
import { useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "./Login.css";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
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

          <Button type="submit" label="Login" className="p-button-primary p-mt-3" />
        </form>
      </div>
    </div>
  );
};

export default Login;