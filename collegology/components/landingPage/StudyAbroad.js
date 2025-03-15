"use client";
import { motion } from "framer-motion";
import {
  BookOpen,
  CreditCard,
  FileText,
  GraduationCap,
  Plane
} from "lucide-react";
import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { forwardRef } from "react";

const StudyAbroad = forwardRef(function StudyAbroad(props, ref) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const features = [
    {
      icon: <GraduationCap />,
      title: "University Selection",
      desc: "Expert recommendations based on your profile."
    },
    {
      icon: <FileText />,
      title: "Application Assistance",
      desc: "Hassle-free guidance for SOPs, LORs, and applications."
    },
    {
      icon: <BookOpen />,
      title: "Test Preparation",
      desc: "Help with IELTS, TOEFL, GRE, GMAT, and SAT."
    },
    {
      icon: <Plane />,
      title: "Visa & Immigration",
      desc: "Smooth visa application process with expert guidance."
    },
    {
      icon: <CreditCard />,
      title: "Scholarship & Loan Guidance",
      desc: "Explore funding options to make education affordable."
    }
  ];

  return (
    <section
      className="bg-[#FFFDFA] py-10 px-4 sm:px-6 md:px-12 lg:px-32"
      id="study-abroad"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#284855] mb-6 flex items-center justify-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Study Abroad!
        </motion.h2>

        <motion.p
          className="text-sm sm:text-lg md:text-xl text-gray-700 mb-8 px-2 sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Thinking about studying abroad? Get expert guidance for top
          universities in{" "}
          <strong>
            Bulgaria, Croatia, Denmark, Poland, Portugal, Serbia, France, and
            Slovakia!
          </strong>
        </motion.p>

        {/* Slider with all features */}
        <motion.div
          className="p-4 sm:p-6 bg-white shadow-lg rounded-lg flex flex-col items-center text-center max-w-4xl mx-auto w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-base text-gray-700 sm:text-lg font-semibold mb-4">
            Our Comprehensive Services
          </h3>
          <Carousel
            showArrows={true}
            showStatus={false}
            showIndicators={false}
            infiniteLoop
            autoPlay
            interval={3000}
            showThumbs={false}
            className="w-full max-w-xs sm:max-w-sm md:max-w-md"
          >
            {features.map((item, index) => (
              <div key={index} className="flex flex-col items-center w-full">
                <div className="text-[#FFB606] text-3xl sm:text-4xl mb-2">
                  {item.icon}
                </div>
                <h4 className="text-sm sm:text-base text-gray-700 font-semibold">
                  {item.title}
                </h4>
                <p className="text-gray-700 text-xs sm:text-sm max-w-xs">
                  {item.desc}
                </p>
              </div>
            ))}
          </Carousel>
        </motion.div>

        {/* CTA Button with Dropdown */}
        {/* <div className="relative inline-block">
                    <motion.button
                        className="mt-6 sm:mt-8 bg-[#284855] text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm hover:bg-[#FFB606] transition duration-300"
                        whileHover={{ scale: 1.1 }}
                    >
                        📍 Explore Study Abroad Options
                    </motion.button>
                </div> */}
      </div>
    </section>
  );
});

StudyAbroad.displayName = "StudyAbroad";
export default StudyAbroad;
