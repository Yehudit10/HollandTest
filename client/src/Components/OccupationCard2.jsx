import React from 'react';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import{useGetUserByIdQuery, useUpdateUserMutation} from '../features/users/userApiSlice'
const OccupationCard2 = ({ job,matchPercentage}) => {
  const {jobname, description, educationLevel,salaryAvg,workingHoursAvg}=job
  const ratingValue =Math.floor(matchPercentage/20)
const starsMap=[
  "אין התאמה",
 "התאמה דלה",
  "התאמה בינונית",
  "התאמה טובה",
  "התאמה טובה מאוד",
  "התאמה מצוינת"
]
const {data:userData,isSuccess:userIsSuccuss}=useGetUserByIdQuery()
const [updateUser,{}]=useUpdateUserMutation()
const isInFavoraites=userData?.data?.favoraites?.includes(job._id)
const handleAddToFavoraites=()=>{
 updateUser({...userData.data,favoraites:isInFavoraites?userData.data.favoraites.filter(j=>j!==job._id):[...(userData.data.favoraites||[]),job._id]})
}
  return (
    <div className="p-card p-shadow-2" style={{ marginBottom: '10px', width: '100%', direction: 'rtl'}}>
      <div className="p-card-body">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
          {matchPercentage && <><Rating value={ratingValue} readOnly stars={5} cancel={false} />
            <span style={{ fontSize: '12px', color: '#666', marginLeft: '5px',marginRight:'15px' }}>        {   starsMap[ratingValue]}</span></>}
          </div>
          <h3 style={{ fontSize: '20px', marginBottom: '5px' }}>{jobname}</h3>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>{description}</p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
          <ul style={{marginRight:'5px',display: 'flex'}}>
        <li style={{ fontSize: '12px' ,paddingRight:'5px',fontWeight:'bold'}}>שכר חודשי ממוצע: <span style={{ fontSize: '12px',fontWeight:'initial',paddingLeft:'20px' }}>{salaryAvg||"אין מידע"}</span></li>
          <li style={{ fontSize: '12px' ,paddingRight:'5px',fontWeight:'bold'}}>היקף שעות עבודה שבועי: <span style={{ fontSize: '12px',fontWeight:'initial',paddingLeft:'20px' }}>{workingHoursAvg||"אין מידע"}</span></li>
          <li style={{ fontSize: '12px',paddingRight:'5px',fontWeight:'bold' }}>השכלה נדרשת: <span style={{ fontSize: '12px',fontWeight:'initial',paddingLeft:'20px' }}>{educationLevel||"אין מידע"}</span></li></ul>
           
          </div>
         
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', gap: '5px' }}>
          <Button label="הוספה להשוואה" className="p-button-secondary p-button-sm" />
          <Button icon={isInFavoraites?"pi pi-heart-fill":"pi pi-heart"} className="p-button-secondary p-button-sm" onClick={handleAddToFavoraites} />
        </div>
      </div>
    </div>
  );
};

export default OccupationCard2;