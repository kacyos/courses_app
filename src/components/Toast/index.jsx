import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Toast({ message, type }) {
  const notify = () => {
    if (type === "success") {
      toast.success(`${message}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.error(`${message}`, {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };

  useEffect(() => {
    notify();
  }, []);

  return <ToastContainer />;
}
