"use client";
import API from "@/config/api";
import { useRef, useState } from "react";
import About from "./About";
import AdmissionServices from "./AdmissionServices";
import ContactUs from "./Contact";
import { CoursesSection } from "./CoursesSection";
import FAQ from "./FAQ";
import Footer from "./Footer";
import Header from "./Header";
import HeroSection from "./HeroSection";
import "./landing.css";
import PlacementAssistance from "./PlacementAssistance";
import StudyAbroad from "./StudyAbroad";
import Testimonials from "./Testimonials";
import UniversitySection from "./UniversitySlider";
import { WelcomeSection } from "./WelcomeSection";

const HomePage = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [userData, setUserData] = useState({
    name: "",
    number: "",
    email: "",
    education: "default",
    country: "default"
  });

  const studyAbroadRef = useRef(null);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${API.API_BASE_URL}/api/popup-tickets/create-lead`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData)
        }
      );
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("userSubmitted", "true");
        setShowPopup(false);
        studyAbroadRef.current?.scrollIntoView({ behavior: "smooth" });
      } else {
        console.error("Error creating lead:", data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDFA] font-serif">
      <Header />
      <HeroSection />
      <WelcomeSection />
      <About />
      <CoursesSection />
      <UniversitySection />
      <AdmissionServices />
      <StudyAbroad ref={studyAbroadRef} />
      <PlacementAssistance />
      <Testimonials />
      <FAQ />
      <ContactUs />
      <Footer />

      {/* Mandatory Popup Form */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold text-center text-[#FFB606] mb-4">
                Enter Your Details
              </h2>
              {/* <button
                onClick={() => setShowPopup(false)}
                className="text-black hover:text-gray-900 text-2xl mb-4"
              >
                &times;
              </button> */}
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                value={userData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded text-black"
              />
              <input
                type="tel"
                name="number"
                placeholder="Enter Number"
                value={userData.number}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded text-black"
              />
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={userData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded text-black"
              />
              <select
                name="education"
                value={userData.education}
                onChange={handleChange}
                className="w-full p-2 border rounded text-black"
              >
                <option value="default" disabled>
                  Select Degree
                </option>
                <option value="bachelor">Bachelor</option>
                <option value="master">Master</option>
              </select>
              <select
                name="country"
                value={userData.country}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded text-black"
              >
                <option value="default" disabled>
                  Select Country
                </option>
                <option value="Bulgaria">Bulgaria</option>
                <option value="Croatia">Croatia</option>
                <option value="Denmark">Denmark</option>
                <option value="Poland">Poland</option>
                <option value="Portugal">Portugal</option>
                <option value="Serbia">Serbia</option>
                <option value="France">France</option>
                <option value="Slovakia">Slovakia</option>
              </select>
              <button
                type="submit"
                className="w-full bg-[#FFB606] text-white p-2 rounded hover:bg-[#284855]"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
