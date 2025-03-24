import FilterSidebar from "../../Components/FilterSideBar"
import FilterSidebar2 from "../../Components/FilterSideBar2"
import OccupationCard2 from "../../Components/OccupationCard2"

const JobList=()=>{
const JobList=[{jobname:"job2", }]
return(
    <>
    <div style={{ display: 'flex', flexDirection: 'row-reverse', gap: '20px', width: '100%' }}>
      {/* Sidebar on the left */}
      <FilterSidebar2/>
  
      {/* Content on the right */}
      
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '20px',padding:'4rem' }}>
        <div >
        <OccupationCard2
          title="שחקנית"
          description="גילום תפקידים ודמויות במופעים חיים, בטלוויזיה, ברדיו, בסרטונים, בהפקות קולנועיות ובמסגרות אחרות למטרות בידור או הוראה..."
          educationLevel="תעודת בגרות ומטה"
          salaryAvg="40"
        /></div>
                <div >


        <OccupationCard2
          title="שחקנית"
          description="גילום תפקידים ודמויות במופעים חיים, בטלוויזיה, ברדיו, בסרטונים, בהפקות קולנועיות ובמסגרות אחרות למטרות בידור או הוראה..."
          educationLevel="תעודת בגרות ומטה"
          salaryAvg="40"
        />
      </div>
      </div>
    </div>
  </>
  
  
)
}
export default JobList