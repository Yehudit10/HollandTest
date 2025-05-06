import { useSelector } from "react-redux"
import { selectToken } from "../features/auth/authSlice"
import {jwtDecode} from "jwt-decode"
const useAuth=()=>{
const token=useSelector(selectToken)
if(token)
{
    const decodedUser=jwtDecode(token)
    const {_id,username,role,imgUrl,isActive,email}=decodedUser
    return {_id,username,role,imgUrl,isActive,email}
}
return {_id:'',username:'',role:'',imgUrl:'',email:''}
}
export default useAuth