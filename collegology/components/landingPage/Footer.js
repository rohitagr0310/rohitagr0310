// Footer.jsx

import { FaArrowUp, FaEnvelope, FaPhone } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#2c2c2c] text-[#6e6f70] py-10">
      <div className="container mx-auto px-6 lg:px-16 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/images/collegologyy-logo.png" // Update the path as per your project structure
            alt="Collegology Logo"
            className="h-48"
          />
        </div>

        {/* Contact Details */}
        <div>
          <h3 className="text-lg text-[#ffffff] font-semibold font-serif">
            Contact
          </h3>
          <div className="mt-4 space-y-2 font-serif">
            <a
              href="tel:+91XXXXXXXXXX"
              className="flex items-center gap-2 text-[#6e6f70] hover:text-yellow-500"
            >
              <FaPhone className="text-yellow-500" /> +91 XXXXXXXXXX
            </a>
            <a
              href="mailto:support@collegology.com"
              className="flex items-center gap-2 text-[#6e6f70] hover:text-yellow-500"
            >
              <FaEnvelope className="text-yellow-500" /> support@collegology.com
            </a>
          </div>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg text-[#ffffff] font-semibold font-serif">
            Company
          </h3>
          <ul className="mt-4 space-y-2 font-serif">
            <li>
              <a href="#about" className="text-[#6e6f70] hover:text-yellow-500">
                About
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="text-[#6e6f70] hover:text-yellow-500"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg text-[#ffffff] font-semibold font-serif">
            Links
          </h3>
          <ul className="mt-4 space-y-2 font-serif">
            <li>
              <a
                href="#courses"
                className="text-[#6e6f70] hover:text-yellow-500"
              >
                Courses
              </a>
            </li>
            <li>
              <a href="#faq" className="text-[#6e6f70] hover:text-yellow-500">
                FAQs
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 border-t border-gray-700 text-center pt-6 text-sm font-serif">
        <p>
          Join Collegology Today! Your dream college is just a step away. Let’s
          make your admission journey smooth and stress-free!
        </p>
        <div className="mt-4 flex justify-center gap-6 font-serif">
          <a href="#home" className="text-yellow-500 hover:text-yellow-300">
            Start Your Journey Now
          </a>
        </div>
      </div>

      {/* Scroll to Top Button with Line */}
      <div className="relative mt-10 font-serif">
        <div className="border-t border-gray-700 w-full mx-auto"></div>
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-3 bg-yellow-500 p-3 rounded-full cursor-pointer">
          <FaArrowUp className="text-black" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
