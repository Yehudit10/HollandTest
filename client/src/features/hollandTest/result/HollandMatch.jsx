import React from 'react';

const HollandMatch = ({ title, percentage }) => {
    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            margin: '10px auto',  
            padding: '20px', 
            backgroundColor: '#f9f9f9', 
            borderRadius: '8px', 
            border: '1px solid #e0e0e0',
            width: '80%', 
            maxWidth: '300px', 
            boxSizing: 'border-box' 
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '16px', color: '#333' }}>{title}</span> 
                <span style={{ fontSize: '16px', color: '#333' }}>{percentage}%</span>
            </div>
            <div style={{ 
                width: '100%', 
                height: '10px', 
                backgroundColor: '#e0e0e0', 
                borderRadius: '5px', 
                position: 'relative' 
            }}>
                <div style={{ 
                    width: `${percentage}%`, 
                    height: '10px', 
                    backgroundColor: '#42a5f5', 
                    borderRadius: '5px', 
                    position: 'absolute', 
                    top: 0, 
                    left: 0 
                }}></div>
            </div>
        </div>
    );
};

export default HollandMatch;