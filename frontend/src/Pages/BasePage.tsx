import React from "react";
import TrendTroveLogo from "../Components/Logo/TrendTroveLogo";
import { Link, useNavigate } from "react-router-dom";

function BasePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen  flex flex-col justify-center py-12 sm:px-6 lg:px-8">
       <div className="text-center text-slate-600 font-bold mt-1 lg:mt-2 text-sm lg:text-base">
      Welcome to
      </div>
      <img src="/TrendTroveLogo2.jpg" className="w-60 place-self-center" alt="" />
      <TrendTroveLogo />
     <div className="flex justify-center gap-3 pt-5">
     <div className="text-center">
        <Link
          to="/signup"
          className="mt-6 sm:text-l text-xl font-extrabold text-gray-900 hover:text-blue-900">
          Create an account
        </Link>
      </div>
      | 
      <div className="text-center">
        <Link
          to="/signin"
          className="mt-6 sm:text-l text-xl font-extrabold text-gray-900 hover:text-blue-900">
          Login to your account
        </Link>
      </div>
     </div>
    </div>
  );
}

export default BasePage;
