const { default: apiSlice } = require("../../app/apiSlice");

const userApiSlice=apiSlice.injectEndpoints(
   { endpoints:(build)=>({
        
        getUsers:build.query({
            query:()=>({
               url:"/api/users" 
               
            }),
            providesTags:['User']
            
        })
        
        ,
        addUser:build.mutation({
           query:(data)=>({
               url:"/api/users",
               method:'POST',
               body:data
           }),
           invalidatesTags:['User']
        }),
        updateUser:build.mutation({
            query:(data)=>({
                url:"/api/users",
                method:'PUT',
                body:data
            }),
            invalidatesTags:['User']
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
export const {useAddUserMutation,useDeleteUserMutation,useGetUsersQuery,useUpdateUserMutation}=userApiSlice
export default userApiSlice
