"use client";

import API from "@/config/api";
import { User } from "lucide-react"; // Import user icon from Lucide
import { useEffect, useState } from "react";

export default function StudentTickets() {
  const [search, setSearch] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [ticketList, setTicketList] = useState([]);
  const [consultants, setConsultants] = useState([]);

  useEffect(() => {
    // Fetch all tickets
    fetch(`${API.API_BASE_URL}/api/tickets/all`)
      .then((response) => response.json())
      .then((data) => {
        setTicketList(data.tickets);
      })
      .catch((error) => console.error("Error fetching tickets:", error));
  }, []);

  useEffect(() => {
    // Fetch consultant list
    fetch(`${API.API_BASE_URL}/api/consultants`)
      .then((response) => response.json())
      .then((data) => {
        setConsultants(data.consultants);
      })
      .catch((error) => console.error("Error fetching consultants:", error));
  }, []);

  const filteredTickets = ticketList.filter((ticket) =>
    ticket.studentName.toLowerCase().startsWith(search.toLowerCase())
  );

  const openPopup = (ticket) => {
    setSelectedTicket(ticket);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const assignConsultant = (consultantId) => {
    fetch(
      `${API.API_BASE_URL}/api/tickets/update-consultant/${selectedTicket.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ consultant_id: consultantId }),
      }
    )
      .then((response) => response.json())
      .then((updatedTicket) => {
        setTicketList((prevTickets) =>
          prevTickets.map((ticket) =>
            ticket.id === selectedTicket.id
              ? {
                ...ticket,
                consultantName: updatedTicket.ticket.consultant_id.name,
              }
              : ticket
          )
        );
        setShowPopup(false);
      })
      .catch((error) => console.error("Error updating consultant:", error));
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen flex flex-col items-center w-full">
      <input
        type="text"
        placeholder="Search Student..."
        className="mb-4 p-2 w-full max-w-md border rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="w-full max-w-6xl bg-white p-4 rounded shadow-md overflow-x-auto md:w-11/12 lg:w-10/12 xl:w-8/12">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
          <User className="text-gray-700" size={24} /> Tickets
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-sm md:text-base">
                <th className="py-2 px-3 text-left">Student Name</th>
                <th className="py-2 px-3 text-left">Consultant</th>
                <th className="py-2 px-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="border-b hover:bg-gray-100 text-xs sm:text-sm md:text-base">
                  <td className="py-2 px-3 text-gray-700">{ticket.studentName}</td>
                  <td className="py-2 px-3 text-gray-700">{ticket.consultantName || "Not Assigned"}</td>
                  <td className="py-2 px-3">
                    <button
                      onClick={() => openPopup(ticket)}
                      className="w-full sm:w-auto bg-blue-500 text-white px-3 py-1 rounded-lg text-xs sm:text-sm md:text-base"
                    >
                      Set Consultant
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg">
            <h2 className="text-lg font-bold mb-4 text-black text-center">Consultant List</h2>
            <div className="max-h-60 overflow-y-auto border p-2 rounded">
              {consultants.map((consultant) => (
                <div key={consultant._id} className="flex justify-between items-center p-2 border-b">
                  <span className="text-gray-700">{consultant.name}</span>
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                    onClick={() => assignConsultant(consultant._id)}
                  >
                    Done
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded-full"
                onClick={closePopup}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
