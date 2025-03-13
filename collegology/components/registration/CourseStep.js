import { FaArrowLeft } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import API from "../../config/api";

const CourseStep = ({
  formData,
  updateFormData,
  prevStep,
  nextStep,
  showSubmit,
  university,
  college,
}) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch courses based on selected university and college
  useEffect(() => {
    if (university && college) {
      setLoading(true);
      axios
        .get(
          `${API.API_BASE_URL}/api/universities/${university}/colleges/${college}/courses`
        )
        .then((response) => {
          setCourses(response.data.courses || []);
        })
        .catch((error) => {
          console.error("Error fetching courses:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [university, college]);

  return (
    <div className="flex items-center justify-center bg-gray-100 p-4 sm:p-6 lg:p-8 overflow-auto min-h-full">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-lg flex flex-col">
        {/* Back Icon and Course Selection Section */}
        <div className="flex items-center p-4">
          <button onClick={prevStep} className="text-black text-xl">
            <FaArrowLeft />
          </button>
        </div>

        {/* Course Selection Form */}
        <div className="flex-1 p-6 sm:p-8 md:p-10 flex flex-col justify-center items-center">
          <h2 className="text-2xl sm:text-3xl text-[#FFB606] font-bold mb-6">
            Select Your Course
          </h2>

          {/* Loading indicator */}
          {loading ? (
            <div className="text-lg text-gray-600">Loading courses...</div>
          ) : (
            <select
              value={formData.course}
              onChange={(e) => updateFormData("course", e.target.value)}
              className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB606] text-black"
            >
              <option value="" className="text-black">
                Select a course
              </option>
              {courses.map((course) => (
                <option key={course} value={course} className="text-black">
                  {course}
                </option>
              ))}
            </select>
          )}

          <button
            onClick={nextStep}
            disabled={!formData.course}
            className="w-full bg-[#FFB606] text-white py-2 px-4 rounded-md transition"
          >
            {showSubmit ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseStep;
