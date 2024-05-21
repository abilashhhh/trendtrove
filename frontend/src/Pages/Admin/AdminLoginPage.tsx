  
  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import TrendTroveLogo from "../../Components/Logo/TrendTroveLogo";
  import { SignInUserInterface } from "../../Types/signInUser";
  import { adminLogin } from "../../API/Admin/admin";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import { useDispatch } from "react-redux";
  import { setAdminCredentials } from "../../Redux/AdminSlice/adminSlice";

  const AdminLoginPage: React.FC = () => {
    const [formData, setFormData] = useState<SignInUserInterface>({
      email: "",
      password: "",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [id]: value,
      }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!formData.email || !formData.password) {
        toast.error("Empty data. Please fill in all fields.");
        return;
      }

      console.log("Sign in form submitted:", formData);

      try {
        const response = await adminLogin(formData);

        if (response.status === "success") {
          dispatch(
            setAdminCredentials({
              accessToken: response.accessToken,
            })
          );
          console.log("response.user : ", response.user);
          console.log("response.accessToken : ", response.accessToken);
          toast.success("Sign in successful");
          setTimeout(() => {
            navigate("/adminhome");
          }, 2000);
        } else {
          toast.error("Failed to sign in");
        }
      } catch (error) {
        console.error("Error during sign-in:", error);
        toast.error("Failed to sign in");
      }
    };

    return (
      <div className="min-h-screen bg-gray-300 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <TrendTroveLogo />
        <ToastContainer />
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="text-center">
              <h5 className="mt-6 sm:text-l text-xl font-extrabold text-gray-900 mb-5">
                ADMIN LOGIN PAGE
              </h5>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
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
                  className="block text-sm font-medium text-gray-700"
                >
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
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-lg text-sm font-medium text-white bg-gray-600 hover:bg-gray-800 focus:outline-none"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  export default AdminLoginPage;
