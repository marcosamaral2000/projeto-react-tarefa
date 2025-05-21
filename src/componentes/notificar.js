import { useState } from 'react';
import { toast } from 'react-toastify';

export const notificar = (message, type = 'info', duration = 3000) => {
    const options = {
      autoClose: duration,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
    };
    switch (type) {
      case 'success':
        toast.success(message, options);
        break;
      case 'error':
        toast.error(message, options);
        break;
      case 'warning':
        toast.warn(message, options);
        break;
      default: // 'info'
        toast.info(message, options);
    }
  };