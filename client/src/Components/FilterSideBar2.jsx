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
import { InputNumber } from "primereact/inputnumber"
import { InputSwitch } from 'primereact/inputswitch';
import { Checkbox } from "primereact/checkbox";
import {  useSearchParams } from "react-router-dom";
        
const FilterSidebar2 = () => {

  const [searchParams,setSearchParams]=useSearchParams()
  const [range, setRange] = useState([1,9]);
  const handleFilterChange = (name,value) => {
    const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(name,value);
    setSearchParams(newSearchParams);  
  };
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
                <InputText className="input-search" onChange={
                  (e)=>{handleFilterChange("q",e.target.value)}
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
          handleFilterAppend("salaryRanges",[0,7000])
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
          {/* <Button label="מעל 10,000" className="p-button-outlined" />
          <Button label="מעל 8,000" className="p-button-outlined" />
          <Button label="מעל 5,000" className="p-button-outlined" /> */}
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
        
          value={searchParams.get("workingHours")?.split(',')}
          onChange={(e)=>{handleFilterChange("workingHours",e.value)}}
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

export default FilterSidebar2;
