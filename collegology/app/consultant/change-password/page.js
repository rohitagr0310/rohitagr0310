"use client";

import { useState } from "react";
import axios from "axios";
import API from "@/config/api"; // Assuming you have API base URL in the config

const ChangePasswordPage = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // State for the confirmation modal

  const validateForm = () => {
    const newErrors = {};

    if (!formData.currentPassword.trim()) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword.trim()) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters long";
    }

    if (formData.confirmPassword !== formData.newPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowModal(true); // Show the confirmation modal
    }
  };

  const handleModalConfirm = async () => {
    setLoading(true);
    setShowModal(false); // Close the modal on confirmation

    try {
      const consultantId = JSON.parse(localStorage.getItem("user"))._id;

      const response = await axios.put(
        `${API.API_BASE_URL}/api/consultants/${consultantId}/change-password`,
        {
          oldPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }
      );

      console.log("Password changed successfully:", response.data);
      alert("Password changed successfully!");
      setLoading(false);
    } catch (error) {
      console.error("Error changing password:", error);
      alert("There was an error changing your password.");
      setLoading(false);
    }
  };

  const handleModalCancel = () => {
    setShowModal(false); // Close the modal on cancel
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
        <h2 className="text-3xl text-[#FFB606] font-bold mb-6 text-center">
          Change Password
        </h2>
        <p className="text-gray-500 text-sm mb-8 text-center">
          Update your password securely
        </p>
        <form onSubmit={handleSubmit} className="w-full">
          <label className="block text-black font-medium flex items-center gap-2">
            Current Password
          </label>
          <input
            type={isTyping ? "text" : "password"}
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            onFocus={() => setIsTyping(true)}
            onBlur={() => setIsTyping(false)}
            className={`w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB606] ${
              errors.currentPassword ? "border-red-300" : ""
            } text-black`}
            placeholder="Enter current password"
          />
          {errors.currentPassword && (
            <p className="text-red-600 text-sm mb-2">
              {errors.currentPassword}
            </p>
          )}

          <label className="block text-gray-700 font-medium flex items-center gap-2">
            New Password
          </label>
          <input
            type={isTyping ? "text" : "password"}
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            onFocus={() => setIsTyping(true)}
            onBlur={() => setIsTyping(false)}
            className={`w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB606] ${
              errors.newPassword ? "border-red-300" : ""
            } text-black`}
            placeholder="Enter new password"
          />
          {errors.newPassword && (
            <p className="text-red-600 text-sm mb-2">{errors.newPassword}</p>
          )}

          <label className="block text-gray-700 font-medium flex items-center gap-2">
            Confirm Password
          </label>
          <input
            type={isTyping ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onFocus={() => setIsTyping(true)}
            onBlur={() => setIsTyping(false)}
            className={`w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB606] ${
              errors.confirmPassword ? "border-red-300" : ""
            } text-black`}
            placeholder="Confirm new password"
          />
          {errors.confirmPassword && (
            <p className="text-red-600 text-sm mb-2">
              {errors.confirmPassword}
            </p>
          )}

          <button
            className="w-full bg-[#FFB606] text-white px-4 py-2 rounded-md transition"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">
              Are you sure you want to change your password?
            </h3>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded-md"
                onClick={handleModalCancel}
              >
                Cancel
              </button>
              <button
                className="bg-[#FFB606] text-white px-4 py-2 rounded-md"
                onClick={handleModalConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangePasswordPage;
