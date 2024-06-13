import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="p-3 animate-spin bg-gradient-to-bl from-pink-400 via-purple-400 to-indigo-600 md:w-48 md:h-48 w-32 h-32 rounded-full flex items-center justify-center">
        <div className="rounded-full h-full w-full bg-slate-800 dark:bg-zinc-900 flex items-center justify-center">
          <img
            src="/TrendTroveLogo2.jpg" 
            alt="TrendTrove Logo"
            className="w-full  h-full rounded-full"
          />
        </div>
      </div>
      <p className="mt-16 text-lg font-semibold text-white">TrendTrove</p>
      <p className="mt-4 text-lg font-semibold text-white">Logging out...</p>
    </div>
  );
};

export default LoadingSpinner;
