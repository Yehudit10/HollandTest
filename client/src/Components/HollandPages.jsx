

import React, {  useState } from 'react';
import{Card}from'primereact/card'
import { Carousel } from 'primereact/carousel';
import HollandPage1 from './HollandPage1';
import HollandPage3 from './HollangPage3';
import HollangPage2 from './HollandPage2';

const HollandPages=()=> {




const  [activePage,setActivePage]=useState(2)

const nextPage=()=>{
    setActivePage((activePage+2)%3)
}
const showComps=(comp)=>{
    
   return comp
   
}
const responsiveOptions = [
    { breakpoint: '1400px', numVisible: 1, numScroll: 1 },
    { breakpoint: '1199px', numVisible: 1, numScroll: 1 },
    { breakpoint: '767px', numVisible: 1, numScroll: 1 },
    { breakpoint: '575px', numVisible: 1, numScroll: 1 }
];

    return (
        <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
        <Card className="card" style={{display:'flex',alignItems:'center',height:'80vh',width:'53vw',marginTop:'10vh'}}>
            <Carousel  numVisible={1} numScroll={1} value={[<HollandPage3/>,<HollangPage2 nextPage={nextPage}/>,<HollandPage1 nextPage={nextPage}/>]} responsiveOptions={responsiveOptions} className="custom-carousel" 
             itemTemplate={showComps}   page={activePage} 
             onPageChange={(e)=>{setActivePage(e.page)}}
             style={{width:"50vw"}}
              />
        </Card>
        </div>
    )
}

        
export default HollandPages
        