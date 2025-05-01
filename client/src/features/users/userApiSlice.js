//const { default: apiSlice } = require("../../app/apiSlice");
import apiSlice from "../../app/apiSlice"
import authApiSlice from "../auth/authApiSlice"
const userApiSlice=apiSlice.injectEndpoints(
   { endpoints:(build)=>({
        
        getUsers:build.query({
            query:()=>({
               url:"/api/users" 
               
            }),
            providesTags:['User']
            
        })
        ,
        getUserById:build.query({
            query:()=>({
                url:`/api/users/me`
            }), 
            providesTags:['User']
        }),
        getUsersStat:build.query({
            query:(params)=>({
                url:'/api/users/stat',
                params
            })
        }),
        getCounslers:build.query({
            query:()=>({
                url:'/api/users/counselor'
            }),
            providesTags:['Counselors']
        }),
        addUser:build.mutation({
           query:(data)=>({
               url:"/api/users",
               method:'POST',
               body:data
           }),
           invalidatesTags:['User']
        }),
        addCounsler:build.mutation({
            query:(data)=>({
                url:"/api/users/counselor",
                method:'POST',
                body:data
            }),
            invalidatesTags:['User','Counselors']
         }),
        updateUser:build.mutation({
            query:(data)=>({
                url:"/api/users",
                method:'PUT',
                body:data
            }),
            invalidatesTags:['User'],
            async onQueryStarted(args,{dispatch,queryFulfilled})
            {
             try{
                await queryFulfilled
             dispatch(authApiSlice.endpoints.refresh.initiate())
            }
             catch(err)
             {
                 console.log(err)
             }
            }
        })
        ,
        deleteUser:build.mutation({
             query:(data)=>({
                url:"/api/users",
                method:'DELETE',
                body:data
             }),
             invalidatesTags:['User']
        })
    })

}
)
export const {useGetCounslersQuery,useGetUsersStatQuery,useAddUserMutation,useDeleteUserMutation,useGetUsersQuery,useUpdateUserMutation,useGetUserByIdQuery,useAddCounslerMutation}=userApiSlice
export default userApiSlice
