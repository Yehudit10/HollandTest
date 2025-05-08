import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import HollandType from '../../../components/hollandTestPages/HollandType';
import HollandMatch from './HollandMatch';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import { Button } from 'primereact/button';
import { useGetSentencesQuery } from './resultApiSlice';
import { useGetTypesQuery } from '../../types/typeApiSlice';
import Loading from '../../../components/generals/Loading';
import useGetFilePath from '../../../hooks/useGetFilePath';
import { useGetJobsQuery } from '../../jobs/jobApiSlice';
import OccupationCard2 from '../../../components/generals/OccupationCard2';
import { useSendEmailMutation } from '../../email/emailApiSlice';
import useAuth from "../../../hooks/useAuth"
import { resultTemplate } from './resultTemplate';
const HollandResults = () => {
    const{resultId}=useParams()
    const {getFilePath}=useGetFilePath()
    const {username,email}=useAuth()
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
formData.append('pdf', blob, 'resultPdf.pdf')
formData.append('to',email)
formData.append('html',resultTemplate(username))

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
          
     <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', paddingLeft: '20px',gap:'10px' }}>
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
    
        
             {
           [...typesData?.data].filter(({type})=>selected?.includes(type)).sort(({type:type1},{type:type2})=>sums[type1]-sums[type2]).map(({type,image,title,description})=>
           
                <HollandType  image={getFilePath(image)} title={title} description={description}/>
            )}
            </div>
        {sentencesData?.data?.sentences.map((sentence)=><div style={{
        fontFamily: "'Roboto', sans-serif",
        fontSize: '1.1rem',
        fontWeight: '600', // bold font
        // lineHeight: '1.8',
        marginBottom: '0.3rem',
        color: '#333',
        // letterSpacing: '0.5px',
      }}>{sentence}</div>)}
            <div  style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '20px', width: '100%' }}>
                <div  style={{ flexGrow: 1 }}>
                    <h2 style={{ textAlign: 'center' }}>עיסוקים שיכולים להתאים לטיפוס שלך</h2>

                   
               {[...jobsData?.data?.jobs].sort((job1,job2)=>{return (matchPercentage(job2)-matchPercentage(job1))}).slice(0,10).map((job)=>
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
        </div>
        

    );
};

export default HollandResults;