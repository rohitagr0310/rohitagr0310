"use client";

import API from "@/config/api";
import { useEffect, useState } from "react";
import { FaCheck, FaSearch, FaTimes, FaTrash, FaUser } from "react-icons/fa";

const ManageConsultants = () => {
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [selectedConsultant, setSelectedConsultant] = useState(null);
  const [consultants, setConsultants] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query

  useEffect(() => {
    // Fetch consultants from the backend
    const fetchConsultants = async () => {
      try {
        const response = await fetch(`${API.API_BASE_URL}/api/consultants`); // Ensure the backend endpoint is correct
        if (response.ok) {
          const data = await response.json();
          // Sort consultants alphabetically by name
          const sortedConsultants = data.consultants.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          setConsultants(sortedConsultants);
        } else {
          console.error("Failed to fetch consultants");
        }
      } catch (error) {
        console.error("Error fetching consultants:", error);
      }
    };

    fetchConsultants();
  }, []); // The empty array ensures the effect runs only once when the component mounts

  const toggleActiveStatus = (consultant) => {
    setSelectedConsultant(consultant);
    setShowStatusModal(true);
  };

  const handleStatusChange = async (id, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "On Leave" : "Active";

    try {
      const response = await fetch(
        `${API.API_BASE_URL}/api/consultants/${id}/update-status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setConsultants(
          consultants.map((consultant) =>
            consultant._id === id
              ? { ...consultant, status: newStatus }
              : consultant
          )
        );
      } else {
        console.error("Failed to update consultant status:", response);
      }
    } catch (error) {
      console.error("Error updating consultant status:", error);
    }

    setShowStatusModal(false);
  };

  const removeConsultant = (consultant) => {
    setSelectedConsultant(consultant);
    setShowRemoveModal(true);
  };

  const handleRemoveConsultant = async (id) => {
    try {
      const response = await fetch(
        `${API.API_BASE_URL}/api/consultants/${id}/delete`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setConsultants(
          consultants.filter((consultant) => consultant._id !== id)
        );
      } else {
        console.error("Failed to remove consultant:", response);
      }
    } catch (error) {
      console.error("Error removing consultant:", error);
    }

    setShowRemoveModal(false);
  };

  // Filter consultants based on the search query
  const filteredConsultants = consultants.filter((consultant) =>
    consultant.name.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 h-full flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white p-4 rounded shadow-md overflow-x-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center text-black mb-4 sm:mb-0">
            <FaUser className="mr-2 text-black" /> Current Consultants
          </h2>
          <div className="relative w-full sm:w-72">
            <FaSearch className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search consultants..."
              className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 text-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update the search query
            />
          </div>
        </div>

        {/* Map through filtered consultants */}
        {filteredConsultants.map((consultant) => (
          <div
            key={consultant._id}
            className="border-b py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 text-gray-600"
          >
            <div className="mb-4 sm:mb-0">
              <p className="font-semibold text-gray-700">{consultant.name}</p>
              <p className="text-sm text-gray-600">Email: {consultant.email}</p>
              <p className="text-sm text-gray-600">Phone: {consultant.phone}</p>
            </div>
            <div className="flex space-x-2 mt-2 sm:mt-0">
              <button
                onClick={() => toggleActiveStatus(consultant)}
                className={`px-3 py-1 rounded flex items-center ${
                  consultant.status === "Active"
                    ? "bg-gray-500 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {consultant.status === "Active" ? (
                  <FaTimes className="mr-1" />
                ) : (
                  <FaCheck className="mr-1" />
                )}
                {consultant.status === "Active" ? "Deactivate" : "Activate"}
              </button>
              <button
                onClick={() => removeConsultant(consultant)}
                className="bg-red-500 text-white px-3 py-1 rounded flex items-center"
              >
                <FaTrash className="mr-1" /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {showStatusModal && selectedConsultant && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 p-4">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-black text-center">
              Confirm Status Change
            </h2>
            <p className="mb-4 text-center text-black">
              Are you sure you want to{" "}
              {selectedConsultant.status === "Active"
                ? "deactivate"
                : "activate"}{" "}
              <strong>{selectedConsultant.name}</strong>?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowStatusModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  handleStatusChange(
                    selectedConsultant._id,
                    selectedConsultant.status
                  )
                }
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {showRemoveModal && selectedConsultant && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 p-4">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-center text-black">
              Confirm Removal
            </h2>
            <p className="mb-4 text-center text-black">
              Are you sure you want to remove{" "}
              <strong>{selectedConsultant.name}</strong>?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowRemoveModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => handleRemoveConsultant(selectedConsultant._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
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

export default ManageConsultants;
