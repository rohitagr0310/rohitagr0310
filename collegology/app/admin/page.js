"use client";
import { Activity, Calendar, User } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import API from "@/config/api";

const SuperAdminPanel = () => {
  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConsultantsData = async () => {
      try {
        // Fetch all consultants
        const consultantsResponse = await axios.get(
          `${API.API_BASE_URL}/api/consultants`
        );
        const consultantsData = consultantsResponse.data.consultants;

        // Fetch tickets for each consultant
        const consultantsWithTickets = await Promise.all(
          consultantsData.map(async (consultant) => {
            try {
              const ticketsResponse = await axios.get(
                `${API.API_BASE_URL}/api/tickets/consultant-short/${consultant._id}`
              );
              const ticketsData = ticketsResponse.data.tickets || [];

              return {
                ...consultant,
                assignedTickets: ticketsData.length || 0,
                completedTickets:
                  ticketsData.filter((ticket) => ticket.status === "Closed")
                    .length || 0,
              };
            } catch (error) {
              console.error(
                `Error fetching tickets for consultant ${consultant._id}:`,
                error
              );
              return {
                ...consultant,
                assignedTickets: 0,
                completedTickets: 0,
              };
            }
          })
        );

        setConsultants(consultantsWithTickets);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchConsultantsData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while data is being fetched
  }

  return (
    <div className="h-full bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <User className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Consultants
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {consultants.length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Calendar className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      On Leave
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {
                        consultants.filter((c) => c.status === "On Leave")
                          .length
                      }
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Activity className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Tickets Completed
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {consultants.reduce(
                        (sum, c) => sum + c.completedTickets,
                        0
                      )}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Consultants List */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Consultants Overview
            </h2>
            <div className="space-y-4">
              {consultants.map((consultant) => (
                <div
                  key={consultant._id}
                  className="border rounded-lg p-4 flex flex-wrap items-center justify-between sm:flex-nowrap"
                >
                  <div className="flex items-center space-x-4 w-full sm:w-auto">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <User className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {consultant.name}
                      </h3>
                      <div className="mt-1 space-y-1">
                        <div className="text-sm text-gray-500">
                          {consultant.email}
                        </div>
                        <div className="text-sm text-gray-500">
                          {consultant.phone}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                    {consultant.status === "On Leave" && (
                      <span className="text-sm font-medium text-white bg-red-500 px-2 py-1 rounded-full">
                        On Leave
                      </span>
                    )}
                    <div className="text-sm text-gray-500">
                      <div>Assigned: {consultant.assignedTickets}</div>
                      <div>Completed: {consultant.completedTickets}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminPanel;
