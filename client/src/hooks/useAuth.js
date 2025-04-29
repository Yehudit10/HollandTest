import { useSelector } from "react-redux"
import { selectToken } from "../features/auth/authSlice"
import {jwtDecode} from "jwt-decode"
const useAuth=()=>{
const token=useSelector(selectToken)
if(token)
{
    const decodedUser=jwtDecode(token)
    const {username,role,imgUrl}=decodedUser
    return {username,role,imgUrl}
}
return {username:'',role:'',imgUrl:''}
}
export default useAuth