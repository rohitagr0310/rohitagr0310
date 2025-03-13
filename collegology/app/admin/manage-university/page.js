"use client";

import { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API calls
import {
  FaSchool,
  FaTrash,
  FaUniversity,
  FaSearch,
  FaExclamationTriangle
} from "react-icons/fa";
import API from "@/config/api"; // Import the API client
import { useRouter } from "next/navigation";

const ManageUniversities = () => {
  const [universities, setUniversities] = useState([]);
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCollegePopup, setShowCollegePopup] = useState(null);
  const [colleges, setColleges] = useState([]);
  const [loadingColleges, setLoadingColleges] = useState(false);

  const router = useRouter();

  const [newCollege, setNewCollege] = useState({
    aisheCode: "",
    name: "",
    state: "",
    district: "",
    website: "",
    yearOfEstablishment: "",
    location: "",
    collegeType: "",
    management: ""
  });

  const [currentUniversityName, setCurrentUniversityName] = useState(null);
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    type: "",
    name: null
  });

  // Fetch all university names on component mount
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await axios.get(
          `${API.API_BASE_URL}/api/universities`
        );
        const sortedUniversities = response.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setUniversities(sortedUniversities);
        setFilteredUniversities(sortedUniversities);
      } catch (error) {
        console.error("Error fetching universities:", error);
      }
    };
    fetchUniversities();
  }, []);

  // Handle search
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredUniversities(universities);
    } else {
      setFilteredUniversities(
        universities.filter((univ) =>
          univ.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, universities]);

  // Fetch colleges when "View Colleges" is clicked
  const fetchColleges = async (universityName) => {
    setLoadingColleges(true);
    try {
      const response = await axios.get(
        `${API.API_BASE_URL}/api/universities/${universityName}/colleges`
      );
      setColleges(response.data.colleges || []);
      setShowCollegePopup(universityName);
    } catch (error) {
      console.error("Error fetching colleges:", error);
    } finally {
      setLoadingColleges(false);
    }
  };

  // Remove a university
  const removeUniversity = async (universityName) => {
    try {
      await axios.delete(
        `${API.API_BASE_URL}/api/universities/${universityName}`
      );
      setUniversities(
        universities.filter((univ) => univ._id !== universityName)
      );
      router.refresh();
    } catch (error) {
      console.error("Error removing university:", error);
    }
  };

  // Add a new college
  const addCollege = async (universityName) => {
    if (newCollege.name) {
      try {
        await axios.post(
          `${API.API_BASE_URL}/api/universities/${universityName}/colleges`,
          newCollege
        );
        setNewCollege({
          aisheCode: "",
          name: "",
          state: "",
          district: "",
          website: "",
          yearOfEstablishment: "",
          location: "",
          collegeType: "",
          management: ""
        });
        setCurrentUniversityName(null);
        router.refresh();
      } catch (error) {
        console.error("Error adding college:", error);
      }
    }
  };

  // Remove a college
  const removeCollege = async (universityName, collegeName) => {
    try {
      await axios.delete(
        `${API.API_BASE_URL}/api/universities/${universityName}/colleges/${collegeName}`
      );
      setColleges(colleges.filter((college) => college._id !== collegeName));
      router.refresh();
    } catch (error) {
      console.error("Error removing college:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 h-full flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-2 flex text-black items-center">
          <FaUniversity className="mr-2 text-black" /> Manage Universities
        </h2>

        {/* Search Bar */}
        <div className="flex items-center border border-gray-300 rounded p-2 mb-4">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search university..."
            className="w-full outline-none text-black"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {filteredUniversities.length === 0 ? (
          <div>No universities found</div>
        ) : (
          filteredUniversities.map((univ) => (
            <div
              key={univ._id}
              className="border-b py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 text-gray-600"
            >
              <div className="mb-4 sm:mb-0">
                <p className="font-semibold text-gray-700">{univ.name}</p>
                <p className="text-sm text-gray-600">{univ.universityType}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => fetchColleges(univ.name)}
                  className="bg-blue-500 text-white px-3 py-1 rounded flex items-center"
                >
                  View Colleges
                </button>
                <button
                  onClick={() =>
                    setConfirmModal({
                      show: true,
                      type: "university",
                      name: univ.name
                    })
                  }
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  <FaTrash className="mr-1" /> Remove
                </button>
                <button
                  onClick={() => setCurrentUniversityName(univ.name)}
                  className="bg-green-500 text-white px-3 py-1 rounded flex items-center"
                >
                  <FaSchool className="mr-1" /> Add College
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add College Popup */}
      {currentUniversityName && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 p-4">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-center text-black">
              Add College
            </h2>
            <input
              type="text"
              placeholder="College Name"
              className="w-full p-2 mb-2 border rounded text-black"
              value={newCollege.name}
              onChange={(e) =>
                setNewCollege({ ...newCollege, name: e.target.value })
              }
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setCurrentUniversityName(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => addCollege(currentUniversityName)}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Add College
              </button>
            </div>
          </div>
        </div>
      )}

      {/* College List Popup */}
      {showCollegePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 p-4">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-center text-black">
              Colleges in University
            </h2>
            {loadingColleges ? (
              <div>Loading...</div>
            ) : (
              <div className="max-h-60 overflow-y-auto">
                <ul>
                  {colleges.map((college) => (
                    <li
                      key={college._id}
                      className="flex justify-between mb-2 text-black"
                    >
                      <p>{college.name}</p>
                      <button
                        onClick={() =>
                          setConfirmModal({
                            show: true,
                            type: "college",
                            name: college.name
                          })
                        }
                        className="text-red-500"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <button
              onClick={() => setShowCollegePopup(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmModal.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 p-4">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <div className="flex flex-col items-center">
              <FaExclamationTriangle className="text-red-500 text-3xl mb-2" />
              <h2 className="text-xl font-semibold text-center text-black">
                Confirm{" "}
                {confirmModal.type === "university" ? "University" : "College"}{" "}
                Removal?
              </h2>
              <p className="text-gray-600 text-center mb-4">
                Are you sure you want to remove this {confirmModal.type}? This
                action is irreversible.
              </p>
              <div className="flex justify-between w-full">
                <button
                  onClick={() =>
                    setConfirmModal({ show: false, type: "", name: null })
                  }
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (confirmModal.type === "university") {
                      removeUniversity(confirmModal.name);
                    } else {
                      removeCollege(showCollegePopup, confirmModal.name);
                    }
                    setConfirmModal({ show: false, type: "", name: null }); // Close modal after removal
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUniversities;
