import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TrendTroveLogo from "../Components/Logo/TrendTroveLogo";
import Google from "../Components/GoogleButton/Google";
import { SignInUserInterface } from "../Types/signInUser";
import { signin } from "../API/Auth/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setCredentials } from "../Redux/UserAuthSlice/authSlice";

const SignInPage: React.FC = () => {
  const [formData, setFormData] = useState<SignInUserInterface>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const forgotPassword = () => {
    navigate("/forgotpassword");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Empty data. Please fill in all fields.");
      return;
    }

    console.log("Sign in form submitted:", formData);

    try {
      const response = await signin(formData);

      if (response.status === "success") {
        dispatch(
          setCredentials({
            user: response.user,
            accessToken: response.accessToken,
          })
        );
        console.log("response.user : ", response.user);
        console.log("response.accessToken : ", response.accessToken);
        toast.success("Sign in successful");
        toast.success("Navigating to homepage...");
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } else {
        toast.error(`Failed to sign in, ${response.message}`);
      }
    } catch (error: any) {
      console.error("Error during sign-in:", error);
      toast.error(`Failed to sign in, ${error.response.data.message}`);
    }
  };

  return (
    <div className="min-h-screen   flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <TrendTroveLogo />
      <ToastContainer />
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <h5 className="mt-6 sm:text-l text-xl font-extrabold text-gray-900">
              Sign in to your account
            </h5>
            <p className="mt-2 text-sm text-gray-600">
              New here?{" "}
              <Link
                to="/signup"
                className="font-medium text-blue-400 hover:text-blue-600">
                Create an account
              </Link>
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                onChange={handleChange}
                id="email"
                name="email"
                required
                className="mt-1 focus:ring-gray-500 p-3 border border-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                onChange={handleChange}
                name="password"
                required
                className="mt-1 focus:ring-gray-500 p-3 border border-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm rounded-md"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-lg text-sm font-medium text-white bg-gray-600 hover:bg-gray-800 focus:outline-none">
                Sign in
              </button>
            </div>

            <div>
              <button
                type="button"
                onClick={forgotPassword}
                className=" text-center w-full flex justify-center hover:text-blue-600">
                Forgot Password
              </button>
            </div>

            <Google />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
