import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";

const Loading = () => {

  const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(255, 255, 255, 0.6)', // light transparent background
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    message: {
        marginTop: '1rem',
        fontSize: '1.2rem',
    },
};
  return (
   
    <div style={styles.overlay}>
    <div style={styles.content}>
    <style>{`
                .p-progress-spinner-circle {
                    stroke: #007bff !important;
                   
                }
            `}</style>
    <ProgressSpinner
                    style={{ width: '50px', height: '50px' }}
                    strokeWidth="4"
                    animationDuration=".8s"

                />
        <p style={styles.message}>Loading</p>
    </div>
</div>
);
};




export default Loading;
