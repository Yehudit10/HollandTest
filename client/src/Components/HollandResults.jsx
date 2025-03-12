import React, { useRef } from 'react';
import { Link } from "react-router-dom";
import HollandType from './HollandType';
import Artistic from '../images/Artistic.png';
import Realistic from '../images/Realistic.png';
import Social from '../images/Social.png';
import Investigative from '../images/Investigative.png';
import Enterprising from '../images/Enterprising.png';
import Conventional from '../images/Conventional.png';
import HollandMatch from './HollandMatch';
import OccupationCard from './OccupationCard';
import Sidebar from './SideBar';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import { Button } from 'primereact/button';
const HollandResults = () => {
    const contentRef=useRef()

    const downloadPDF=async()=>{
const page=contentRef.current
const canvas=await html2canvas(page,{scale:1.5})
const imgData = canvas.toDataURL("image/jpeg", 0.6);
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("download.pdf"); 
    }
    return (
        <div ref={contentRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
     <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', paddingLeft: '20px' }}>
    <Button data-html2canvas-ignore="true"
        label="הורד PDF" 
        icon="pi pi-download" 
        className="p-button-raised p-button-rounded p-button-info"
        onClick={downloadPDF} 
    />
</div>

            <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>התוצאות</h1>
            <p style={{ fontSize: '16px', textAlign: 'center', marginBottom: '20px' }}>
                לפי התשובות שלך לשאלון הולנד, אלה הטיפוסים העיקריים המאפיינים אותך. בהמשך העמוד תוכלי לראות את העיסוקים המתאימים.
            </p>
            <Link data-html2canvas-ignore="true" to="/holland-info" className="holland-link">
            ←מהו שאלון הולנד? למידע נוסף
            </Link>
            <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>הטיפוסים העיקריים שלך</h2>
            <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginBottom: '20px' }}>
                <HollandType  image={Artistic} title="אומנותית" description="אוהבת פעילות מעורפלת, לא שיטתית. יצירתית ומקורית בחשיבה ובקשר עם העולם. אוהבת עיסוק בחומרים ובמלל. מבטאת את עצמה דרך יצירה ואומנות. לא אוהבת כללים ונורמות. אוהבת חופש פעולה. יש לה ראייה סובייקטיבית, מורכבת ומקורית של תופעות. מתחברת לאנשים דרך רגש, דימיון, אומנות ואסתטיקה. לא אוהבת סטנדרטיזציה." />
                <HollandType image={Realistic} title="ביצועית" description="מעשית, פרקטית, אוהבת פעילויות שתוצאותיהן מיידיות, שכוללות פעילות פיזית. אוהבת סדר, פעילויות מוגדרות, מוחשיות וברורות. בעלת כושר ויכולת טכנית, יכולת מתמטית, יכולת מוטורית וקואורדינציה. פחות אוהבת עבודה עם ניירת ופחות זקוקה לקשר עם אנשים אחרים או מעורבות רגשית. זקוקה לכללים ולקריטריונים ברורים להערכת מעשיה." />
                <HollandType image={Social} title="חברתית" description="אוהבת לעבוד עם אנשים, פחות אוהבת לעבוד עם מכונות וחומרים. אוהבת ומוכשרת ביצירת קשרים חברתיים ובין אישיים. אוהבת לסייע לאנשים ללמוד ולהתפתח, לעזור לאנשים לפתור בעיות אישיות. אוהבת ללמד ולייעץ לאנשים אחרים. שמה דגש על רגש, פחות מתחברת לפעילויות שיטתיות ורציונליות. אמפתית ורגישה לצרכים של אחרים, מבינה סיטואציות חברתיות." />
                <HollandType image={Investigative} title="חקרנית" description="מעדיפה פעילויות שדורשות חשיבה, חקירה ובחינה שיטתית ואנליטית של תופעות. אוהבת לעבוד כאינדבידואלית ופחות אוהבת פעילות חברתיות. אוהבת דיוק והסתכלות על פרטים, בחינה של עובדות ופתרון בעיות. פחות מתחברת לפעילות פיזית." />
                <HollandType image={Enterprising} title="יזמית" description="אוהבת עשייה, ביצוע והשגת מטרות. אוהבת לפעול ולהוביל תהליכים ואנשים. בעלת יכולת השפעה על אנשים ושכנוע. אוהבת לעבוד עם אנשים שהיא מובילה, לקבל החלטות. לא אוהבת להיות מובלת. יכולת בינאישית טובה. אוהבת לקחת סיכונים לצורך רווח והשגת מטרות. מחפשת גיוון." />
                <HollandType image={Conventional} title="מנהלית" description="אוהבת סדר, נהלים ומסגרת. אוהבת רוטינות וכללים ואוהבת שפועלים לאורם. אוהבת היררכיה ובהירות. שמה לב לפרטים, מדויקת ושיטתית. אוהבת לתכנן ולפעול על פי התכנון. מעדיפה תהליכים ברורים ומוגדרים. לא מתחברת לעמימות ולחריגה מן הנורמה." />
            </div>
            <div  style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '20px', width: '100%' }}>
                <div data-html2canvas-ignore="true" style={{ flexGrow: 1 }}>
                    <h2 style={{ textAlign: 'center' }}>עיסוקים שיכולים להתאים לטיפוס שלך</h2>
                    <OccupationCard
                        title="שחקנית"
                        description="גילום תפקידים ודמויות במופעים חיים, בטלוויזיה, ברדיו, בסרטונים, בהפקות קולנועיות ובמסגרות אחרות למטרות בידור או הוראה..."
                        educationLevel="תעודת בגרות ומטה"
                        matchPercentage={77.5}
                    />
                    <OccupationCard
                        title="שחקנית"
                        description="גילום תפקידים ודמויות במופעים חיים, בטלוויזיה, ברדיו, בסרטונים, בהפקות קולנועיות ובמסגרות אחרות למטרות בידור או הוראה..."
                        educationLevel="תעודת בגרות ומטה"
                        matchPercentage={77.5}
                    />
                </div>
                <div style={{ flexGrow: 1, maxWidth: '300px', alignSelf: 'flex-start' }}>
                    <h2>ההתאמה שלך לכל טיפוס</h2>
                    <HollandMatch title="אומנותית" percentage={77.5} />
                    <HollandMatch title="ביצועית" percentage={0} />
                    <HollandMatch title="חברתית" percentage={77.5} />
                    <HollandMatch title="חקרנית" percentage={77.5} />
                    <HollandMatch title="יזמית" percentage={77.5} />
                    <HollandMatch title="מנהלית" percentage={77.5} />
                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                        <button data-html2canvas-ignore="true" style={{
                            padding: '10px 20px',
                            backgroundColor: '#e0f7fa',
                            border: '1px solid #b2ebf2',
                            borderRadius: '5px',
                            marginBottom: '10px',
                            marginRight: '10px'
                        }}>
                            עריכת השאלון
                        </button>
                        <button data-html2canvas-ignore="true" style={{
                            padding: '10px 20px',
                            backgroundColor: '#e0f7fa',
                            border: '1px solid #b2ebf2',
                            borderRadius: '5px'
                        }}>
                            איפוס השאלון
                        </button>
                    </div>
                </div>
            </div>
            <span data-html2canvas-ignore="true">
            <Sidebar/>
            </span>
            {/* <button data-html2canvas-ignore="true" onClick={downloadPDF}>download</button> */}
        </div>
    );
};

export default HollandResults;