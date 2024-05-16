import React from "react";
import TrendTroveLogo from "../Components/Logo/TrendTroveLogo";

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <TrendTroveLogo />
      <div className="flex justify-center gap-3 pt-5">
        <div className="text-center">
          <h1 className="mt-6 sm:text-l text-xl font-extrabold text-gray-900 hover:text-blue-900">
            Welcome to your account | HOMEPAGE
          </h1>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
