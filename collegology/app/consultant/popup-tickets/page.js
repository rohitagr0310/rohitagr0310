"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, User, Globe } from "lucide-react";
import axios from "axios";
import API from "../../../config/api";

const ConsultantTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const consultantId = JSON.parse(localStorage.getItem("user"))._id;
      try {
        const response = await axios.get(
          `${API.API_BASE_URL}/api/popup-tickets/get-consultant/${consultantId}`
        );
        setTickets(response.data.tickets);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div className="bg-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Education Tickets
        </h2>

        {tickets.length === 0 ? (
          <p className="text-center text-gray-500 mt-6">No tickets found.</p>
        ) : (
          tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-white shadow rounded-lg overflow-hidden mb-4"
            >
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                    <User className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">
                      {ticket.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Created on{" "}
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500">
                      Contact Information
                    </h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center text-sm text-gray-900">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        {ticket.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-900">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        {ticket.number}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500">
                      Education
                    </h3>
                    <p className="mt-2 text-sm text-gray-900">
                      {ticket.education}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500">
                      Country
                    </h3>
                    <p className="mt-2 text-sm text-gray-900">
                      <Globe className="h-4 w-4 inline-block mr-2 text-gray-400" />
                      {ticket.country || "N/A"}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500">
                      Assigned Consultant
                    </h3>
                    <p className="mt-2 text-sm text-gray-900">
                      {ticket.assigned_consultant.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ConsultantTickets;
