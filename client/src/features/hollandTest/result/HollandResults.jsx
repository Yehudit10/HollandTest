import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import HollandType from '../../../components/HollandType';
import HollandMatch from '../../../components/HollandMatch';
import Sidebar from '../../../components/SideBar';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import { Button } from 'primereact/button';
import { useGetSentencesQuery } from './resultApiSlice';
import { useGetTypesQuery } from '../../types/typeApiSlice';
import Loading from '../../../components/Loading';
import useGetFilePath from '../../../hooks/useGetFilePath';
import { useGetJobsQuery } from '../../jobs/jobApiSlice';
import OccupationCard2 from '../../../components/OccupationCard2';
import { useSendEmailMutation } from '../../email/emailApiSlice';

const HollandResults = () => {
    const{resultId}=useParams()
    const {getFilePath}=useGetFilePath()
    const {data:sentencesData,isError,isSuccess:sentencesIsSuccess,isLoading:sentencesIsLoading}=useGetSentencesQuery(resultId)
    const {data:typesData,isSuccess:typesIsSuccess,isLoading:typesIsLoading}=useGetTypesQuery()
    const {data:jobsData,isSuccess:jobsIsSuccess,isLoading:jobsIsLoading}=useGetJobsQuery()
    let result
    const [sumAll,setSumAll]=useState(1)
    const [selected,setSelected]=useState([])
    const [sums,setSums]=useState({R:0,I:0,A:0,S:0,E:0,C:0})
    useEffect(
    ()=>{
        if(sentencesIsSuccess) 
        {
        result=sentencesData.data.result
        // setSums({R:0,I:0,A:0,S:0,E:0,C:0})
        //  for(const type in result) 
        //  {setSums(prevSums => ({
        //     ...prevSums,
        //     [type]: prevSums[type] + result[type].interest + result[type].work + result[type].capability
        // })) 
        let tempSums = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
        
        for (const type in result) {
            tempSums[type] += result[type].interest +
                              result[type].work +
                              result[type].capability;
            if(result[type].select)
            setSelected(prevSelected => [...prevSelected, type])
      
        }
        setSums(tempSums)
        setSumAll(Object.values(sums).reduce((acc, val) => acc + val, 0));
    }
        //setSumAll(Object.values(sums).reduce((acc, val) => acc + val, 0))
    },[sentencesIsSuccess])

    useEffect(() => {
        setSumAll(Object.values(sums).reduce((acc, val) => acc + val, 0));
    }, [sums]); 
    const matchPercentage=(job)=>{
        let match=100
        typesData.data.forEach(({_id,type})=>{
            match=match-Math.abs((sums[type]/36)*100-(job.relatedTypes.find((relatedType)=>relatedType.type===_id)?.match||0))/6
        })
         return match
    }
    const contentRef=useRef()
    const [sendMail,{}]=useSendEmailMutation()
const sendEmail=async()=>{
    const page=contentRef.current
const canvas=await html2canvas(page,{scale:1.5,useCORS: true})
const imgData = canvas.toDataURL("image/jpeg", 0.6);
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210; 
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        const blob = pdf.output('blob');
const formData = new FormData();
formData.append('pdf', blob, 'resultPdf.pdf');
formData.append('emailTemplate', 'sendResult');
formData.append('emailParams',JSON.stringify({username:"yehudit"}));
// formData.append('html',`<!DOCTYPE html>
// <html lang="he" dir="rtl">
//   <head>
//     <meta charset="UTF-8" />
//     <title>תוצאות חדשות מחכות לך</title>
//     <style>
//       body {
//         font-family: Arial, sans-serif;
//         background-color: #f2f2f2;
//         margin: 0;
//         padding: 0;
//         direction: rtl;
//       }
//       .container {
//         max-width: 600px;
//         margin: 20px auto;
//         background-color: #ffffff;
//         border-radius: 8px;
//         box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
//         overflow: hidden;
//       }
//       .header {
//         background-color: #007ad9;
//         color: #ffffff;
//         text-align: center;
//         padding: 20px;
//       }
//       .content {
//         padding: 30px;
//         font-size: 16px;
//         color: #333333;
//       }
//       .button {
//         display: inline-block;
//         margin-top: 20px;
//         background-color: #007ad9;
//         color: #ffffff;
//         padding: 12px 24px;
//         text-decoration: none;
//         border-radius: 6px;
//       }
//       .footer {
//         text-align: center;
//         font-size: 12px;
//         color: #999999;
//         padding: 20px;
//       }
//     </style>
//   </head>
//   <body>
//     <div class="container">
//       <div class="header">
//         <h1>תוצאות מבחן הולנד זמינות עבורך</h1>
//       </div>
//       <div class="content">
//         <p>שלום {{userName}},</p>
//         <p>סיימת את מבחן הולנד, והתוצאות שלך מוכנות לצפייה.</p>
//         <p>כדי לצפות בתוצאות שלך, הורד את הקובץ:</p>
//         <a class="button" href="{{resultsLink}}">צפייה בתוצאות</a>
//         <p>בהצלחה בהמשך הדרך,<br/>צוות HollandTest</p>
//       </div>
//       <div class="footer">
//         מייל זה נשלח באופן אוטומטי. אין להשיב אליו.
//       </div>
//     </div>
//   </body>
// </html>`)
sendMail(formData)
}


const downloadPDF=async()=>{
const page=contentRef.current
const canvas=await html2canvas(page,{scale:1.5,useCORS: true})
const imgData = canvas.toDataURL("image/jpeg", 0.6);
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210; 
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("download.pdf"); 
    }


    if(sentencesIsLoading||typesIsLoading||jobsIsLoading)
    return <Loading/>
    return(

        <div ref={contentRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
          
     <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', paddingLeft: '20px' }}>
    <Button data-html2canvas-ignore="true"
        label="הורד PDF" 
        icon="pi pi-download" 
        className="p-button-raised p-button-rounded p-button-info"
        onClick={downloadPDF} 
    />
     <Button data-html2canvas-ignore="true"
        label="שליחה למייל" 
        icon="pi pi-envelope" 
        className="p-button-raised p-button-rounded p-button-info"
        onClick={sendEmail} 
    />
</div>

            <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>התוצאות</h1>
            <p style={{ fontSize: '16px', textAlign: 'center', marginBottom: '20px' }}>
                לפי התשובות שלך לשאלון הולנד, אלה הטיפוסים העיקריים המאפיינים אותך. בהמשך העמוד תוכלי לראות את העיסוקים המתאימים.
            </p>
            <Link data-html2canvas-ignore="true" to="/home/holland/holland-info" className="holland-link">
            ←מהו שאלון הולנד? למידע נוסף
            </Link>
            <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>הטיפוסים העיקריים שלך</h2>
            <div 
            style={{ display: 'flex', 
            justifyContent: 'space-around', 
             width: '100%',
           
             marginBottom: '20px' }}
            >
    
            {/* {
            selected?.map((type)=>{
                detailedType=typesData.data.find((t)=>t.type===type)
                return <HollandType  image={getFilePath(typesData?.data[type].image)} title={typesData?.data[type].title} description={typesData?.data[type].description}/>
            })} */}
             {
           [...typesData?.data].filter(({type})=>selected?.includes(type)).sort(({type:type1},{type:type2})=>sums[type1]-sums[type2]).map(({type,image,title,description})=>
           
                <HollandType  image={getFilePath(image)} title={title} description={description}/>
            )}
            </div>
        {sentencesData?.data?.sentences.map((sentence)=><div>{sentence}</div>)}
            <div  style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '20px', width: '100%' }}>
                <div  style={{ flexGrow: 1 }}>
                    <h2 style={{ textAlign: 'center' }}>עיסוקים שיכולים להתאים לטיפוס שלך</h2>

                   
               {[...jobsData?.data?.jobs].sort((job1,job2)=>{return (matchPercentage(job2)-matchPercentage(job1))}).map((job)=>
                       <OccupationCard2
                       job={job}
                       matchPercentage={matchPercentage(job)}
                   /> 
                    )}
                </div>
                <div style={{ flexGrow: 1, maxWidth: '300px', alignSelf: 'flex-start' }}>
                    <h2>ההתאמה שלך לכל טיפוס</h2>
                    {typesData?.data.map(({type,title})=>
                    <HollandMatch title={title}  percentage={Math.round((sums[type]/sumAll)*100)} />
                      
                    )}
                    
                </div>
            </div>
            {/* <span data-html2canvas-ignore="true">
            <Sidebar/>
            </span> */}
        </div>
        

    );
};

export default HollandResults;