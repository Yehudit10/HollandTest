import { Navigate, Outlet } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const RequireAuth=({allowedRoles,notActiveAllowed})=>{
    
const {role,isActive}=useAuth()
const isAllowed=allowedRoles.includes(role)
if(!(isAllowed&&(notActiveAllowed||isActive)))
console.log("not allowed")
return (<>{isAllowed&&(notActiveAllowed||isActive)?<Outlet/>:isAllowed?<Navigate to="edit" replace/>:<Navigate to="/login" replace/>}</>)

}
export default RequireAuth