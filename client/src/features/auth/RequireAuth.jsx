import { Navigate, Outlet } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

const RequireAuth=({allowedRoles})=>{
    
const {role}=useAuth()
console.log(allowedRoles.includes(role))
return (<>{allowedRoles.includes(role)?<Outlet/>:<Navigate to="/login" replace/>}</>)

}
export default RequireAuth