import { useGetJobsQuery } from "../features/jobs/jobApiSlice"
import Loading from "./Loading"
import Error from './Error'
import { useGetUserByIdQuery } from "../features/users/userApiSlice"
import OccupationCard2 from './OccupationCard2'
const Favoraites=()=>{

    const {data:jobsData,isError:jobsIsError,isSuccess:jobsIsSuccess,isLoading:jobsIsLoading,error:jobsError}=useGetJobsQuery()
    const {data:userData,isError:userIsError}=useGetUserByIdQuery()
    if(jobsIsLoading)
        return <Loading/>
    if(jobsIsError)
        return <Error error={jobsError.data.message}/>
      //populate??
    return (<>
    <h1>המועדפים שלי</h1>
    <h3 >עיסוקים שסימנת ב-♡</h3>
    <div  style={{
        display: "grid",
        
        justifyContent:'center',
       
        }}>
    {jobsData?.data?.jobs.filter(job=>userData?.data?.favoraites?.includes(job._id))?.map(job=><OccupationCard2 job={job}/>)}
    </div>
    </>)
}
export default Favoraites