"use client";

import { useState } from "react";
import API from "@/config/api";
import dynamic from "next/dynamic";

const ChangePasswordPage = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [modalMessage, setModalMessage] = useState(""); // State for modal message

  const user = JSON.parse(localStorage.getItem("user"));

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
      setLoading(true);

      try {
        const response = await fetch(
          `${API.API_BASE_URL}/api/admin/change-password`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: user.email,
              currentPassword: formData.currentPassword,
              newPassword: formData.newPassword,
            }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          setModalMessage("Password changed successfully!");
        } else {
          setModalMessage(data.message || "An error occurred");
        }

        setModalVisible(true); // Show modal
      } catch (error) {
        console.error("Error:", error);
        setModalMessage("An error occurred while changing the password.");
        setModalVisible(true); // Show modal on error
      }

      setLoading(false);
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
            type={isTyping ? "text" : "password"} // Switch to text while typing
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            onFocus={() => setIsTyping(true)} // Start showing characters as text when focused
            onBlur={() => setIsTyping(false)} // Switch back to password when focus is lost
            className={`w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB606] ${
              errors.currentPassword ? "border-red-300" : ""
            } text-black`} // Added text-black class
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
            type={isTyping ? "text" : "password"} // Switch to text while typing
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            onFocus={() => setIsTyping(true)} // Start showing characters as text when focused
            onBlur={() => setIsTyping(false)} // Switch back to password when focus is lost
            className={`w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB606] ${
              errors.newPassword ? "border-red-300" : ""
            } text-black`} // Added text-black class
            placeholder="Enter new password"
          />
          {errors.newPassword && (
            <p className="text-red-600 text-sm mb-2">{errors.newPassword}</p>
          )}

          <label className="block text-gray-700 font-medium flex items-center gap-2">
            Confirm Password
          </label>
          <input
            type={isTyping ? "text" : "password"} // Switch to text while typing
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onFocus={() => setIsTyping(true)} // Start showing characters as text when focused
            onBlur={() => setIsTyping(false)} // Switch back to password when focus is lost
            className={`w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB606] ${
              errors.confirmPassword ? "border-red-300" : ""
            } text-black`} // Added text-black class
            placeholder="Confirm new password"
          />
          {errors.confirmPassword && (
            <p className="text-red-600 text-sm mb-2">
              {errors.confirmPassword}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[#FFB606] text-white px-4 py-2 rounded-md transition disabled:opacity-50"
            disabled={loading} // Disable the button while waiting for the request to complete
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>

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
  );
};

export default dynamic(() => Promise.resolve(ChangePasswordPage), {
  ssr: false,
});
