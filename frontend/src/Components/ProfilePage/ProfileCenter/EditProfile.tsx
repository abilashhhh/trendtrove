import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faUser,
  faEnvelope,
  faPhone,
  faInfoCircle,
  faMapMarkerAlt,
  faTransgender,
  faCrown,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { UserInfo } from "../../../Types/userProfile";

interface ProfileProps {
  userDetails: UserInfo;
}

const EditProfile: React.FC<ProfileProps> = ({ userDetails }) => {
  const [formData, setFormData] = useState<UserInfo>(userDetails);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here, such as sending the data to an API.
    console.log("Form submitted:", formData);
  };

  return (
    <>
      <main className="flex-1 p-2 bg-gray-800 min-h-screen w-full dark:bg-gray-700 text-white">
        <div className="overflow-y-auto no-scrollbar">
          <div className="max-w-full mx-auto relative">
            {/* Profile Info */}
            <form
              onSubmit={handleSubmit}
              className="px-6 py-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg mb-4 relative">
              {/* Edit Profile Button */}
              <button
                type="submit"
                className="absolute top-4 right-4 px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                Save Changes
              </button>

              {/* Profile Picture */}
              <div className="flex items-center justify-between mb-4">
                <img
                  src={formData.dp}
                  alt="Profile Picture"
                  className="h-40 w-40 rounded-full object-cover border-4 border-white dark:border-gray-100"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                      <FontAwesomeIcon icon={faUser} className="mr-2" />
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="text-lg font-semibold text-gray-800 dark:text-white bg-gray-200 dark:bg-gray-800 rounded px-5 py-2"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                      <FontAwesomeIcon icon={faUser} className="mr-2" />
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="text-lg font-semibold text-gray-800 dark:text-white bg-gray-200 dark:bg-gray-800 rounded  px-5 py-2"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                      <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                      Email
                    </label>
                    <h1>{formData.email}</h1>
                  </div>

                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                      <FontAwesomeIcon icon={faPhone} className="mr-2" />
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone || ""}
                      onChange={handleChange}
                      className="text-lg font-semibold text-gray-800 dark:text-white bg-gray-200 dark:bg-gray-800 rounded  px-5 py-2"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address || ""}
                      onChange={handleChange}
                      className="text-lg font-semibold text-gray-800 dark:text-white bg-gray-200 dark:bg-gray-800 rounded  px-5 py-2"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                      <FontAwesomeIcon icon={faTransgender} className="mr-2" />
                      Gender
                    </label>
                    <input
                      type="text"
                      name="gender"
                      value={formData.gender || ""}
                      onChange={handleChange}
                      className="text-lg font-semibold text-gray-800 dark:text-white bg-gray-200 dark:bg-gray-800 rounded  px-5 py-2"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                      <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio || ""}
                      onChange={handleChange}
                      className="text-lg font-semibold text-gray-800 dark:text-white bg-gray-200 dark:bg-gray-800 rounded  px-5 py-2"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <FontAwesomeIcon icon={faCrown} className="mr-2" />
                  <label className="text-sm text-gray-600 dark:text-gray-300 mr-2">
                    Premium Account
                  </label>
                  <FontAwesomeIcon
                    icon={formData.isPremium ? faCheckCircle : faTimesCircle}
                    className={`text-lg font-semibold ${
                      formData.isPremium ? "text-green-500" : "text-red-500"
                    }`}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <FontAwesomeIcon icon={faLock} className="mr-2" />
                  <label className="text-sm text-gray-600 dark:text-gray-300 mr-2">
                    Private Account
                  </label>
                  <FontAwesomeIcon
                    icon={formData.isPrivate ? faCheckCircle : faTimesCircle}
                    className={`text-lg font-semibold ${
                      formData.isPrivate ? "text-green-500" : "text-red-500"
                    }`}
                  />
                </div>
              </div>
            </form>

            <div className="flex flex-col md:flex-row justify-between  px-8 py-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg gap-6">
              <div className="text-center cursor-pointer md:w-1/3">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Posts
                </h2>
                <p className="text-lg font-bold text-gray-800 dark:text-white">
                  {formData.posts ? formData.posts.length : "0"}
                </p>
              </div>

              <div className="text-center cursor-pointer md:w-1/3">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Followers
                </h2>
                <p className="text-lg font-bold text-gray-800 dark:text-white">
                  {formData.followers ? formData.followers.length : "0"}
                </p>
              </div>

              <div className="text-center cursor-pointer md:w-1/3">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Following
                </h2>
                <p className="text-lg font-bold text-gray-800 dark:text-white">
                  {formData.following ? formData.following.length : "0"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default EditProfile;
