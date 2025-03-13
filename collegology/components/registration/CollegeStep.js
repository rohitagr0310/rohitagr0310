import { FaArrowLeft } from "react-icons/fa"; // Import FontAwesome icon (install react-icons package if not already)
import { useState, useEffect } from "react";
import axios from "axios";
import API from "../../config/api";

const CollegeStep = ({
  formData,
  updateFormData,
  prevStep,
  nextStep,
  university
}) => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (university) {
      setLoading(true);
      axios
        .get(`${API.API_BASE_URL}/api/universities/${university}/colleges`)
        .then((response) => {
          const sortedColleges = (response.data.colleges || []).sort((a, b) =>
            a.name.localeCompare(b.name)
          ); // Sorting alphabetically
          setColleges(sortedColleges);
        })
        .catch((error) => {
          console.error("Error fetching colleges:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [university]);

  return (
    <div className="flex items-center justify-center bg-gray-100 p-4 sm:p-6 lg:p-8 overflow-auto min-h-full">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-lg flex flex-col">
        {/* Back Icon and College Selection Section */}
        <div className="flex items-center p-4">
          <button onClick={prevStep} className="text-black text-xl">
            <FaArrowLeft />
          </button>
        </div>

        {/* College Selection Form */}
        <div className="flex-1 p-6 sm:p-10 flex flex-col justify-center items-center">
          <h2 className="text-2xl sm:text-3xl text-[#FFB606] font-bold mb-6 text-center">
            Select Your College
          </h2>

          {/* Loading indicator */}
          {loading ? (
            <div className="text-lg text-gray-600">Loading colleges...</div>
          ) : (
            <select
              value={formData.college}
              onChange={(e) => updateFormData("college", e.target.value)}
              className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB606] text-black"
            >
              <option value="" className="text-black">
                Select a college
              </option>
              {colleges.map((college) => (
                <option
                  key={college.name}
                  value={college.name}
                  className="text-black"
                >
                  {college.name}
                </option>
              ))}
            </select>
          )}

          <button
            onClick={nextStep}
            disabled={!formData.college}
            className="w-full bg-[#FFB606] text-white py-2 px-4 rounded-md transition "
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollegeStep;
