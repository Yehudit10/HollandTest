import React from 'react';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';

const OccupationCard = ({ title, description, educationLevel, matchPercentage }) => {
  const ratingValue = Math.round(matchPercentage / 20); 

  return (
    <div className="p-card p-shadow-2" style={{ marginBottom: '10px', width: '100%', direction: 'rtl'}}>
      <div className="p-card-body">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
            <Rating value={ratingValue} readOnly stars={5} cancel={false} />
            <span style={{ fontSize: '12px', color: '#666', marginLeft: '5px' }}>התאמה מצוינת</span>
          </div>
          <h3 style={{ fontSize: '20px', marginBottom: '5px' }}>{title}</h3>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>{description}</p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', marginRight: '5px' }}>שייך לתחום:</span>
            <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{educationLevel}</span>
          </div>
          <span style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>שכר לא ידוע</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', gap: '5px' }}>
          <Button label="הוספה להשוואה" className="p-button-secondary p-button-sm" />
          <Button icon="pi pi-heart" className="p-button-secondary p-button-sm" />
        </div>
      </div>
    </div>
  );
};

export default OccupationCard;