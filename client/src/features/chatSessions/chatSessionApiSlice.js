import apiSlice from "../../app/apiSlice"
const sessionApiSlice=apiSlice.injectEndpoints({
    endpoints:(build)=>({
        getSessionsSum:build.query({
        query:(params)=>({
            url:`/api/sessions`,
            params
        }),
        }),
       
      
    })
})
export const{useGetSessionsSumQuery}=sessionApiSlice
export default sessionApiSlice