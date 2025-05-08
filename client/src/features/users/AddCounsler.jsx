import { useForm } from "react-hook-form";
import { useAddCounslerMutation } from "./userApiSlice";
import "../auth/login/Form.css"
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AddCounsler=()=>{
  const { register, handleSubmit ,formState: { errors } } = useForm();
  const navigate=useNavigate()
    const [addCounsler,{isSuccess:CounselorIsSuccess}]=useAddCounslerMutation()
    const onSubmit = (data) => {
     
        addCounsler(data)
      };
      useEffect(()=>{
        if(CounselorIsSuccess)
        navigate('/home')
      },[CounselorIsSuccess])
    return (
        <div className="form-container">
          <div className="form-card">
            <h2 className="form-title">הוספת יועץ</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <InputText
                  id="email"
                  placeholder="אימייל"
                  {...register("email", { required: "Email is required" })}
                  className={`p-inputtext ${errors.username ? "p-invalid" : ""}`}
                />
                {errors.email && <small className="p-error">{errors.email.message}</small>}
              </div>
              <Button type="submit" label="הוסף יועץ" className="p-button-primary p-mt-3" />
            </form>
          </div>
        </div>
      );
}
export default AddCounsler