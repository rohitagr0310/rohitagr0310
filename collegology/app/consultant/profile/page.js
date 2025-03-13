"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { FaEnvelope, FaPhone, FaUser } from "react-icons/fa";
import axios from "axios";
import API from "@/config/api"; // Assuming you have the API base URL here

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal visibility state

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

  const handleShowModal = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowModal(true); // Show modal if form is valid
    }
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      // Send the updated profile data to the backend
      const id = JSON.parse(localStorage.getItem("user"))._id;
      const response = await axios.put(
        `${API.API_BASE_URL}/api/consultants/${id}/update-profile`, // Adjust the URL accordingly
        formData,
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
      setShowModal(false); // Hide modal after confirmation
    } catch (error) {
      console.error("Error updating profile:", error);
      setLoading(false);
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
        <form onSubmit={handleShowModal} className="w-full">
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
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-md shadow-lg w-96">
              <h3 className="text-xl font-semibold mb-4">Confirm Changes</h3>
              <p>Are you sure you want to update your profile details?</p>
              <div className="mt-4 flex justify-end gap-4">
                <button
                  className="bg-gray-400 text-white px-4 py-2 rounded-md"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-[#FFB606] text-white px-4 py-2 rounded-md"
                  onClick={handleConfirm}
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Confirm"}
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
