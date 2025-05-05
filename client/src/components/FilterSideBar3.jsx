import { InputText } from "primereact/inputtext";
import { Slider } from "primereact/slider";
import { ToggleButton } from "primereact/togglebutton";
import { Divider } from 'primereact/divider';
import './FilterSideBar.css'; 
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber"
import { useSearchParams } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { useEffect } from "react";
        
const FilterSidebar3 = () => {
const initState={minWorkingHours:0,maxWorkingHours:50,sortBy:"jobname",offset:0,limit:2}


  const [searchParams,setSearchParams]=useSearchParams(initState)


  const handleFilterChange =(name,value) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set(name,value)
    newSearchParams.set("page",0)
  setSearchParams(newSearchParams);  
  };

  const handleFilterAppend = (name,value) => {
    const newSearchParams = new URLSearchParams(searchParams);
    let newVal=newSearchParams.get(name)?.split(',')||[]
    newVal.includes(value)?newVal=newVal.filter((v)=>v!=value):newVal.push(value)
    newSearchParams.set(name,newVal)
    newSearchParams.set("page",0)
    setSearchParams(newSearchParams); 
  }

 
const sortOptions={"א-ת":"jobname","שכר גבוה":"salaryAvg","שעות עבודה":"workingHoursAvg"}
const educationLevelOptions=["תואר אקדמאי","על-תיכוני","תעודת בגרות","ללא תעודת בגרות"]
  return (
    <>
    <div className="filter-sidebar">
   {/* Search Box */}
   <div>
          <IconField  iconPosition="left">
                <InputIcon className="pi pi-search"> </InputIcon>
                <InputText className="input-search" onChange={
                  (e)=>{handleFilterChange("q",e.target.value)}
                }
                  style={{direction:'rtl'}} placeholder="במה היית רוצה לעסוק?" />
            </IconField>
            </div>
      <Divider/>
      <div style={{display:'flex', flexDirection:'row-reverse',gap:'20px'}}>
        
        <h5 className="text-title">:מיון לפי</h5>
          <Dropdown  className="small-dropdown"
 
   options={ Object.keys(sortOptions)} value={Object.keys(sortOptions).find(k=>sortOptions[k]===searchParams.get("sortBy"))} onChange={(e)=>{handleFilterChange("sortBy",sortOptions[e.target.value])
   }}/>
        </div>
      
      <Divider/>
      {/* Salary Filter */}
      <div>
        <h5 className="text-title">חיפוש לפי תנאי עבודה</h5>
        <h6 className="text-second">כמה תרצו להרוויח בחודש? לחצו על כל טווחי השכר שמתאימים לכם</h6>

        <div >
          
        </div>
      </div>
      <Divider/>
      <div className="salary-container"
      >
        <InputNumber className="salary-input"
          value={searchParams.get("minSalary")}
          onValueChange={(e) => {handleFilterChange("minSalary",e.value)}}
        />
        <span>-</span>
        <InputNumber className="salary-input"
          value={searchParams.get("maxSalary")}
          onValueChange={(e) => {handleFilterChange("maxSalary",e.value)}}

        />
      </div>
      {/* Working hours Slider */}
      <div >
        <h5 className="text-second">שעות עבודה</h5>
        <h6 className="text-second">כמה שעות עבודה בשבוע? גררו את העיגולים עד שתגיעו לטווח הרצוי. הממוצע הוא כ-41</h6>
        <Slider

          value={[searchParams.get("minWorkingHours"),searchParams.get("maxWorkingHours")]}
          onChange={(e)=>{
            if(e.value[0]!=searchParams.get("minWorkingHours"))
           handleFilterChange("minWorkingHours",e.value[0])
             else
           handleFilterChange("maxWorkingHours",e.value[1])
            }}
          range
          min={0}
          max={50}
        />
        <p className="text-center">{searchParams.get("minWorkingHours")} - {searchParams.get("maxWorkingHours")}</p>
      </div>
      {/* Education Level */}
      <div  >
        <h5 className="text-title">חיפוש לפי השכלה</h5>
        <h6 className="text-second">לחצו על כל רמות ההשכלה הרלוונטיות לכם. כדאי לבחור גם השכלה נמוכה משלכם</h6>

        <div >
          
        <div >
        {educationLevelOptions.map(educationLevel=>
          <ToggleButton
            checked={searchParams.get("educationLevel")?.split(",").includes(educationLevel)}
            onChange={(e) =>{
              handleFilterAppend("educationLevel",educationLevel)
            }}
            onLabel={educationLevel}
            offLabel={educationLevel}
          />
        )
        }
          {/* <ToggleButton
            checked={searchParams.get("educationLevel")?.split(",").includes("תואר אקדמאי")}
            onChange={(e) =>{
              handleFilterAppend("educationLevel","תואר אקדמאי")
            }}
            onLabel="תואר אקדמאי"
            offLabel="תואר אקדמאי"
          />
          <ToggleButton
            checked={searchParams.get("educationLevel")?.split(",").includes("על-תיכוני")}
            onChange={(e) =>{
         handleFilterAppend("educationLevel","על-תיכוני")

            }}
            onLabel="על-תיכוני"
            offLabel="על-תיכוני"
          />
          <ToggleButton
            checked={searchParams.get("educationLevel")?.split(",").includes("תעודת בגרות")}
            onChange={(e) =>{
              handleFilterAppend("educationLevel","תעודת בגרות")

            }}
            onLabel="תעודת בגרות"
            offLabel="תעודת בגרות"
          />
           <ToggleButton
            checked={searchParams.get("educationLevel")?.split(",").includes("ללא תעודת בגרות")}
            onChange={(e) =>{
              handleFilterAppend("educationLevel","ללא תעודת בגרות")
            }}
            onLabel="ללא תעודת בגרות"
            offLabel="ללא תעודת בגרות"
          /> */}
        </div>
         
        </div>
      </div>
     
 
      <Divider/>
     
      <Button label="איפוס" onClick={()=>{setSearchParams(initState)}}className="p-button-primary w-full" />
    </div>
    {/* <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
    <Button label="show more" style={{
    position:'absolute'  ,
  bottom: '20px',
  //left: '50%',
  // height:'50px',
  // width:'50px',
  transform: 'translateX(-50%)'}}
  onClick={()=>{
    handleFilterChange("offset",parseInt(searchParams.get("limit"))+parseInt(searchParams.get("offset")))
 }}/></div> */}
    </>
  );
};

export default FilterSidebar3;
