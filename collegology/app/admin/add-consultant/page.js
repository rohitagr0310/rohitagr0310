"use client";

import { useState } from "react";
import { HiUser, HiPhone, HiMail, HiLockClosed } from "react-icons/hi";
import axios from "axios";
import API from "../../../config/api";

const AddConsultant = () => {
  const [consultantData, setConsultantData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const [modalMessage, setModalMessage] = useState(""); // Modal message

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConsultantData({
      ...consultantData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send data to backend
      const response = await axios.post(
        `${API.API_BASE_URL}/api/consultants/register`,
        consultantData
      );
      setModalMessage(response.data.message); // Show success message
      setModalVisible(true); // Show modal
      setConsultantData({ name: "", email: "", phone: "", password: "" }); // Clear form
    } catch (error) {
      setModalMessage(
        "Error: " + error.response?.data?.message || "Internal Server Error"
      );
      setModalVisible(true); // Show modal even on error
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 md:px-8 py-10">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Add Consultant
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="relative">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <div className="flex items-center mt-2 border-b border-gray-300">
              <HiUser className="text-gray-500 mr-3" />
              <input
                type="text"
                id="name"
                name="name"
                value={consultantData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="relative">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-600"
            >
              Phone Number
            </label>
            <div className="flex items-center mt-2 border-b border-gray-300">
              <HiPhone className="text-gray-500 mr-3" />
              <input
                type="text"
                id="phone"
                name="phone"
                value={consultantData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
          </div>

          {/* Email */}
          <div className="relative">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <div className="flex items-center mt-2 border-b border-gray-300">
              <HiMail className="text-gray-500 mr-3" />
              <input
                type="email"
                id="email"
                name="email"
                value={consultantData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
          </div>

          {/* Password */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <div className="flex items-center mt-2 border-b border-gray-300">
              <HiLockClosed className="text-gray-500 mr-3" />
              <input
                type="password"
                id="password"
                name="password"
                value={consultantData.password}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              Add Consultant
            </button>
          </div>
        </form>

        {/* Modal */}
        {modalVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-xl font-semibold text-gray-800">
                {modalMessage}
              </h3>
              <div className="mt-4">
                <button
                  onClick={() => setModalVisible(false)}
                  className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddConsultant;
