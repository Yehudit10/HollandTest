import { useEffect, useState } from "react"
import { useGetUsersQuery } from "./userApiSlice"
import Loading from "../../components/Loading"
import UserCard from "./UserCard"
import ProfileCard from "./ProfilCard"


const UsersList=()=>{
   const{data:usersList,isError,isLoading,isSuccess}=useGetUsersQuery()
     if(isLoading)
     return <Loading/>
    //const usersList=[{username:"aaa",email:"bbb",image:null},{username:"aaa",email:"bbb",image:null},{username:"aaa",email:"bbb",image:null}]
return(<>
<div style={{alignItems:"center",display:"flex",flexFlow:"column"}}>
{usersList?.data.map((user)=><ProfileCard user={user}/>)}</div>
</>)
}
export default UsersList