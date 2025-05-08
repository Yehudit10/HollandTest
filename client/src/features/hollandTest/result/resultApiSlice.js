import apiSlice from "../../../app/apiSlice"
const resultApiSlice=apiSlice.injectEndpoints({
    endpoints:(build)=>({
        getSentences:build.query({
        query:(id)=>({
            url:`/api/results/${id}`,
        }),
        }),
        addResult:build.mutation({
            query:(test)=>({
                url:"/api/results",
                method:'POST',
                body:test
            }),
            
        }),
        getUserResults:build.query({
            query:()=>({
               url:"/api/results"
            })
        }),
        getAllResult:build.query({
            query:(params)=>({
                url:"/api/results/statistics/all",
                params
             })
        })
      
    })
})
export const{useAddResultMutation,useGetSentencesQuery,useGetUserResultsQuery,useGetAllResultQuery}=resultApiSlice
export default resultApiSlice