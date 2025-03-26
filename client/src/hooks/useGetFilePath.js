const useGetFilePath=()=>{
    const getFilePath=(img)=>{
        if(img)
        return "http://localhost:2890/uploads"+img
    else return ""
    }
    return {getFilePath}
}
export default useGetFilePath