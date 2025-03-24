import apiSlice from "../../app/apiSlice"
const questionApiSlice=apiSlice.injectEndpoints(
    {
        endpoints:(build)=>({
            getQuestions:build.query({
            query:()=>({
                url:"/api/question"
            }),
            providesTags:['Question']
            }),
            addQuestion:build.mutation({
                query:(question)=>({
                    url:"/api/question",
                    method:'POST',
                    body:question
                }),
                invalidatesTags:['Question']
            }),
            updateQuestion:build.mutation({
                query:(question)=>({
                    url:"/api/question",
                    method:'PUT',
                    body:question
                }),
                invalidatesTags:['Question']

            }),
            deleteQuestion:build.mutation({
                query:(question)=>({
                    url:"/api/question",
                    method:'DELETE',
                    body:question
                }),
                invalidatesTags:['Question']
            })

        })
    }
    
)
export const{useAddQuestionMutation,useDeleteQuestionMutation,useGetQuestionsQuery,useUpdateQuestionMutation}=questionApiSlice
export default questionApiSlice
