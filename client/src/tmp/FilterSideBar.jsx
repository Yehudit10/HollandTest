import React, { useState } from "react";
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

import { InputSwitch } from 'primereact/inputswitch';
import { Checkbox } from "primereact/checkbox";
import {  useSearchParams } from "react-router-dom";
        
const FilterSidebar = () => {
 
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchParams,setSearchParams]=useSearchParams()
  const parse=(params)=>({
    q:params.get("q"),
    workingHours:params.get("workingHours")?.split('-')||[],
    salaryRanges:params.get("salaryRanges")?.split(',').map(range => range.split("-").map(Number))||[],
    sortBy:params.get("sortBy")
    
  })
  // setSearchParams({ ...Object.fromEntries([...searchParams]), [e.target.name]: e.target.value });
  const serialize=(state)=>{
    const params = new URLSearchParams();
    if (state.salaryRanges?.length > 0)
      params.set("salaryRanges", state.salaryRanges?.map(range => range.join("-")).join(","));
    if (state.workingHours?.length > 0)
      params.set("workingHours", state.workingHours.join("-"));
    if (state.sortBy) params.set("sortBy", state.sortBy);
    if (state.q) params.set("q", state.q);
    params.set("try",[(9,8),(7,32)])
    console.log(params.get("try"))
    return params; 
  }

  
  const parsedParams=parse(searchParams)

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [toggles, setToggles] = useState({
    remote: false,
    partTime: false,
    internships: false,
  });

  const categories = [
    { label: "עוד לא החלטתי", value: "undecided" },
    { label: "הנדסה", value: "engineering" },
    { label: "מחשבים", value: "computers" },
  ];

  return (
    <div className="filter-sidebar">
     
      {/* Search Box */}
          <IconField  iconPosition="left">
                <InputIcon className="pi pi-search"> </InputIcon>
                <InputText className="input-search" onChange={(e)=>{
                  setSearchParams(serialize({...parsedParams,q:e.target.value}))
                  }} style={{direction:'rtl'}} placeholder="במה היית רוצה לעסוק?" />
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
            checked={parsedParams.salaryRanges?.find((r)=>{return r[0]===0&&r[1]===7000})}
            onChange={(e) =>{
          
              if(e.value)
              setSearchParams(serialize({...parsedParams,salaryRanges:[...parsedParams.salaryRanges,[0,7000]]}))
              else
            setSearchParams(serialize({...parsedParams,salaryRanges:parsedParams.salaryRanges.filter((r)=>{return !(r[0]===0&&r[1]===7000)})})
  )}}
            onLabel="עד ₪7000"
            offLabel="עד ₪7000"
          />
          <ToggleButton
            checked={searchParams.salaryRanges?.includes({min:7000,max:10000})}
            onChange={(e) => setToggles({ ...toggles, partTime: e.value })}
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
          {/* <Button label="מעל 10,000" className="p-button-outlined" />
          <Button label="מעל 8,000" className="p-button-outlined" />
          <Button label="מעל 5,000" className="p-button-outlined" /> */}
        </div>
      </div>
      {/* <Divider/> */}
      {/* Experience Slider */}
      <div className="mb-3">
        {/* <h5 className="text-title">ניסיון</h5> */}
        <h6 className="text-second">כמה שעות עבודה בשבוע? גררו את העיגולים עד שתגיעו לטווח הרצוי. הממוצע הוא כ-41</h6>
        <Slider
          value={parsedParams.workingHours}
          onChange={(e) => setSearchParams(serialize({...parsedParams,workingHours:[e.value[0],e.value[1]]}))}
          range
          min={0}
          max={50}
        />
        {/* <p className="text-center">{searchParams.get("workingHours")} - {searchParams.get("workingHours")[1]}</p> */}
      </div>
     
      <Divider/>
      {/* Search by Benefits */}
      <div className="mb-3">
        <h5 className="text-title">חיפוש לפי הכנסה</h5>
        <div className="flex flex-wrap gap-2">
          <Button label="ביטוח בריאות" className="p-button-outlined" />
          <Button label="רכב צמוד" className="p-button-outlined" />
          <Button label="הכשרה מקצועית" className="p-button-outlined" />
        </div>
      </div>
      <Divider/>
      {/* Toggle Buttons */}
      <div className="mb-3">
        <h5 className="text-title">נכונות להעדפות אחרונות</h5>
        <div className="flex flex-column gap-2">
          <ToggleButton
            checked={toggles.remote}
            onChange={(e) => setToggles({ ...toggles, remote: e.value })}
            onLabel="אפשרות עבודה מהבית"
            offLabel="אפשרות עבודה מהבית"
            className="w-full"
          />
          <ToggleButton
            checked={toggles.partTime}
            onChange={(e) => setToggles({ ...toggles, partTime: e.value })}
            onLabel="עבודה במשרה חלקית"
            offLabel="עבודה במשרה חלקית"
            className="w-full"
          />
          <ToggleButton
            checked={toggles.internships}
            onChange={(e) => setToggles({ ...toggles, internships: e.value })}
            onLabel="התמחות לסטודנטים"
            offLabel="התמחות לסטודנטים"
            className="w-full"
          />
        </div>
      </div>
      <Divider/>
      {/* Skills Tags */}
      <div className="mb-3">
        <h5 className="text-title">כישורים</h5>
        <Chips
          value={selectedFilters}
          onChange={(e) => setSelectedFilters(e.value)}
          separator=","
          placeholder="הוסף כישור"
          className="w-full"
        />
      </div>
      <Divider/>
      {/* Submit Button */}
      <Button label="הצג תוצאות מתאימות" className="p-button-primary w-full" />
    </div>
  );
};

export default FilterSidebar;
