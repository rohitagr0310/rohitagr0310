"use client";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { forwardRef, useEffect, useState } from "react";
import { FaInstagram } from "react-icons/fa";


const Header = forwardRef((prop, ref) => {
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleClickRegister = () => {
    if (role === "admin") {
      router.push("/admin");
    } else if (role === "user") {
      router.push("/user");
    } else if (role === "consultant") {
      router.push("/consultant");
    } else {
      router.push("/register");
    }
  };

  const handleClickLogin = () => {
    if (role === "admin") {
      router.push("/admin");
    } else if (role === "user") {
      router.push("/user");
    } else if (role === "consultant") {
      router.push("/consultant");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="bg-[#284855] text-13px font-roboto" ref={ref}>
      <div className="container h-[180px] mx-auto px-4 py-2">
        <div className="bg-[#284855] text-white">
          <div className="container mx-auto px-4 py-2">
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex space-x-4 text-[20px]">
                <a href="tel:8003888090" className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">+91 9981185014</span>
                </a>
                {/* <a
                  href="https://www.google.com/maps?q=58+Howard+Street+%232+San+Francisco"
                  className="flex items-center"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">
                    Vijay Nagar Square , Indore
                  </span>
                </a> */}
                <a
                  href="mailto:contact@eduma.com"
                  className="flex items-center"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">
                    Collegologyteam@gmail.com
                  </span>
                </a>
              </div>
              <div className="flex space-x-4 text-[20px]">
                <button
                  className="text-white hover:text-[#FFB606]"
                  onClick={handleClickRegister}
                >
                  Register
                </button>
                <button
                  className="text-white hover:text-[#FFB606]"
                  onClick={handleClickLogin}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
        <hr className="border-b border-gray-300" />
        <div className="flex mt-8 mb-8 items-center w-full px-6 md:px-10">
          <div className="relative w-32 h-8">
            <h1 className="flex items-center justify-center h-full">
              <img
                src="/images/collegologyy-logo.png"
                alt="Collegology Logo"
                className="w-56 h-auto"
              />
            </h1>
          </div>
          <div
            className="md:hidden ml-auto cursor-pointer"
            onClick={toggleMenu}
          >
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </div>
        </div>
        <div
          className={`fixed top-0 right-0 w-64 h-full bg-[#FFB606] bg-opacity-90 z-50 transform ${isOpen ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-300 ease-in-out`}
        >
          <button
            className="absolute top-4 right-6 text-3xl text-black"
            onClick={closeMenu}
          >
            ×
          </button>
          <div className="flex flex-col items-center pt-20 space-y-8">
            <Link
              href="/"
              className="text-black text-xl hover:text-[#284855]"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              href="#about"
              className="text-black text-xl hover:text-[#284855]"
              onClick={closeMenu}
            >
              About Us
            </Link>
            <Link
              href="#contact"
              className="text-black text-xl hover:text-[#284855]"
              onClick={closeMenu}
            >
              Contact
            </Link>
          </div>
        </div>
        <nav className="hidden md:flex shadow bg-cover bg-center bg-no-repeat z-[1]">
          <div className="container bg-[#FFB606] rounded-lg mx-auto px-10 relative z-10 flex justify-between items-center h-16 text-[20px] font-bold">
            <div className="flex gap-6 space-x-8">
              <Link href="/" className="text-black hover:text-[#284855]">
                Home
              </Link>
              <Link href="#about" className="text-black hover:text-[#284855]">
                About Us
              </Link>
              <Link href="#contact" className="text-black hover:text-[#284855]">
                Contact
              </Link>
            </div>
            <div className="flex gap-6 space-x-4">
              {/* <a href="#" className="text-black text-2xl hover:text-[#284855]">
                <FaFacebook />
              </a>
              <a href="#" className="text-black text-2xl hover:text-[#284855]">
                <FaTwitter />
              </a> */}
              <a href="https://www.instagram.com/collegologyy?igsh=bGZhZm1lYnZmc2R2" className="text-black text-2xl hover:text-[#284855]">
                <FaInstagram />
              </a>
              {/* <a href="#" className="text-black text-2xl hover:text-[#284855]">
                <FaLinkedin />
              </a> */}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
);

export default Header;
