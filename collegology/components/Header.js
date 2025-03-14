"use client";

import axios from "axios";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import API from "../config/api";

export default function Header({ toggleSidebar }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // Logout function
  const handleLogout = async () => {
    try {
      setLoading(true);
      await axios.get(API.API_ENDPOINTS.LOGOUT, {
        withCredentials: true
      }); // Ensure the correct API endpoint
      localStorage.removeItem("role");
      localStorage.removeItem("user");
      if (router) {
        router.push("/"); // Redirect to home page after logout
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="border-b px-4 py-3 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Sidebar Toggle Button */}
        <button className="md:hidden text-gray-600" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>

        <Link href="/">
          <img
            src="/images/logo.webp"
            alt="Collegology Logo"
            className="w-32 h-auto"
          />
        </Link>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-[#FFB606] border border-[#FFB606] rounded-md hover:bg-[#FFB606] hover:text-white disabled:opacity-50"
        >
          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </nav>
  );
}
