import { useEffect, useState } from "react"
import Loading from "../../components/generals/Loading"
import OccupationCard2 from "../../components/generals/OccupationCard2"
import { useGetJobsQuery } from "./jobApiSlice"
import { useSearchParams } from "react-router-dom"
import FilterSidebar3 from "../../components/generals/FilterSideBar3"
import { Button } from "primereact/button"

const JobList = () => {
  const pageSize=6
  const [searchParams] = useSearchParams()
  
  const [page,setPage]=useState(0)
  useEffect(()=>{setPage(0)},[searchParams])
  const queryParams = Object.fromEntries(searchParams.entries());
  const { data, isError, isSuccess, isLoading } = useGetJobsQuery({...queryParams,page,pageSize})
  const [jobsList, setJobsList] = useState([])

  useEffect(() => {
    if (isSuccess) {
      if (page===0) 
      setJobsList(data?.data?.jobs)
      else
        setJobsList([...jobsList, ...(data?.data.jobs || [])])
    }
  }, [data])

  if (isLoading)
    return <Loading />
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row-reverse', gap: '20px', width: '100%' }}>
        <FilterSidebar3 />
        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '20px', padding: '4rem' }}>
          {jobsList.map((job) => (<div key={job._id}>
            <OccupationCard2
              job={job}
            />
          </div>)

          )}
          <div>

            {data?.data?.hasMore && <Button label="הצגת עיסוקים נוספים"
              style={{ display: 'flex', left: '50%', position: 'relative' }}
              onClick={()=>{setPage(page+1)}}
            />}</div>
        </div>


      </div>
    </>


  )
}
export default JobList