import React, { useState, useEffect } from "react";
import TrendTroveLogo from "../Components/Logo/TrendTroveLogo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { forgotPasswordChangePass, verifyMailForForgotPass, verifyOtp } from "../API/Auth/auth";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword
} from "../utils/validations";
import { useNavigate } from "react-router-dom";

interface ForgotPasswordData {
  otp: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<ForgotPasswordData>({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [OtpVerified, setOtpVeried] = useState(false);
  const [emailData, setEmailData] = useState(true);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const savedFormData = localStorage.getItem("forgotPasswordData");
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("forgotPasswordData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem("otpSent", JSON.stringify(otpSent));
  }, [otpSent]);

  useEffect(() => {
    localStorage.setItem("OtpVerified", JSON.stringify(OtpVerified));
  }, [OtpVerified]);

  useEffect(() => {
    localStorage.setItem("emailData", JSON.stringify(emailData));
  }, [emailData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [id]: value,
    }));

    // Validate input
   if (id === "password") {
      setErrors(prevErrors => ({
        ...prevErrors,
        password: validatePassword(value),
      }));
    } else if (id === "confirmPassword") {
      const confirmPasswordError = value !== formData.password ? "Passwords do not match" : "";
      setErrors(prevErrors => ({
        ...prevErrors,
        confirmPassword: confirmPasswordError || validateConfirmPassword(value),
      }));
    }
  };

  const generateOtp = async () => {
    const emailError = validateEmail(formData.email);
    if (emailError) {
      setErrors(prevErrors => ({
        ...prevErrors,
        email: emailError,
      }));
      return;
    }

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
      setOtpVeried(true);
      setOtpSent(false);
      setEmailData(false);
    } else {
      toast.error("Failed to verify OTP. Please try again.");
    }
  };

  const verifyPasswordHandler = async () => {
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = formData.password !== formData.confirmPassword ? "Passwords do not match" : "";

    if (passwordError || confirmPasswordError) {
      setErrors({
        ...errors,
        password: passwordError,
        confirmPassword: confirmPasswordError,
      });
      return;
    }

    const result = await forgotPasswordChangePass(formData.email, formData.password);
    if (result.status === "success") {
      toast.success("Password changed successfully!");
      localStorage.removeItem("forgotPasswordData");
      localStorage.removeItem("otpSent");
      localStorage.removeItem("OtpVerified");
      localStorage.removeItem("emailData");
      setFormData({ email: "", otp: "", password: "", confirmPassword: "" });
      setOtpSent(false);
      setOtpVeried(false);
      setEmailData(true);
      setTimeout(()=>{
        navigate('/')
      },2000)
    } else {
      toast.error("Failed to change password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <TrendTroveLogo />
      <ToastContainer />
      <div className="w-full max-w-4xl mx-auto mt-10 p-10 border rounded-lg bg-white">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>

        {emailData && (
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
                  value={formData.email}
                  className="focus:ring-gray-500 p-4 border border-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-lg rounded-md"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div className="ml-2">
                <button
                  type="button"
                  onClick={generateOtp}
                  className="bg-green-700 text-white p-4 rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

        {otpSent && (
          <>
            <div className="mb-4">
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                Enter the OTP
              </label>
              <div className="flex justify-center items-center mt-1">
                <div className="w-full">
                  <input
                    type="text"
                    onChange={handleChange}
                    id="otp"
                    name="otp"
                    required
                    value={formData.otp}
                    className="focus:ring-gray-500 p-4 border border-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-lg rounded-md"
                  />
                </div>
                <div className="ml-2">
                  <button
                    type="button"
                    onClick={verifyOtpHandler}
                    className="bg-blue-700 text-white p-4 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Verify OTP
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {OtpVerified && (
          <>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Create new password:
              </label>
              <input
                type="password"
                onChange={handleChange}
                id="password"
                name="password"
                required
                value={formData.password}
                className="focus:ring-gray-500 p-4 border border-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-lg rounded-md"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm new password:
              </label>
              <input
                type="password"
                onChange={handleChange}
                id="confirmPassword"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                className="focus:ring-gray-500 p-4 border border-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-lg rounded-md"
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>
            <div className="flex justify-center items-center mt-1">
              <button
                type="button"
                onClick={verifyPasswordHandler}
                className="bg-violet-700 text-white p-4 rounded-md hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                Change Password
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
