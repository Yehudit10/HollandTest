import apiSlice from "../../app/apiSlice"
const typeApiSlice=apiSlice.injectEndpoints({
    endpoints:(build)=>({
        getTypes:build.query({
        query:()=>({
            url:"/api/types",
        })})
})})
export const{useGetTypesQuery}=typeApiSlice
export default typeApiSlice
