import apiSlice from "../../app/apiSlice"
const questionApiSlice=apiSlice.injectEndpoints(
    {
        endpoints:(build)=>({
            getQuestions:build.query({
            query:()=>({
                url:"/api/question"
            })
            }),
            addQuestion:build.mutation({
                query:(question)=>({
                    url:"/api/question",
                    method:'POST',
                    body:question
                })
            }),
            updateQuestion:build.mutation({
                query:(question)=>({
                    url:"/api/question",
                    method:'PUT',
                    body:question
                })
            }),
            deleteQuestion:build.mutation({
                query:(question)=>({
                    url:"/api/question",
                    method:'DELETE',
                    body:question
                })
            })

        })
    }
    
)
export const{useAddQuestionMutation,useDeleteQuestionMutation,useGetQuestionsQuery,useUpdateQuestionMutation}=questionApiSlice
export default questionApiSlice
