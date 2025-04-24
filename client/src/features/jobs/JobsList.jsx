import { useEffect, useState } from "react"
import FilterSidebar from "../../components/FilterSideBar"
import FilterSidebar2 from "../../components/FilterSideBar2"
import Loading from "../../components/Loading"
import OccupationCard2 from "../../components/OccupationCard2"
import { useGetJobsQuery } from "./jobApiSlice"
import { useSearchParams } from "react-router-dom"
import FilterSidebar3 from "../../components/FilterSideBar3"
import { Button } from "primereact/button"

const JobList=()=>{

  const [searchParams,setSearchParams]=useSearchParams()
  const queryParams =Object.fromEntries(searchParams.entries());
  const {data,isError,isSuccess,isLoading}=useGetJobsQuery(queryParams)
 const [jobsList,setJobsList]=useState([])
  useEffect(()=>{if(isSuccess)
  {if(searchParams.get("page")==="0")setJobsList(data?.data)
else
setJobsList([...jobsList,...(data?.data||[])])}},[data])
  
if(isLoading)
return <Loading/>
return(
    <>
    <div style={{ display: 'flex', flexDirection: 'row-reverse', gap: '20px', width: '100%' }}>
    <FilterSidebar3/> 
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '20px',padding:'4rem' }}>   
        {jobsList.map((job)=>(<div key={job._id}>
        <OccupationCard2
        job={job}
        />
      </div>)
      
         )}
            <div> 

 { data?.data?.length===parseInt(searchParams.get("pageSize")||2)&&<Button label="הצגת עיסוקים נוספים"
       style={{ display: 'flex',  left:'50%', position: 'relative' }}
       
       onClick={()=>{
       
        const newSearchParams = new URLSearchParams(searchParams)
        newSearchParams.set("page",1+parseInt(searchParams.get("page")||0))
      setSearchParams(newSearchParams);
     
    
       }}
       />}</div>
      </div>
       
     
    </div>
  </>
  
  
)
}
export default JobList