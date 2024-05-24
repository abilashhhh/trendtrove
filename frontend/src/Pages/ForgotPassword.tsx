import React, { useState } from "react";
import TrendTroveLogo from "../Components/Logo/TrendTroveLogo";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { verifyMailForForgotPass, verifyOtp } from "../API/Auth/auth";

interface ForgotPasswordData {
  otp: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const ForgotPassword: React.FC = () => {
  const [formData, setFormData] = useState<ForgotPasswordData>({
    email: "",
    otp: '',
    password: "",
    confirmPassword: ""
  });

  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const generateOtp = async () => {
    console.log("formData: ", formData.email);
    const result = await verifyMailForForgotPass(formData.email, "forgot-password");
    if (result.status === "success") {
      toast.success(result.message);
      setOtpSent(true);
    } else {
      toast.error(result.message);
    }
  };

  const verifyOtpHandler = async () => {
    const result = await verifyOtp(formData.email, formData.otp);
    if (result.status === "success") {
      toast.success("OTP verified successfully!");
    } else {
      toast.error("Failed to verify OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <TrendTroveLogo />
      <ToastContainer />
      <div className="max-w-2xl mx-auto mt-10 p-10 border rounded-lg shadow-md bg-white">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700">
            Enter your email address:
          </label>
          <div className="flex justify-center items-center mt-1">
            <div className="w-full">
              <input
                type="email"
                onChange={handleChange}
                id="email"
                name="email"
                required
                className="focus:ring-gray-500 p-3 border border-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm rounded-md"
              />
            </div>
            <div className="ml-2">
              <button 
                type="button" 
                onClick={generateOtp}
                className="bg-green-700 text-white p-3 rounded-md shadow-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Submit
              </button>
            </div>
          </div>
        </div>
        {otpSent && (
          <>
            <div className="mb-4">
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700">
                Enter the OTP
              </label>
              <input
                type="text"
                onChange={handleChange}
                id="otp"
                name="otp"
                required
                className="focus:ring-gray-500 p-3 border border-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm rounded-md"
              />
            </div>
            <div className="flex justify-center items-center mt-1">
              <button 
                type="button" 
                onClick={verifyOtpHandler}
                className="bg-blue-700 text-white p-3 rounded-md shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Verify OTP
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
