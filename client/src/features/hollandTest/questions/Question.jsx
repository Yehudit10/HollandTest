
import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import './Question2.css'
import love from '../../images/love.svg';
import like from '../../images/like.svg'
import dontlike from '../../images/dont-like.svg'
import meh from '../../images/meh.svg'
import hate from '../../images/hate.svg'
import { Image } from 'primereact/image';
import { Card } from 'primereact/card';
import { Steps } from 'primereact/steps';
import { useNavigate } from 'react-router-dom';
import { useGetQuestionsQuery } from './questionApiSlice';
import Loading from '../../../components/Loading';
import { useAddTestMutation, useDeleteTestMutation, useGetTestQuery, useUpdateTestMutation } from './testApiSlice';
import { useAddResultMutation } from '../result/resultApiSlice';
const  Question=()=> {
    const navigate=useNavigate()
    const{data:QuestionData,isError,isSuccess,isLoading}=useGetQuestionsQuery()
    const questionsList=QuestionData?.data
    const {data:testData,isError:testIsError,isLoading:testIsLoading,isSuccess:testisSuccess}=useGetTestQuery()
    const[addTest,{data:newTestData}]=useAddTestMutation()
    const [updateTest,{}]=useUpdateTestMutation()
    const [deleteTest,{isSuccess:deleteIsSuccess}]=useDeleteTestMutation()
    const [saveResult,{data:resultData,isError:resultIsError,isSuccess:resultIsSuccess}]=useAddResultMutation()

    // if(testData?.data===null&&testData?.data.status===204)
    // addTest()
    const [currentQuestion,setCurrentQuestion]=useState(0)
    // const [currentQuestion,setCurrentQuestion]=useState(testData?.data?.answers?.length||0)
    // const [userAnswers,setUserAnswers]=useState(testData?.data?.answers||[])
    const [userAnswers,setUserAnswers]=useState([])
    const [currentChapter,setCurrentChapter]=useState(0);
    useEffect(()=>{
        if(testisSuccess)
        {
        if(testData===null)
        addTest()
        else
        {
            setUserAnswers(testData.data?.answers)
            setCurrentQuestion(testData.data?.answers?.length)
        }
    }},[testisSuccess])
    useEffect(()=>{
        if(testData)
        updateTest({_id:testData.data._id,answers:userAnswers})
    },[userAnswers])
    useEffect(()=>{
        if(deleteIsSuccess&&resultIsSuccess)
        navigate(`result/${resultData.data._id}`)

    },[deleteIsSuccess])
const showImg=(num)=>{
 
switch(num)
{
    case 4: return love;
    case 3:return like;
    case 2:return meh;
    case 1:return dontlike;
    case 0:return hate;
}
    }
    const showQuestion=(question)=>{
        return(<>
        <Card style={{height:"35vh",
        boxShadow: '0 8px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        display:'flex',
        flexDirection:'column',
        position:'relative'
      }}>
        <div className='qeustion-text'>{question.text}</div>
        {userAnswers.length>currentQuestion&&<Image className='choosen-img' src={showImg(userAnswers[currentQuestion].questionResult)}></Image>} 
    <span style={{position:'absolute',bottom:'5%',left:'50%'}}>{currentQuestion+1}/{questionsList.length}</span>

       </Card>         
        </>
        )
    }

    const handleAnswer=async (answer)=>{
        const detailedAnswer={questionChapter:questionsList[currentQuestion].chapterID,questionType:questionsList[currentQuestion].type,questionResult:answer}
        if(currentQuestion>userAnswers.length)
            setUserAnswers([...userAnswers,detailedAnswer])
        else
        setUserAnswers((prevArray)=>{
    const newArray=[...prevArray]
    newArray[currentQuestion]=detailedAnswer
   return newArray})
         await new Promise(resolve => setTimeout(resolve, 500));
         // handleNext()
         if(currentQuestion<questionsList.length-1)
         setCurrentQuestion(currentQuestion+1)
    }
    const handleNext=()=>{
        if(currentQuestion<questionsList.length-1)
setCurrentQuestion(currentQuestion+1)

else{
    saveResult({testId:testData?.data._id||newTestData.data._id})
    deleteTest({_id:testData.data._id})
}
    }
    const handlePrev=()=>{
        setCurrentQuestion(currentQuestion-1)
            }
          if(isLoading||testIsLoading)
          return <Loading/> 
    return (
        <>
        
    <div className='question-container'>
    <Steps activeIndex={currentChapter} style={{marginTop:'3vh'}} model={[{label:'חלק ראשון'},{label:'חלק שני'},{label:'חלק שלישי'}]} />
        <div className="carousel-wrapper">
            <Carousel value={questionsList} numVisible={1} numScroll={1} 
             itemTemplate={showQuestion} 
             page={currentQuestion} 
             onPageChange={(e)=>{setCurrentQuestion(e.page)}}
             showNavigators={false} 
              showIndicators={false}
              style={{display:'flex',alignItems:'center',height:'35vh',width:'30vw',marginTop:'5vh'}}
             />
           </div>
             <div className='answer-buttons-container'>
             <Button onClick={async()=>{await handleAnswer(4)}} className='answer-button' label="אוהבת מאוד" icon={<img src={love} className='icon-button'/>} />
             <Button onClick={async()=>{await handleAnswer(3)}} className='answer-button' label="כן אוהבת" icon={<img src={like}  className='icon-button' />} />
             <Button onClick={async()=>{await handleAnswer(2)}} className='answer-button' label="לא בטוחה"icon={<img src={meh}  className='icon-button' />} />
             <Button onClick={async()=>{await handleAnswer(1)}} className='answer-button' label="לא אוהבת" icon={<img src={dontlike}  className='icon-button' />} />
             <Button onClick={async()=>{await handleAnswer(0)}} className='answer-button' label="בכלל לא אוהבת" icon={<img src={hate}  className='icon-button' />} />
              
             </div>
             <div className="navigation-buttons">
            <Button  className="nav-button pi pi-angle-left" onClick={handlePrev} disabled={currentQuestion===0}>לשאלה הקודמת</Button>
             <Button style={{direction:'rtl'}} className="nav-button pi pi-angle-right" onClick={handleNext} disabled={currentQuestion===userAnswers?.length}>{currentQuestion===questionsList?.length-1?'לסיום':'לשאלה הבאה'}</Button>
             </div>
        </div>
       </>
    )
}
export default Question
        