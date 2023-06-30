import { createContext, useState } from "react";
import { Provider } from "@radix-ui/react-toast";

export const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toastInfo, setToastInfo] = useState({
    isOpen: false,
    title: "",
    description: "",
  });

  const showToast = (title, description) => {
    setToastInfo({
      isOpen: true,
      title,
      description,
    });
  };

  const hideToast = () => {
    setToastInfo((prevState) => ({ ...prevState, isOpen: false }));
  };

  return (
    <Provider open={toastInfo.isOpen} onOpenChange={setToastInfo}>
      <ToastContext.Provider value={{ toastInfo, showToast, hideToast }}>
        {children}
      </ToastContext.Provider>
    </Provider>
  );
}
