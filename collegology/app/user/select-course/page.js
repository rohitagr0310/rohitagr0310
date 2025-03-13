"use client";
import { useState } from "react";
import CollegeStep from "../../../components/registration/CollegeStep";
import UniversityStep from "../../../components/registration/UniversityStep";
import axios from "axios";
import API from "../../../config/api";
import { useRouter } from "next/navigation";

const Registration = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    university: "",
    college: ""
  });
  const [showModal, setShowModal] = useState(false);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const updateUserDetails = async (userId, university, college) => {
    try {
      const response = await axios.post(
        `${API.API_BASE_URL}/api/users/updateUserDetails`,
        {
          userId: userId,
          institutions: [{ university, college }]
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      if (response.status === 200) {
        setShowModal(true);
      } else {
        alert(response.data.message || "Failed to update details");
      }
    } catch (error) {
      console.error("Error updating user details:", error);
      alert("An error occurred while updating your details.");
    }
  };

  const handleSubmit = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;
    if (userId) {
      updateUserDetails(userId, formData.university, formData.college);
    } else {
      alert("User not found.");
    }
  };

  return (
    <div className="h-full bg-gray-50 p-8 flex items-center justify-center">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[#FFB606] font-semibold">
              Step {step} of 2
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className={`h-full bg-[#FFB606] rounded-full`}
              style={{ width: `${(step / 2) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Components */}
        {step === 1 && (
          <UniversityStep
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
          />
        )}
        {step === 2 && (
          <CollegeStep
            formData={formData}
            updateFormData={updateFormData}
            prevStep={prevStep}
            nextStep={handleSubmit}
            university={formData.university}
          />
        )}
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-black p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">Success!</h2>
            <p className="mb-4">User details updated successfully.</p>
            <button
              className="bg-blue-500 text-black px-4 py-2 rounded"
              onClick={() => {
                setShowModal(false);
                router.replace("/user");
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Registration;
