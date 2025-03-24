import{createApi,fetchBaseQuery}from "@reduxjs/toolkit/query/react"
import { setToken } from "../features/auth/authSlice"
const baseQuery=fetchBaseQuery(
    {
        baseUrl:"http://localhost:2890",
        credentials:'include',
        prepareHeaders:(headers,{getState})=>{
            const token=getState().auth.token
            if(token)
            headers.set("authorization",`Bearer ${token}`)
        return headers
        }
    }
)
const baseQueryWithRefresh=async(args,app,extraOptions)=>{
    let  result=await baseQuery(args,app,extraOptions)
    if(result?.error?.status===403)
    {
        const refreshResult=await baseQuery("/api/auth/refresh",app,extraOptions)
        if(refreshResult?.data)
        {
            app.dispatch(setToken({...refreshResult.data}))
            result=await baseQuery(args,app,extraOptions)

        }
        else{
            if(refreshResult?.error?.status===403)
            refreshResult.error.data.message="yout login has expired"
return refreshResult
        }
    }
    return result
}
const apiSlice=createApi(
    {
        reducerPath:"api",
        baseQuery:baseQueryWithRefresh,
        endpoints:()=>({})
    }
)
export default apiSlice
