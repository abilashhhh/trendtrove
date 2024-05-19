import React from "react";
import TrendTroveLogo from "../Components/Logo/TrendTroveLogo";
import { Link } from "react-router-dom";

function BasePage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8"
      style={{
        // backgroundImage: `url("https://cdn.pixabay.com/photo/2020/07/28/11/43/circles-5444818_1280.png")`,
        // backgroundImage: `url("https://images.unsplash.com/photo-1485470733090-0aae1788d5af?q=80&w=2117&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
        // backgroundImage: `url("https://images.unsplash.com/photo-1500754088824-ce0582cfe45f?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
        backgroundImage: `url("https://images.unsplash.com/photo-1529528744093-6f8abeee511d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
      }}
    >
      <div className="text-center text-slate-900 font-bold mt-1 lg:mt-2 text-sm lg:text-base">
        Welcome to
      </div>
      <img src="/TrendTroveLogo2.jpg" className="w-60 mt-4 rounded-full" alt="Trend Trove Logo" />
      <TrendTroveLogo />
      <div className="flex justify-center gap-3 mt-5">
        <div className="text-center">
          <Link
            to="/signup"
            className="text-xl font-extrabold text-gray-900 hover:text-blue-900"
          >
            Create an account
          </Link>
        </div>
        <div className="text-center">|</div>
        <div className="text-center">
          <Link
            to="/signin"
            className="text-xl font-extrabold text-gray-900 hover:text-blue-900"
          >
            Login to your account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BasePage;
