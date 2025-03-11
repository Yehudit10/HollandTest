import React from 'react';
import "./HollandPages.css"
import { Button } from 'primereact/button';
const HollandPage3 = () => {
    return (
      <div 
      className='holland-container'
      >
        <h1>כשאת עונה על השאלון</h1>
        <p 
        className='text-lg'
        >
      <span style={{ fontWeight: 'bold' }}>זכרי: זה לא מבחן ואין תשובות נכונות.</span>
      </p>
     
      <p className='text-lg'>
     <span style={{ fontWeight: 'bold' }}>אל תחשבי </span>איך לבצע את הפעולה
     </p>
     <p className='text-lg'>
      <span style={{ fontWeight: 'bold' }}>וגם לא</span> כמה לימודים צריך או מה השכר.
  </p>
        <p 
        
        className='text-lg'
        >השאלה היחידה היא - אם היית אוהבת לעשות אותה.
        </p>
        <p className='text-lg'>
         :)זה בסדר לדמיין 
        </p>
        <p 
        className='text-lg'
        >
          התחרטת על התשובה? אין בעיה, אפשר לחזור אחורה ולענות שוב.
        </p>
        <Button
  
className='custom-button'
    >
      בואי נתחיל
  </Button>
      </div>
    );
  };
  
  export default HollandPage3;