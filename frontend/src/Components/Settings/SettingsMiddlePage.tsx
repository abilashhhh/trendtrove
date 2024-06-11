import React, { useState } from "react";
import {
  changePassword,
  deleteAccount,
  makepayment,
  passwordCheck,
  premiumAccount,
  privateAccount,
  setPrivateAccount,
  suspendAccount,
} from "../../API/Profile/profile";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import {
  validatePassword,
  validateConfirmPassword,
} from "../../utils/validations";
import { useNavigate } from "react-router-dom";
import useUserDetails from "../../Hooks/useUserDetails";

// Main Settings Page Component
const SettingsMiddlePage = () => {
  const [activeSection, setActiveSection] = useState("PremiumAccount");
  const currentUser = useUserDetails();
  const navigate = useNavigate();
  return (
    <>
      <ToastContainer />
      <main className="flex-1 min-h-full pb-2 lg:pl-2 pt-2 pr-2   bg-gray-800 dark:bg-gray-700 text-black dark:text-white no-scrollbar">
        <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-900 text-black dark:text-white h-full overflow-y-auto no-scrollbar">
          <div className="flex flex-col md:flex-row gap-4 h-full">
            <div className="w-full md:w-1/5  rounded-lg flex flex-col text-black dark:text-white text-l">
              <div className="p-4 space-y-4">
                <h1 className="text-xl font-semibold underline text-center mb-4">
                  Settings
                </h1>
                {!currentUser.isGoogleSignedIn && (
                  <button
                    onClick={() => setActiveSection("ChangePassword")}
                    className="bg-gray-200 dark:bg-slate-800 w-full rounded p-3 hover:bg-gray-300 dark:hover:bg-slate-700">
                    Change Password
                  </button>
                )}
                <button
                  onClick={() => setActiveSection("DeleteAccount")}
                  className="bg-gray-200 dark:bg-slate-800 w-full rounded p-3 hover:bg-gray-300 dark:hover:bg-slate-700">
                  Delete Account
                </button>
                <button
                  onClick={() => setActiveSection("SuspendAccount")}
                  className="bg-gray-200 dark:bg-slate-800 w-full rounded p-3 hover:bg-gray-300 dark:hover:bg-slate-700">
                  Suspend Account
                </button>
                <button
                  onClick={() => setActiveSection("PrivateAccount")}
                  className="bg-gray-200 dark:bg-slate-800 w-full rounded p-3 hover:bg-gray-300 dark:hover:bg-slate-700">
                  Change to private account
                </button>
                <button
                  onClick={() => setActiveSection("PremiumAccount")}
                  className="bg-gray-200 dark:bg-slate-800 w-full rounded p-3 hover:bg-gray-300 dark:hover:bg-slate-700">
                  Premium account
                </button>
              </div>
            </div>
            <div className="w-full md:w-4/5 bg-gray-200 dark:bg-slate-800 rounded-lg flex text-black dark:text-white text-xl h-full overflow-auto no-scrollbar">
              <div className="p-4 w-full">
                {activeSection === "ChangePassword" && (
                  <ChangePassword currentUser={currentUser} />
                )}
                {activeSection === "DeleteAccount" && (
                  <DeleteAccount currentUser={currentUser} />
                )}
                {activeSection === "SuspendAccount" && (
                  <SuspendAccount currentUser={currentUser} />
                )}
                {activeSection === "PrivateAccount" && (
                  <PrivateAccount currentUser={currentUser} />
                )}
                {activeSection === "PremiumAccount" && (
                  <PremiumAccount currentUser={currentUser} />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

// Change Password Component
const ChangePassword = ({ currentUser }) => {
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const navigate = useNavigate();
  const handleChangePassword = async e => {
    e.preventDefault();

    // Validate passwords
    const passwordError = validatePassword(newPassword);
    const confirmPasswordError = validateConfirmPassword(confirmNewPassword);

    if (passwordError || confirmPasswordError) {
      toast.error(passwordError || confirmPasswordError);
      return;
    }

    // Check if passwords match
    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match");
      return;
    }

    const userInfo = { _id: currentUser._id, currentPassword, newPassword };
    console.log("userinfo :", userInfo);

    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to change your password?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          const changeResult = await changePassword(userInfo);
          if (changeResult.status === "success") {
            toast.success("Password updated successfully");
            setTimeout(() => {
              navigate("/home");
            }, 3000);
          } else {
            toast.error(`Failed to update password: ${changeResult.message}`);
            return;
          }
        } catch (error) {
          toast.error(
            "Failed to update password, Check all fields and try again"
          );
        }
      }
    });
  };

  return (
    <div className="p-2">
      <h2 className="text-2xl mb-6 underline">Change Password</h2>
      <form className="space-y-4" onSubmit={handleChangePassword}>
        <div>
          <label className="block text-sm">Current Password</label>
          <input
            type="password"
            placeholder="Enter current password here.."
            className="w-full font-thin size-8 m-2 p-2 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm">New Password</label>
          <input
            type="password"
            placeholder="Enter new password here.."
            className="w-full font-thin size-8 m-2 p-2 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm">Confirm New Password</label>
          <input
            type="password"
            placeholder="Confirm new password here.."
            className="w-full font-thin size-8 m-2 p-2 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
            value={confirmNewPassword}
            onChange={e => setConfirmNewPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 dark:bg-blue-700 rounded p-2 hover:bg-blue-400 dark:hover:bg-blue-600">
          Update Password
        </button>
      </form>
    </div>
  );
};

