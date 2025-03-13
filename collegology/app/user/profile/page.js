"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { FaEnvelope, FaPhone, FaUser } from "react-icons/fa";
import axios from "axios";
import API from "@/config/api";

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(""); // For success or error messages
  const [user, setUser] = useState(null); // Store the user data
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [modalMessage, setModalMessage] = useState(""); // Message to display inside modal

  // Fetch user data from local storage when component mounts
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setFormData({
        fullName: parsedUser.name,
        email: parsedUser.email,
        phone: parsedUser.phone,
      });
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[-()\s]/g, ""))) {
      newErrors.phone = "Invalid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          `${API.API_BASE_URL}/api/users/updateProfile`,
          {
            userId: user._id, // Using the user ID from local storage
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
          }
        );

        // Update the user data in local storage after successful API response
        const updatedUser = {
          ...user,
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));

        setMessage(response.data.message); // Show success message
        setModalMessage("Profile updated successfully!"); // Set modal success message
        setIsModalOpen(true); // Open modal
      } catch (error) {
        setMessage(error.response?.data?.message || "An error occurred");
        setModalMessage("An error occurred while updating the profile."); // Set modal error message
        setIsModalOpen(true); // Open modal
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close modal
  };

  return (
    <div className="flex items-center justify-center h-full bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden p-8 sm:p-10 flex flex-col items-center">
        <Image
          src="/images/user.webp"
          alt="User Avatar"
          width={80}
          height={80}
          className="rounded-full"
        />
        <h2 className="text-3xl text-[#FFB606] font-bold mb-6 text-center">
          Profile
        </h2>
        <p className="text-gray-500 text-sm mb-8 text-center">
          Update your details
        </p>

        {/* Display Success or Error message */}
        {message && <p className="text-green-600 text-sm mb-2">{message}</p>}

        <form onSubmit={handleSubmit} className="w-full">
          <label className="block text-black font-medium flex items-center gap-2">
            <FaUser /> Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB606] ${
              errors.fullName ? "border-red-300" : ""
            } text-black`}
            placeholder="Enter your full name"
          />
          {errors.fullName && (
            <p className="text-red-600 text-sm mb-2">{errors.fullName}</p>
          )}

          <label className="block text-gray-700 font-medium flex items-center gap-2">
            <FaEnvelope /> Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB606] ${
              errors.email ? "border-red-300" : ""
            } text-black`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mb-2">{errors.email}</p>
          )}

          <label className="block text-gray-700 font-medium flex items-center gap-2">
            <FaPhone /> Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB606] ${
              errors.phone ? "border-red-300" : ""
            } text-black`}
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <p className="text-red-600 text-sm mb-2">{errors.phone}</p>
          )}

          <button className="w-full bg-[#FFB606] text-white px-4 py-2 rounded-md transition">
            Update Profile
          </button>
        </form>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-lg w-1/3">
            <h3 className="text-xl font-bold mb-4">Status</h3>
            <p>{modalMessage}</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="bg-[#FFB606] text-white px-4 py-2 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
