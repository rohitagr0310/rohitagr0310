"use client";
import { useState, useEffect } from "react";
import CollegeStep from "../../components/registration/CollegeStep";
import PersonalDetailsStep from "../../components/registration/PersonalDetailsStep";
import UniversityStep from "../../components/registration/UniversityStep";
import { useRouter } from "next/navigation";
import axios from "axios";
import API_ENDPOINTS from "../../config/api";
const Registration = () => {
  useEffect(() => {
    axios
      .get(API_ENDPOINTS.API_ENDPOINTS.CHECK_SESSION, { withCredentials: true })
      .then((res) => {
        const role = res.data.role;
        localStorage.removeItem("role");
        localStorage.setItem("role", role);

        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(res.data.user));

        // Redirect based on role
        if (role === "admin") {
          router.push("/admin");
        } else if (role === "consultant") {
          router.push("/consultant");
        } else if (role === "user") {
          router.push("/user");
        }
      })
      .catch(() => {});
  }, []);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    university: "",
    college: "",
    personal: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
  });
  const router = useRouter(); // Initialize the useRouter hook for navigation

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateFormData = (field, value) => {
  setFormData((prev) => {
    if (field === "state") {
      return {
        ...prev,
        [field]: value,
        university: "", // Reset university when state changes
      };
    }
    return {
      ...prev,
      [field]: value,
    };
  });
};

  const updatePersonalData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      personal: { ...prev.personal, [field]: value },
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${API_ENDPOINTS.API_BASE_URL}/api/users/register`,
        {
          institutions: [
            {
              university: formData.university,
              college: formData.college,
            },
          ],
          name: formData.personal.name,
          email: formData.personal.email,
          phone: formData.personal.phone,
          password: formData.personal.password,
        }
      );

      console.log("Registration response:", response.data);

      localStorage.setItem("role", "user");
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Redirect to the login page
      alert("Form submitted successfully! Login to continue.");
      router.push("/login");
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed, please try again.");
    }
  };

  return (
    <div className="h-full bg-gray-50 flex items-center justify-center">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[#FFB606] font-semibold">
              Step {step} of 3
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className={`h-full bg-[#FFB606] rounded-full`}
              style={{ width: `${(step / 3) * 100}%` }}
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
            nextStep={nextStep}
            university={formData.university}
          />
        )}
        {step === 3 && (
          <PersonalDetailsStep
            formData={formData}
            updatePersonalData={updatePersonalData}
            prevStep={prevStep}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default Registration;
