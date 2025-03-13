"use client";

import { useState } from "react";
import axios from "axios";
import API from "@/config/api";

const ChangePasswordPage = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setIsLoading(true);
        const userId = JSON.parse(localStorage.getItem("user"))._id;

        const response = await axios.post(
          `${API.API_BASE_URL}/api/users/changePassword`,
          {
            userId,
            oldPassword: formData.currentPassword,
            newPassword: formData.newPassword,
          }
        );

        if (response.status === 200) {
          setSuccessMessage("Password updated successfully!");
          setFormData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        }
      } catch (error) {
        console.error(error);
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
      } finally {
        setIsLoading(false);
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

  // Modal for success message
  const SuccessModal = ({ message, onClose }) => (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-lg">
        <p className="text-green-600 text-sm mb-4">{message}</p>
        <button
          onClick={onClose}
          className="bg-[#FFB606] text-white px-4 py-2 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );

  // Modal for error message
  const ErrorModal = ({ message, onClose }) => (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-lg">
        <p className="text-red-600 text-sm mb-4">{message}</p>
        <button
          onClick={onClose}
          className="bg-[#FFB606] text-white px-4 py-2 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );

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
          {errors.form && (
            <p className="text-red-600 text-sm mb-2">{errors.form}</p>
          )}

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
            type="submit"
            className="w-full bg-[#FFB606] text-white px-4 py-2 rounded-md transition"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Password"}
          </button>
        </form>

        {/* Show success modal if there's a success message */}
        {successMessage && (
          <SuccessModal
            message={successMessage}
            onClose={() => setSuccessMessage("")}
          />
        )}

        {/* Show error modal if there's an error message */}
        {errorMessage && (
          <ErrorModal
            message={errorMessage}
            onClose={() => setErrorMessage("")}
          />
        )}
      </div>
    </div>
  );
};

export default ChangePasswordPage;
