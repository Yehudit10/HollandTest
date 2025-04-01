import apiSlice from "../../app/apiSlice";
const jobApiSlice=apiSlice.injectEndpoints({
    endpoints:(build)=>({
          getJobs:build.query(
            {
                query:(params)=>({
                    url:"api/jobs",
                    params
                }),
                providesTags:['Job']
            }
          ),
          addJob:build.mutation({
            query:(job)=>({
                url:"api/jobs",
                method:'POST',
                body:job
            }),
            invalidatesTags:['Job']
          }),
          updateJob:build.mutation({
            query:(job)=>({
            url:"api/jobs",
            method:"PUT",
            body:job})
            ,invalidatesTags:['Job']
            
          }),
          deleteJob:build.mutation({
            query:(id)=>({
                url:"api/jobs",
                method:"DELETE",
                body:id
            })
            ,invalidatesTags:['Job']

          })



    })
    
})
export const {useAddJobMutation,useDeleteJobMutation,useGetJobsQuery,useUpdateJobMutation}=jobApiSlice
export default jobApiSlice