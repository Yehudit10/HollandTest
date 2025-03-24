import OccupationCard from "../../Components/OccupationCard"
import Sidebar from "../../Components/SideBar"

const SubjectsList=()=>{
    const subjectsList=[{ title:"BI", description:"תאור ארוך מאוד מאוד....", educationLevel:"אוניברסיטה", matchPercentage:"30" },
    { title:"BI2", description:"תאור ארוך מאוד מככככאוד....", educationLevel:"כככ אוניברסיטה", matchPercentage:"30" }]
return(
<>
<Sidebar/>
{subjectsList.map((subject)=>{
    return <OccupationCard title={subject.title} description={subject.description} educationLevel={subject.educationLevel}matchPercentage={subject.matchPercentage}/>
})}
</>
)
}
export default SubjectsList