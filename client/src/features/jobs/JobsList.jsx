import { useEffect } from "react"
import FilterSidebar from "../../components/FilterSideBar"
import FilterSidebar2 from "../../components/FilterSideBar2"
import Loading from "../../components/Loading"
import OccupationCard2 from "../../components/OccupationCard2"
import { useGetJobsQuery } from "./jobApiSlice"
import { useSearchParams } from "react-router-dom"
import FilterSidebar3 from "../../components/FilterSideBar3"

const JobList=()=>{
  const [searchParams]=useSearchParams()
  const queryParams =Object.fromEntries(searchParams.entries());
  const {data,isError,isSuccess,isLoading}=useGetJobsQuery(queryParams)
  const jobsList=data?.data
  
if(isLoading)
return <Loading/>
return(
    <>
    <div style={{ display: 'flex', flexDirection: 'row-reverse', gap: '20px', width: '100%' }}>
    <FilterSidebar3/> 
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '20px',padding:'4rem' }}>   
        {jobsList.map((job)=>(<div key={job._id}>
        <OccupationCard2
          title={job.jobname}
          description={job.description}
          workingHoursAvg={job.workingHoursAvg}
          educationLevel={job.educationLevel}
          salaryAvg={job.salaryAvg}
        />
      </div>)
      
         )}
            
      </div>
       
    </div>
  </>
  
  
)
}
export default JobList