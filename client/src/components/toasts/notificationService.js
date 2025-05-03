import { Toast } from 'primereact/toast';

const notificationService = {
    toastRef: null,

    setRef(ref) {
        this.toastRef = ref;
    },

    show(severity, summary, detail, life = 3000) {
        if (this.toastRef) {
            this.toastRef.show({ severity, summary, detail, life });
        }
    }
};

export default notificationService;