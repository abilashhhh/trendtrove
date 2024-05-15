import React from "react";
import { Link } from "react-router-dom";
import TrendTroveLogo from "../Components/Logo/TrendTroveLogo";
import Google from "../Components/GoogleButton/Google";

const signInPage: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">

      <TrendTroveLogo />  
  
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <h5 className="mt-6 sm:text-l text-xl  font-extrabold text-gray-900">
              Sign in to your account
            </h5>
            <p className="mt-2 text-sm text-gray-600">
              New here? {" "}
              <Link
                to="/signup"
                className="font-medium text-blue-400 hover:text-blue-600">
                Create an account
              </Link>
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 focus:ring-gray-500 p-3 border border-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm  rounded-md"
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
                name="password"
                required
                className="mt-1 focus:ring-gray-500 p-3 border border-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm  rounded-md"
              />
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-lg text-sm font-medium text-white bg-gray-600 hover:bg-gray-800 focus:outline-none">
                Sign in
              </button>
            </div>
            
           <Google />
          </form>
           
        </div>
      </div>
    </div>
  );
};

export default signInPage;
