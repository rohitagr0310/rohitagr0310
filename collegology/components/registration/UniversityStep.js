import API from "@/config/api";
import axios from "axios";
import { useEffect, useState } from "react";

const UniversityStep = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [universities, setUniversities] = useState([]);
  const [equivalentUniversities, setEquivalentUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState(""); // Added state field

  // Hardcoded list of states
  const states = [
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Ladakh",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "The Dadra and Nagar Haveli and Daman and Diu",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal"
  ];

  useEffect(() => {
    if (state) {
      const fetchUniversities = async () => {
        try {
          const res = await axios.get(
            `${API.API_BASE_URL}/api/universities?state=${state}`
          );
          const sortedUniversities = res.data.sort((a, b) =>
            a.name.localeCompare(b.name)
          ); // Sorting alphabetically
          setUniversities(sortedUniversities);
        } catch (error) {
          console.error("Error fetching universities:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUniversities();
    }
  }, [state]);

  // Fetch equivalent universities when a university is selected
  const handleUniversityChange = async (e) => {
    const selectedUniversity = e.target.value;
    updateFormData("university", selectedUniversity);

    if (selectedUniversity) {
      try {
        const res = await axios.get(
          `${API.API_BASE_URL}/api/universities/${selectedUniversity}/equivalent`
        );
        setEquivalentUniversities(res.data.equivalentUniversities); // Only the list of equivalent universities
      } catch (error) {
        console.error("Error fetching equivalent universities:", error);
        setEquivalentUniversities([]);
      }
    } else {
      setEquivalentUniversities([]);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 p-4 sm:p-6 lg:p-8 overflow-auto min-h-full">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-lg flex flex-col sm:overflow-hidden">
        {/* Back Icon and State Selection Section */}
        {/* <div className="flex items-center p-4">
          <button onClick={prevStep} className="text-black text-xl">
            <FaArrowLeft />
          </button>
        </div> */}

        {/* State Selection Section */}
        <div className="flex-1 p-6 sm:p-10 flex flex-col justify-center items-center">
          <h2 className="text-2xl sm:text-3xl text-center text-[#FFB606] font-bold mb-6">
            Select Your State
          </h2>

          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB606] text-black"
          >
            <option value="" className="text-black">
              Select a state
            </option>
            {states.map((stateOption) => (
              <option
                key={stateOption}
                value={stateOption}
                className="text-black"
              >
                {stateOption}
              </option>
            ))}
          </select>

          {/* University Selection Section */}
          {state && (
            <>
              <h2 className="text-2xl sm:text-3xl text-center text-[#FFB606] font-bold mb-6">
                Select Your University
              </h2>

              <select
                value={formData.university}
                onChange={handleUniversityChange}
                className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB606] text-black"
              >
                <option value="" className="text-black">
                  Select a university
                </option>
                {loading ? (
                  <option className="text-black" disabled>
                    Loading universities...
                  </option>
                ) : (
                  universities.map((uni) => (
                    <option
                      key={uni._id}
                      value={uni.name}
                      className="text-black"
                    >
                      {uni.name}
                    </option>
                  ))
                )}
              </select>
            </>
          )}

          <button
            onClick={nextStep}
            disabled={!formData.university}
            className="w-full bg-[#FFB606] text-white py-2 px-4 rounded-md transition"
          >
            Next
          </button>
        </div>

        {/* Suggestions Section (Moved to the Bottom with Color Theme) */}
        {formData.university && equivalentUniversities.length > 0 && (
          <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gradient-to-r from-[#FFB606] to-[#FF4B2B] mx-4 sm:mx-10 mb-10 text-white">
            <h3 className="font-bold text-lg mb-2">Suggestions</h3>
            <p className="text-sm mb-4">
              You can also consider the following equivalent universities:
            </p>
            <ul className="list-disc pl-4 text-sm">
              {equivalentUniversities.map((uni) => (
                <li key={uni} className="text-white">
                  {uni}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversityStep;
