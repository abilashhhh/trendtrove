import React from "react";
import { FaGoogle } from "react-icons/fa";
import { auth, provider } from "../../API/Firebase/FirebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Google: React.FC = () => {
  const handleClick = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log("User info:", user);
      console.log("Token:", token);


      // const res = send data

    } catch (error) {
      // Handle Errors here.
      console.error("Error during Google sign-in:", error);
    }
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-lg text-sm font-medium text-white bg-green-600 hover:bg-green-800 focus:outline-none"
    >
      <div className="flex items-center">
        <FaGoogle className="mr-2" />
        <span>Continue with Google</span>
      </div>
    </button>
  );
};

export default Google;
