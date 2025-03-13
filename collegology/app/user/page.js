"use client";

import { Mail, MessageCircleMore, User, GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import API_ENDPOINTS from "../../config/api";

const UserDashboard = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return;

        const response = await axios.get(
          `${API_ENDPOINTS.API_BASE_URL}/api/users/details/${user._id}`
        );

        setUserDetails(response.data.user);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  if (!userDetails) {
    return <p className="text-center text-gray-600 mt-10">Loading...</p>;
  }

  return (
    <div className="flex-1 h-full bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Your Institutions & Consultants
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {userDetails.institutions.map((institution, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            {/* Institution Details */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-large font-bold text-gray-900">
                  Selection {index + 1}
                </h3>
                <p className="text-gray-700">
                  <strong>University:</strong> {institution.university}
                </p>
                <p className="text-gray-700">
                  <strong>College:</strong> {institution.college}
                </p>
              </div>
            </div>

            {/* Consultant Details */}
            <div className="border-t pt-4 mt-4">
              <h4 className="text-md font-medium text-gray-900 mb-2">
                Assigned Consultant
              </h4>
              {institution.assigned_consultant ? (
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                    <User className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold">
                      {institution.assigned_consultant.name}
                    </p>
                    <div className="mt-1 space-y-1">
                      <div className="flex items-center text-gray-500">
                        <Mail className="h-4 w-4 mr-2" />
                        <span>{institution.assigned_consultant.email}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <MessageCircleMore className="h-4 w-4 mr-2" />
                        <a
                          href={`https://wa.me/${institution.assigned_consultant.phone.replace(
                            /\D/g,
                            ""
                          )}?text=Hello%20${
                            institution.assigned_consultant.name
                          },%20I%20need%20some%20guidance.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {institution.assigned_consultant.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-red-500">No consultant assigned</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
