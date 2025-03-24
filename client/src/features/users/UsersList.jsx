import { useEffect, useState } from "react"
import { useGetUsersQuery } from "./userApiSlice"
import Loading from "../../Components/Loading"
import UserCard from "./UserCard"


const UsersList=()=>{
   // const{data:usersList,isError,isLoading,isSuccess}=useGetUsersQuery()
    // if(isLoading)
    // return <Loading/>
    const usersList=[{username:"aaa",email:"bbb",image:null},{username:"aaa",email:"bbb",image:null},{username:"aaa",email:"bbb",image:null}]
return(<>
{usersList.map((user)=><UserCard user={user}/>)}
</>)
}
export default UsersList