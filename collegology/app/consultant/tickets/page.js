"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Mail, Phone, User, XCircle } from "lucide-react";
import axios from "axios";
import API from "../../../config/api";

const ConsultantTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const consultantId = JSON.parse(localStorage.getItem("user"))._id;
      try {
        const response = await axios.get(
          `${API.API_BASE_URL}/api/tickets/consultant/${consultantId}`
        );
        setTickets(response.data.tickets);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  const [activeTab, setActiveTab] = useState("Open");

  const updateTicketStatus = async (ticketId, newStatus) => {
    try {
      await axios.put(`${API.API_BASE_URL}/api/tickets/${ticketId}/status`, {
        status: newStatus
      });
      setTickets(
        tickets.map((ticket) =>
          ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
        )
      );
    } catch (error) {
      console.error("Error updating ticket status:", error);
    }
  };

  return (
    <div className="bg-white bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="flex space-x-4 border-b pb-2">
            {["Open", "Closed", "Not Interested"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition duration-200 ${
                  activeTab === tab
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab} Tickets
              </button>
            ))}
          </div>

          {tickets.filter((ticket) => ticket.status === activeTab).length ===
          0 ? (
            <p className="text-center text-gray-500 mt-6">
              No {activeTab.toLowerCase()} tickets found.
            </p>
          ) : (
            tickets
              .filter((ticket) => ticket.status === activeTab)
              .map((ticket) => (
                <div
                  key={ticket.id}
                  className="bg-white shadow rounded-lg overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                          <User className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div>
                          <h2 className="text-lg font-medium text-gray-900">
                            {ticket.user.name}
                          </h2>
                          <div className="mt-1 flex items-center text-sm text-gray-500">
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              {ticket.status}
                            </span>
                            <span className="mx-2">•</span>
                            <span>Created on {ticket.createdAt}</span>
                          </div>
                        </div>
                      </div>
                      {ticket.status === "Open" && (
                        <div className="flex mt-4 sm:mt-0 space-x-2">
                          <button
                            onClick={() =>
                              updateTicketStatus(ticket.id, "Closed")
                            }
                            className="inline-flex items-center px-3 py-2 border border-green-600 rounded-md text-sm font-medium text-green-600 bg-white hover:bg-green-50"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Close
                          </button>
                          <button
                            onClick={() =>
                              updateTicketStatus(ticket.id, "Not Interested")
                            }
                            className="inline-flex items-center px-3 py-2 border border-red-600 rounded-md text-sm font-medium text-red-600 bg-white hover:bg-red-50"
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Mark Not Interested
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-gray-500">
                          Contact Information
                        </h3>
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center text-sm text-gray-900">
                            <Mail className="h-4 w-4 mr-2 text-gray-400" />
                            {ticket.user.email}
                          </div>
                          <div className="flex items-center text-sm text-gray-900">
                            <Phone className="h-4 w-4 mr-2 text-gray-400" />
                            {ticket.user.phone}
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-gray-500">
                          University & College
                        </h3>
                        <div className="mt-2 space-y-2">
                          <p className="text-sm text-gray-900">
                            {ticket.user.university}
                          </p>
                          <p className="text-sm text-gray-900">
                            {ticket.user.college}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultantTickets;
