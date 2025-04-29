
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
import Loading from '../../../components/Loading';
import { useAddTestMutation, useDeleteTestMutation, useGetTestQuery, useUpdateTestMutation } from './testApiSlice';
import { useAddResultMutation } from '../result/resultApiSlice';
import {useGetChaptersQuery} from '../chapters/chapterApiSlice'
const  Question=()=> {
    const navigate=useNavigate()
    const {data:chapterData,isLoading:chapterIsLoading,isSuccess:chapterIsSuccess}=useGetChaptersQuery()
    const {data:testData,isError:testIsError,isLoading:testIsLoading,isSuccess:testIsSuccess}=useGetTestQuery()
    const[addTest,{data:newTestData}]=useAddTestMutation()
    const [updateTest,{}]=useUpdateTestMutation()
    const [deleteTest,{isSuccess:deleteIsSuccess}]=useDeleteTestMutation()
    const [saveResult,{data:resultData,isError:resultIsError,isSuccess:resultIsSuccess}]=useAddResultMutation()
    const [currentQuestion,setCurrentQuestion]=useState(0)
    const [userAnswers,setUserAnswers]=useState([])
    const [currentChapter,setCurrentChapter]=useState(0);
    const testId=testData?.data._id
    useEffect(()=>setCurrentChapter(0),[chapterIsSuccess])
    useEffect(()=>{
        const chapterId=userAnswers[currentQuestion]?.question?.chapterID
        if(chapterId!=currentChapter)
setCurrentChapter(chapterData?.data?.findIndex((c)=>c._id===chapterId))
        },[currentQuestion])
    useEffect(()=>{
        
        if(testIsSuccess)
        {
        if(testData==null)
        addTest()

    }},[testIsSuccess])
    useEffect(()=>{if(testData?.data){setUserAnswers(testData.data.test)
        const index=testData.data?.test?.findIndex((question)=>question.questionResult==null)
        if(index===-1)
       setCurrentQuestion(testData.data?.test?.length-1)
    else
    setCurrentQuestion(index)

}},[testData])
    
    useEffect(()=>{
       if(testId)
        updateTest({
    _id:testId,
    test:userAnswers?.map((answer)=>({question:answer.question._id,questionResult:answer.questionResult}))})
    },[userAnswers])
    useEffect(()=>{
        if(deleteIsSuccess&&resultIsSuccess)
        navigate(`/home/holland/results/${resultData.data._id}`)

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
        <Card 
        style={{height:"35vh",
        boxShadow: '0 8px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        display:'flex',
        flexDirection:'column',
        position:'relative',
   
        
      }}
      >
        <div>{chapterData?.data[currentChapter]?.description}</div>
        <div className='question-text'>{question.text}</div>
        <Image className='choosen-img' src={showImg(userAnswers[currentQuestion]?.questionResult)}></Image>
    <span style={{position:'absolute',bottom:'5%',left:'50%'}}>{currentQuestion+1}/{userAnswers.length}</span>

       </Card>         
        </>
        )
    }

    const handleAnswer=async (answer)=>{
        setUserAnswers((prevArray)=>{
    const newArray=[...prevArray]
    const updatedAnswer={question:newArray[currentQuestion].question,questionResult:answer}
   newArray[currentQuestion]=updatedAnswer
   return newArray})
         await new Promise(resolve => setTimeout(resolve, 500));
         // handleNext()
         if(currentQuestion<userAnswers.length-1)
         setCurrentQuestion(currentQuestion+1)
    }
    const handleNext=()=>{
        if(currentQuestion<userAnswers.length-1)
setCurrentQuestion(currentQuestion+1)

else{
    saveResult({testId})
    deleteTest({_id:testId})
}
    }
          if(testIsLoading||chapterIsLoading)
          return <Loading/> 
    return (
        <>
        
    <div className='question-container'>
    
    <Steps activeIndex={currentChapter} style={{marginTop:'3vh'}} model={chapterData?.data?.map(c=>({label:c.title}))} />
        <div className="carousel-wrapper">
            <Carousel value={userAnswers?.map((q)=>q.question)} numVisible={1} numScroll={1} 
             itemTemplate={showQuestion} 
             page={currentQuestion} 
             onPageChange={(e)=>{setCurrentQuestion(e.page)}}
             showNavigators={false} 
              showIndicators={false}
              style={{display:'flex',alignItems:'center',height:'35vh',width:'1vw',marginTop:'5vh'}}
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
            <Button  className="nav-button pi pi-angle-left" onClick={()=>{setCurrentQuestion(currentQuestion-1)}} disabled={currentQuestion===0}>לשאלה הקודמת</Button>
             <Button style={{direction:'rtl'}} className="nav-button pi pi-angle-right" onClick={handleNext} disabled={userAnswers[currentQuestion]?.questionResult==null}>{currentQuestion===userAnswers?.length-1?'לסיום':'לשאלה הבאה'}</Button>
             </div>
        </div>
       </>
    )
}
export default Question
        