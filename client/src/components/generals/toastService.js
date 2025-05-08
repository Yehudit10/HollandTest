// toastService.js
let toastRef = null;

export const setToastRef = (ref) => {
  toastRef = ref;
};

export const showToast = ({ severity, summary, detail, life = 10000 }) => {
  if (toastRef) {
    toastRef.show({ severity, summary, detail, life });
  }
};
