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
        
const FilterSidebar3 = () => {
const initState={minWorkingHours:0,maxWorkingHours:50}
  const [searchParams,setSearchParams]=useSearchParams(initState)

  const handleFilterChange =(name,value) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(name,value);
  setSearchParams(newSearchParams);  
  };

  const handleFilterAppend = (name,value) => {
    const newSearchParams = new URLSearchParams(searchParams);
    let newVal=newSearchParams.get(name)?.split(',')||[]
    newVal.includes(value)?newVal=newVal.filter((v)=>v!=value):newVal.push(value)
    newSearchParams.set(name,newVal)
    setSearchParams(newSearchParams); 
  }

 

  return (
    <div className="filter-sidebar">
      {/* Search Box */}
          <IconField  iconPosition="left">
                <InputIcon className="pi pi-search"> </InputIcon>
                <InputText className="input-search" onChange={
                  (e)=>{handleFilterChange("q",e.target.value)}
                }
                  style={{direction:'rtl'}} placeholder="במה היית רוצה לעסוק?" />
            </IconField>

      <Divider/>
      {/* Salary Filter */}
      <div>
        <h5 className="text-title">חיפוש לפי תנאי עבודה</h5>
        <h6 className="text-second">כמה תרצו להרוויח בחודש? לחצו על כל טווחי השכר שמתאימים לכם</h6>

        <div >
          
        </div>
      </div>
      <Divider/>
      <div 
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        background: "#f9f9f9",
        padding: "10px 15px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}>
        <InputNumber
          value={searchParams.get("minSalary")}
          onValueChange={(e) => {handleFilterChange("minSalary",e.value)}}
          inputStyle={{
            textAlign: "center",
            borderRadius: "6px",
            border: "1px solid #ccc",
            padding: "10px",
          }}
        />
        <span>-</span>
        <InputNumber
          value={searchParams.get("maxSalary")}
          onValueChange={(e) => {handleFilterChange("maxSalary",e.value)}}
          inputStyle={{
            textAlign: "center",
            borderRadius: "6px",
            border: "1px solid #ccc",
            padding: "10px",
          }}
        />
      </div>
      {/* Experience Slider */}
      <div className="mb-3">
        <h5 className="text-title">שעות עבודה</h5>
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
      <div className="mb-3" >
        <h5 className="text-title">חיפוש לפי השכלה</h5>
        <h6 className="text-second">לחצו על כל רמות ההשכלה הרלוונטיות לכם. כדאי לבחור גם השכלה נמוכה משלכם</h6>

        <div >
          
        <div className="flex flex-column gap-2">
          <ToggleButton
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
          />
        </div>
         
        </div>
      </div>
     
    
      {/* Toggle Buttons */}
      
      <Divider/>
     
      <Button label="איפוס" onClick={()=>{setSearchParams(initState)}}className="p-button-primary w-full" />
    </div>
  );
};

export default FilterSidebar3;
