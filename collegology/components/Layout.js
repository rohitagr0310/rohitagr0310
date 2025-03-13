"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const [role, setRole] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Track sidebar open state for small screens
  const pathname = usePathname();
  const router = useRouter();

  // Fetch role from session/local storage (or API)
  useEffect(() => {
    const userRole = localStorage.getItem("role"); // Fetch role from storage
    if (
      !userRole &&
      pathname !== "/" &&
      pathname !== "/login" &&
      pathname !== "/register" &&
      pathname !== "/unauthorized"
    ) {
      router.push("/login"); // Redirect to login if role is missing
    } else {
      setRole(userRole);
    }
  }, [pathname, router]);

  // Define pages where sidebar should be shown
  const showSidebar = !["/", "/login", "/register", "/unauthorized"].includes(
    pathname
  );

  const showHeader = !["/", "/login", "/register", "/unauthorized"].includes(
    pathname
  );

  // Toggle sidebar for small screens
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="relative h-screen flex">
      {/* Sidebar Overlay - Show when the sidebar is open on small screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)} // Close sidebar when clicking outside
        />
      )}

      {/* Sidebar - Fixed on large screens, collapsible on small screens */}
      {showSidebar && role && (
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white z-50 transition-transform transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:relative md:translate-x-0`} // Sidebar stays fixed on md and larger screens
        >
          <Sidebar role={role} />
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {showHeader && <Header toggleSidebar={toggleSidebar} />}
        <main className="bg-white flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
