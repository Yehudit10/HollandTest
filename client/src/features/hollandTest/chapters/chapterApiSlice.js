import apiSlice from "../../../app/apiSlice"
const chapterApiSlice=apiSlice.injectEndpoints({
    endpoints:(build)=>({
        getChapters:build.query({
            query:()=>({
                url:'/api/chapters'
            })
        }),
        addChapter:build.mutation({
            query:(chapter)=>({
                url:'/api/chapters',
                method:'POST',
                body:chapter
            })
        }),
        

    })
})
export const {useAddChapterMutation,useGetChaptersQuery}=chapterApiSlice
export default chapterApiSlice