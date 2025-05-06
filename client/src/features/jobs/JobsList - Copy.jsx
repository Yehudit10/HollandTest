import { useEffect, useState } from "react"
import Loading from "../../components/Loading"
import OccupationCard2 from "../../components/OccupationCard2"
import { useGetJobsQuery } from "./jobApiSlice"
import { useSearchParams } from "react-router-dom"
import FilterSidebar3 from "../../components/FilterSideBar3"
import { Button } from "primereact/button"

const JobList = () => {
  const [searchParams, setSearchParams] = useSearchParams({ page: 0, pageSize: 2 })
  const queryParams = Object.fromEntries(searchParams.entries());
  const { data, isError, isSuccess, isLoading } = useGetJobsQuery(queryParams)
  const [jobsList, setJobsList] = useState([])
// useEffect(()=>{
//   const page=searchParams.get("page") !== "0"
// if(page !== "0")
// {
//   const newSearchParams = new URLSearchParams(searchParams)
//   newSearchParams.set("page",  0)
//   newSearchParams.set("pageSize",  page)
//   setSearchParams(newSearchParams);
// }
// if(isSuccess)
// {
//   const newSearchParams = new URLSearchParams(searchParams)
//   newSearchParams.set("page",  page)
//   newSearchParams.set("pageSize",2)
//   setSearchParams(newSearchParams);
// }
// },[isSuccess])

 
  useEffect(() => {
    if (isSuccess) {
      if (searchParams.get("page") === "0") setJobsList(data?.data?.jobs)
      else
        setJobsList([...jobsList, ...(data?.data.jobs || [])])
    }
  }, [data])
const handleNextPage=()=>{
  const newSearchParams = new URLSearchParams(searchParams)
  newSearchParams.set("page", 1 + parseInt(searchParams.get("page") || 0))
  setSearchParams(newSearchParams);
}
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
              onClick={handleNextPage}
            />}</div>
        </div>


      </div>
    </>


  )
}
export default JobList