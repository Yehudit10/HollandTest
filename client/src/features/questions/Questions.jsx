import { useEffect, useState } from "react"
import { useGetQuestionsQuery } from "./questionApiSlice"

const Questions=()=>{
// const [questionsList,setQuestionList]=useState([])
const {data:questionsList,isError,isLoading,isSuccess}=useGetQuestionsQuery()
questionsList.sort((q1,q2)=>{q1.number>q2.question})
useEffect(()=>{

},[])

const [currentQuestion,setCurrentQuestion]=useState(questionsList.findIndex(user.currentQuestion)+1)
return(
    <>
    questionsList[currentQuestion].
    <div>questionsList[currentQuestion].text</div>
    
    </>
)
}
export default Questions