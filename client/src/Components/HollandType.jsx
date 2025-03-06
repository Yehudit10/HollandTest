import { Dialog } from 'primereact/dialog';
import { Image } from 'primereact/image';
        
import React, { useState } from 'react';
const HollandType = ({ image, title, description }) => {
    const [visible, setVisible] = useState(false);
  
    const handleClick = () => {
      setVisible(true);
    };
  
    const handleClose = () => {
      setVisible(false);
    };
  
    return (
      <div className="holland-type">
        <div onClick={handleClick}>
        <Image src={image} alt={title}  />
        <h3 >{title}</h3>
  </div>
        <Dialog
          visible={visible}
          onHide={handleClose}
          style={{ width: '40vw',height:'60vh' }}
          pt={{root:{dir:"rtl"}}}
        >
          <Image width="25%" height="25%"  src={image}  alt={title} className="dialog-image" />
          <h2>{title}</h2>
          <div style={{fontSize:20}}>{description}</div>
        </Dialog>
      </div>
    );
  };
  export default HollandType