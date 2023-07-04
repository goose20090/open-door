import React, { createContext, useState } from "react";
import { Provider } from "@radix-ui/react-toast";
import { v4 as uniqueId } from "uuid";

export const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (action, appointment, status, newAppointment = null) => {
    setToasts((prevToasts) => [
      ...prevToasts,
      {
        id: uniqueId(),
        action,
        appointment,
        status,
        newAppointment,
      },
    ]);
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <Provider duration={5000}>
      <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
        {children}
      </ToastContext.Provider>
    </Provider>
  );
}
