"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const Sidebar = ({ role = "user" }) => {
  const router = useRouter();
  const pathname = usePathname();

  // Define allowed pages per role
  const rolePages = {
    user: ["/user", "/user/select-course", "/user/change-password", "/user/profile"],
    consultant: ["/consultant", "/consultant/tickets", "/consultant/popup-tickets", "/consultant/change-password", "/consultant/profile"],
    admin: ["/admin", "/admin/add-university", "/admin/manage-university", "/admin/manage-consultant", "/admin/tickets-list", "/admin/popup-tickets-list", "/admin/add-consultant", "/admin/change-password", "/admin/profile"]
  };

  // Redirect if user tries to access an unauthorized page
  useEffect(() => {
    if (!rolePages[role]?.includes(pathname) && pathname !== "/" && pathname !== "/login" && pathname !== "/register") {
      router.push("/unauthorized");
    }
  }, [pathname, role]);

  const capitalize = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const getLinks = () => {
    return rolePages[role]?.map((page) => (
      <Link key={page} href={page} className="block px-4 py-2 text-white hover:bg-white hover:text-black rounded-md transition">
        {capitalize(page.split("/").pop().replace("-", " "))}
      </Link>
    ));
  };

  return (
    <div className="h-full min-h-screen bg-[#284855] text-white py-6 px-4  max-w-xs md:w-64 overflow-auto">
      <h2 className="text-lg font-semibold text-white mb-4">{capitalize(role)} Dashboard</h2>
      <div className="space-y-2">{getLinks()}</div>
    </div>
  );
};

export default Sidebar;
