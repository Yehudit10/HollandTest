import apiSlice from "../auth/authApiSlice";
const emailSlice=apiSlice.injectEndpoints({
    endpoints:(build)=>({
        sendEmail:build.mutation({
            query:(data)=>({
            url:'/api/email',
               method:'POST',
               body:data
            })
            
        })
    })
    
})
export default emailSlice
export const {useSendEmailMutation}=emailSlice