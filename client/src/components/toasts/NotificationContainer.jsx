import React, { useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import notificationService from './notificationService';

const NotificationContainer = () => {
    const toast = useRef(null);

    useEffect(() => {
        notificationService.setRef(toast.current);
    }, []);

    return <Toast ref={toast} position="top-center" style={{ direction: "rtl" }} />;
};

export default NotificationContainer;