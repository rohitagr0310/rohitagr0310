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
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [isConfirmationLoading, setIsConfirmationLoading] = useState(false); // Loading state for confirmation

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("user"));
    if (savedData) {
      setFormData({
        fullName: savedData.name || "",
        email: savedData.email || "",
        phone: savedData.phone || "",
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
      setIsModalOpen(true); // Show the modal before submitting
    }
  };

  const handleConfirmation = async () => {
    setIsConfirmationLoading(true); // Start loading in the modal

    try {
      const response = await axios.post(
        `${API.API_BASE_URL}/api/admin/update-profile`,
        {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Assuming the backend returns a success message
      console.log("Profile updated:", response.data);

      const savedData = JSON.parse(localStorage.getItem("user"));
      if (savedData) {
        const updatedUserData = {
          ...savedData,
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
        };
        localStorage.setItem("user", JSON.stringify(updatedUserData));
      }

      setLoading(false);
      setIsModalOpen(false); // Close the modal after confirmation
    } catch (error) {
      console.error("Error updating profile:", error);
      setIsConfirmationLoading(false);
      alert("There was an error updating your profile.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

          <button
            type="submit"
            className="w-full bg-[#FFB606] text-white px-4 py-2 rounded-md transition disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>

        {/* Confirmation Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg w-1/3">
              <h3 className="text-xl font-bold mb-4 text-black">
                Confirm Profile Update
              </h3>
              <p className="text-black">
                Are you sure you want to update your profile?
              </p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-black px-4 py-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmation}
                  className="bg-[#FFB606] text-black px-4 py-2 rounded-md"
                  disabled={isConfirmationLoading}
                >
                  {isConfirmationLoading ? "Updating..." : "Confirm"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
