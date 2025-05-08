import React from 'react';
import love from '../../images/love.svg';
import like from '../../images/like.svg'
import dontlike from '../../images/dont-like.svg'
import meh from '../../images/meh.svg'
import hate from '../../images/hate.svg'

import "./HollandPages.css"
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
const HollangPage2 = (props) => {
  return (
    <div 
    className='holland-container'
    >
      <div>
        <h1>איך זה עובד</h1>
        <p className='text-lg'
        >
          בשאלון יוצגו לך 60 פעולות מתחומי
          </p>
          <p className='text-lg'>
           עבודה מגוונים.
         
          </p>
          <p className='text-lg'>
          לגבי כל פעולה סמני אם היא מעניינת אותך ואם נראה
          </p>
          <p className='text-lg'>
           לך שהיית אוהבת לעשות אותה.
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}
      >
        <div style={{ margin: '0 10px' }}>
          <Image src={love} alt="אוהבת מאוד" style={{ width: '3wh', height: '3vh' }}/>
          <p>אוהבת מאוד</p>
        </div>
        <div style={{ margin: '0 10px' }}>
          <Image src={like} alt="כן אוהבת" style={{width: '3wh', height: '3vh' }} />
          <p>כן אוהבת</p>
        </div>
        <div style={{ margin: '0 10px' }}>
          <Image src={meh} alt="לא בטוחה" style={{width: '3wh', height: '3vh'}} />
          <p>לא בטוחה</p>
        </div>
        <div style={{ margin: '0 10px' }}>
          <Image src={dontlike} alt="לא אוהבת" style={{width: '3wh', height: '3vh' }} />
          <p>לא אוהבת</p>
        </div>
        <div style={{ margin: '0 10px' }}>
          <Image src={hate} alt="בכלל לא אוהבת" style={{ width: '50px', height: '50px' }} />
          <p>בכלל לא אוהבת</p>
        </div>
      </div>

      <div>
        <Button 
        onClick={props.nextPage}
     
        className='custom-button'
        >
          ועוד דבר אחד חשוב
        </Button>
      </div>
    </div>
  );
}

export default HollangPage2;