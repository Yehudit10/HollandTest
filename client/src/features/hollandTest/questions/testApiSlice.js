import apiSlice from "../../../app/apiSlice"
const testApiSlice=apiSlice.injectEndpoints({
    endpoints:(build)=>({
        getTest:build.query({
        query:()=>({
            url:"/api/tests",
        
        }),
        providesTags:['Test']
        }),
        addTest:build.mutation({
            query:(test)=>({
                url:"/api/tests",
                method:'POST',
                body:{test}
            }),
            invalidatesTags:['Test']
        }),
        updateTest:build.mutation({
            query:(test)=>({
                url:"/api/tests",
                method:'PUT',
                body:test
            }),
        }),
        deleteTest:build.mutation({
            query:(test)=>({
                url:"/api/tests",
                method:'DELETE',
                body:test
            }),
        })
    })
})
export const{useAddTestMutation,useDeleteTestMutation,useGetTestQuery,useUpdateTestMutation}=testApiSlice
export default testApiSlice