const DeleteAccount = ({ currentUser }) => {
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    Swal.fire({
      title: "Enter your password",
      input: "password",
      inputAttributes: {
        autocapitalize: "off",
        autocorrect: "off",
        autocomplete: "off",
        spellcheck: "false",
      },
      showCancelButton: true,
      confirmButtonText: "Delete Account",
      showLoaderOnConfirm: true,
      preConfirm: async password => {
        try {
          const deleteAccountResult = await deleteAccount(
            currentUser._id,
            password
          );
          if (deleteAccountResult.status === "success") {
            return deleteAccountResult;
          } else {
            Swal.showValidationMessage(`Check your current password`);
            Swal.showValidationMessage(
              `Failed to delete account: ${deleteAccountResult.message}`
            );
          }
        } catch (error) {
          Swal.showValidationMessage(`Check your current password`);
          Swal.showValidationMessage(`Failed to delete account. Try again`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then(async result => {
      if (result.isConfirmed) {
        toast.success("Account deleted successfully");
        toast.error("Logging out...");

        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    });
  };

  return (
    <div>
      <h2 className="text-xl mb-4">Delete Account</h2>
      <p>
        Are you sure you want to delete your account? This action cannot be
        undone.
      </p>
      <button
        className="bg-red-500 dark:bg-red-700 rounded p-2 mt-4 hover:bg-red-400 dark:hover:bg-red-600"
        onClick={handleDeleteAccount}>
        Delete My Account
      </button>
    </div>
  );
};

const SuspendAccount = ({ currentUser }) => {
  const navigate = useNavigate();
  const handleSuspendAccount = async () => {
    Swal.fire({
      title: "Enter your password",
      input: "password",
      inputAttributes: {
        autocapitalize: "off",
        autocorrect: "off",
        autocomplete: "off",
        spellcheck: "false",
      },
      showCancelButton: true,
      confirmButtonText: "Suspend Account",
      showLoaderOnConfirm: true,
      preConfirm: async password => {
        try {
          const suspendAccountResult = await suspendAccount(
            currentUser._id,
            password
          );
          if (suspendAccountResult.status === "success") {
            toast.error("Logging out...");
            setTimeout(() => {
              navigate("/");
            }, 3000);
            return suspendAccountResult;
          } else {
            Swal.showValidationMessage(`Check your current password`);
            Swal.showValidationMessage(
              `Failed to suspend account: ${suspendAccountResult.message}`
            );
          }
        } catch (error) {
          Swal.showValidationMessage(`Check your current password`);
          Swal.showValidationMessage(`Failed to suspend account. Try again`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then(result => {
      if (result.isConfirmed) {
        toast.success("Account suspended successfully");
      }
    });
  };

  return (
    <div>
      <h2 className="text-xl mb-4">Suspend Account</h2>
      <p>
        Are you sure you want to suspend your account? You can reactivate it
        later.
      </p>
      <button
        className="bg-yellow-500 dark:bg-yellow-700 rounded p-2 mt-4 hover:bg-yellow-400 dark:hover:bg-yellow-600"
        onClick={handleSuspendAccount}>
        Suspend My Account
      </button>
    </div>
  );
};

const PrivateAccount = ({ currentUser }) => {
  const navigate = useNavigate();

  const handlePrivateAccount = async () => {
    Swal.fire({
      title: "Enter your password",
      input: "password",
      inputAttributes: {
        autocapitalize: "off",
        autocorrect: "off",
        autocomplete: "off",
        spellcheck: "false",
      },
      showCancelButton: true,
      confirmButtonText: "Change to private account",
      showLoaderOnConfirm: true,
      preConfirm: async password => {
        try {
          // Call the API function to set the account to private
          const privateAccountResult = await setPrivateAccount(
            currentUser._id,
            password
          );

          if (privateAccountResult.status === "success") {
            toast.success("Account set to private successfully");
            // Additional actions after setting the account to private
          } else {
            Swal.showValidationMessage(`Check your current password`);

            Swal.showValidationMessage(
              `Failed to set account to private: ${privateAccountResult.message}`
            );
          }
        } catch (error) {
          Swal.showValidationMessage(`Check your current password`);

          Swal.showValidationMessage(
            `Failed to set account to private. Try again`
          );
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then(result => {
      if (result.isConfirmed) {
        setTimeout(() => {
          navigate("/home");
        }, 3000);
      }
    });
  };

  return (
    <div>
      <h2 className="text-xl mb-4">Set Account to Private</h2>
      <p>Are you sure you want to set your account to private?</p>
      <button
        className="bg-purple-500 dark:bg-purple-700 rounded p-2 mt-4 hover:bg-purple-400 dark:hover:bg-purple-600"
        onClick={handlePrivateAccount}>
        Set Account to Private
      </button>
    </div>
  );
};

const PremiumAccount = ({ currentUser }) => {
  const navigate = useNavigate();

  const [passwordVerified, setPasswordVerified] = useState(false);

  const handlePayment = async () => {
    const makePayment  = await makepayment();
    
    console.log("Handle payment reached: ", makePayment);
  };

  const handlePremiumAccount = async () => {
    const { value: password } = await Swal.fire({
      title: "Enter your password",
      input: "password",
      inputAttributes: {
        autocapitalize: "off",
        autocorrect: "off",
        autocomplete: "off",
        spellcheck: "false",
      },
      showCancelButton: true,
      confirmButtonText: "Verify Password",
    });

    if (password) {
      try {
        const verifyPasswordResult = await passwordCheck(
          currentUser._id,
          password
        );

        if (verifyPasswordResult.status === "success") {
          toast.success("Password verification successful");
          toast.success("Continue to payment");

          setPasswordVerified(true);
        } else if (verifyPasswordResult.status !== "success") {
          toast.error("Failed to verify password, try again");
        }
      } catch (error) {
        toast.error("Failed to verify password. Try again");
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        Set Account to premium
      </h2>

      {!passwordVerified && (
        <div>
          <p>Are you sure you want to set your account to premium?</p>
          <p>Confirm your password and proceed to payment</p>
          <button
            className="bg-blue-500 dark:bg-blue-700 rounded p-2 mt-4 hover:bg-blue-400 dark:hover:bg-blue-600"
            onClick={handlePremiumAccount}>
            Switch to premium account
          </button>
        </div>
      )}
      {passwordVerified && (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Upgrade to a verified account and enjoy exclusive benefits designed
            to enhance your experience.
          </p>
          <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mb-4">
            <li>Exclusive access to premium features and tools.</li>
            <li>Enhanced security and account protection.</li>
            <li>Priority customer support and assistance.</li>
            <li>Increased visibility and credibility within the community.</li>
            <li>Ad-free browsing experience.</li>
          </ul>
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Amount
            </h3>
            <p className="text-gray-600 dark:text-gray-400">Rs500 per month</p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Rules
            </h3>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400">
              <li>
                Verified status is reviewed periodically and may be revoked if
                terms are violated.
              </li>
              <li>Only one verified account per user.</li>
              <li>
                Follow community guidelines and terms of service at all times.
              </li>
              <li>
                Contact support for any issues or questions regarding your
                verified status.
              </li>
            </ul>
          </div>
          <div>
            <button
              className="bg-blue-500 dark:bg-blue-700 text-white rounded p-2 mt-4 hover:bg-blue-400 dark:hover:bg-blue-600"
              onClick={handlePayment}>
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsMiddlePage;
