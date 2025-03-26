import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Slider } from "primereact/slider";
import { ToggleButton } from "primereact/togglebutton";
import { Button } from "primereact/button";
import { Chips } from "primereact/chips";
import { Divider } from 'primereact/divider';
import './FilterSideBar.css'; // Import your custom CSS file
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputNumber } from "primereact/inputnumber"
import { InputSwitch } from 'primereact/inputswitch';
import { Checkbox } from "primereact/checkbox";
import {  useNavigate, useSearchParams } from "react-router-dom";
        
const FilterSidebar3 = () => {
const navigate=useNavigate()
  const [searchParams,setSearchParams]=useSearchParams()
  const [filter,setFilter]=useState({
    salaryRanges:[],
    workingHoursMin:0,
    workingHoursMax:50,
    educationLevel:[]
  })
  
  const [range, setRange] = useState([1,9]);
  const handleFilterChange = () => {
    const newSearchParams = new URLSearchParams(filter).toString();
     navigate(`?${newSearchParams}`)
  };
  useEffect(handleFilterChange,[filter])
  const handleFilterAppend = (name,value) => {
    const newSearchParams = new URLSearchParams(searchParams);
    const newVal=newSearchParams.get(name)?.split(',')||[]
    newVal.includes(value)?newVal.filter((v)=>v!=value):newVal.push(value)
    newSearchParams.set(name,newVal)
    setSearchParams(newSearchParams); 
  };

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [toggles, setToggles] = useState({
    remote: false,
    partTime: false,
    internships: false,
  });

 

  return (
    <div className="filter-sidebar">
     
      {/* Search Box */}
          <IconField  iconPosition="left">
                <InputIcon className="pi pi-search"> </InputIcon>
                <InputText className="input-search" onChange={
                  (e)=>{setFilter({...filter,q:e.target.value})
                }
                  } style={{direction:'rtl'}} placeholder="במה היית רוצה לעסוק?" />
            </IconField>
{/* <Divider/> */}
      {/* Career Selection */}
      {/* <div >
        <h5 className="text-title">בחירת העדפות</h5>
        <h6 className="text-second">מה מענין אתכם? בחרו עולם תוכן מהרשימה</h6>
        <Dropdown className="category-sel"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.value)}
          options={categories}
          placeholder="עוד לא החלטתי"
        />
      </div> */}
      <Divider/>
      {/* Salary Filter */}
      <div className="mb-3" >
        <h5 className="text-title">חיפוש לפי תנאי עבודה</h5>
        <h6 className="text-second">כמה תרצו להרוויח בחודש? לחצו על כל טווחי השכר שמתאימים לכם</h6>

        <div >
          
        <div className="flex flex-column gap-2">
          <ToggleButton
            checked={searchParams.getAll("salaryRanges")?.includes("0,7000")}
            onChange={(e) =>{
          setFilter({...filter,salaryRanges:[...filter.salaryRanges,[0,7000]]})
            }}
            onLabel="עד ₪7000"
            offLabel="עד ₪7000"
          />
          <ToggleButton
           checked={searchParams.getAll("salaryRanges")?.includes("7000,10000")}

            onChange={(e) =>{
              handleFilterAppend("salaryRanges",[7000,10000])
              console.log(searchParams.getAll("salaryRanges"))
                }}
            onLabel="7000₪ עד 10000₪"
            offLabel="7000₪ עד 10000₪"
          />
          <ToggleButton
            checked={searchParams.salaryRanges?.includes({min:10000,max:13000})}
            onChange={(e) => setToggles({ ...toggles, internships: e.value })}
            onLabel="10000₪ עד 13000₪"
            offLabel="10000₪ עד 13000₪"
          />
           <ToggleButton
            checked={searchParams.salaryRanges?.includes({min:13000,max:18000})}
            onChange={(e) => setToggles({ ...toggles, internships: e.value })}
            onLabel="18000₪ עד 13000₪"
            offLabel="18000₪ עד 13000₪"
          />
           <ToggleButton
            checked={searchParams.salaryRanges?.includes({min:18000,max:null})}
            onChange={(e) => setToggles({ ...toggles, internships: e.value })}
            onLabel="מעל 18000₪"
            offLabel="מעל 18000₪"
          />
        </div>
        </div>
      </div>
      <Divider/>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <InputNumber
          value={range[0]}
          onValueChange={(e) => ({ value: [e.value, range[1]] })}
          
          showButtons
        />
        <span>-</span>
        <InputNumber
          value={range[1]}
          onValueChange={(e) => ({ value: [range[0], e.value] })}
         
          showButtons
        />
      </div>
      {/* Experience Slider */}
      <div className="mb-3">
        {/* <h5 className="text-title">ניסיון</h5> */}
        <h6 className="text-second">כמה שעות עבודה בשבוע? גררו את העיגולים עד שתגיעו לטווח הרצוי. הממוצע הוא כ-41</h6>
        <Slider
        
          value={[filter.workingHoursMin,filter.workingHoursMax]}
          onChange={(e)=>{
            setFilter({...filter,workingHoursMin:e.value[0],workingHoursMax:e.value[1]})
            }}
          range
          min={0}
          max={50}
        />
        <p className="text-center">{filter.workingHoursMin} - {filter.workingHoursMax}</p>
      </div>
      <div className="mb-3" >
        <h5 className="text-title">חיפוש לפי השכלה</h5>
        <h6 className="text-second">לחצו על כל רמות ההשכלה הרלוונטיות לכם. כדאי לבחור גם השכלה נמוכה משלכם</h6>

        <div >
          
        <div className="flex flex-column gap-2">
          <ToggleButton
            checked={filter.educationLevel.includes("תואר אקדמאי")}
            onChange={(e) =>{
          setFilter({...filter,educationLevel:[...filter.educationLevel,"תואר אקדמאי"]})
            }}
            onLabel="תואר אקדמאי"
            offLabel="תואר אקדמאי"
          />
          <ToggleButton
            checked={filter.educationLevel.includes("על תיכונית")}
            onChange={(e) =>{
          setFilter({...filter,educationLevel:[...filter.educationLevel,"על תיכונית"]})
            }}
            onLabel="על תיכונית"
            offLabel="על תיכונית"
          />
          <ToggleButton
            checked={filter.educationLevel.includes("תעודת בגרות")}
            onChange={(e) =>{
          setFilter({...filter,educationLevel:[...filter.educationLevel,"תעודת בגרות"]})
            }}
            onLabel="תעודת בגרות"
            offLabel="תעודת בגרות"
          />
           <ToggleButton
            checked={filter.educationLevel.includes("ללא תעודת בגרות")}
            onChange={(e) =>{
          setFilter({...filter,educationLevel:[...filter.educationLevel,"ללא תעודת בגרות"]})
            }}
            onLabel="ללא תעודת בגרות"
            offLabel="ללא תעודת בגרות"
          />
        </div>
         
        </div>
      </div>
     
    
      {/* Toggle Buttons */}
      
      <Divider/>
     
      {/* <Button label="הצג תוצאות מתאימות" className="p-button-primary w-full" /> */}
    </div>
  );
};

export default FilterSidebar3;
