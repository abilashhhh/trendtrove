import { ToastOptions } from "react-toastify";

const CONSTANTS = {
  API_BASE_URL: "http://localhost:3000",
};

export default CONSTANTS;

export const TOAST: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};
