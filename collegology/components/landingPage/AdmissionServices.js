import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const LandingPage = () => {
  const [selectedService, setSelectedService] = useState(0); // Default to the first service
  const [isMobileView, setIsMobileView] = useState(false);

  // Ensure services are defined here
  const services = [
    {
      title: "Application Form Filling",
      description:
        "No more confusion! We help you complete and submit applications for multiple colleges.",
      image: "/images/campus-life-1.webp", // Replace with actual image URL
    },
    {
      title: "Entrance Exam Preparation",
      description: "Expert guidance for JEE, NEET, CAT, CLAT, CUET, and more.",
      image: "/images/campus-life-2.webp", // Replace with actual image URL
    },
    {
      title: "Personalized Counseling",
      description: "Get tailored advice on course and college selection.",
      image: "/images/campus-life-3.webp", // Replace with actual image URL
    },
    {
      title: "Scholarship & Loan Assistance",
      description: "Discover financial aid options to support your education.",
      image: "/images/campus-life-4.webp", // Replace with actual image URL
    },
    {
      title: "Hostel & Accommodation Support",
      description:
        "Helping you find comfortable and affordable stay options near your college.",
      image: "/images/campus-life-5.webp", // Replace with actual image URL
    },
  ];

  // Detect mobile view
  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsMobileView(true);
    } else {
      setIsMobileView(false);
    }
  };

  // Add event listener for resizing window
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize on first load
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 font-serif">
        <h2 className="text-3xl font-bold text-center text-black mb-6 hover:text-yellow-500">
          Your Admission, Our Priority!
        </h2>
        <p className="text-[#FFB606] text-center mb-8">
          We provide complete admission assistance for students at every step of
          the way:
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
          {/* Left side: Content */}
          <div className="space-y-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-[#F5F5F5] rounded-lg shadow-lg p-4 cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-xl"
                onClick={() => setSelectedService(index)}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <h3 className="font-bold text-gray-700 mb-2 hover:text-yellow-500">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
                {isMobileView && selectedService === index && (
                  <motion.div
                    className="mt-4 rounded-lg overflow-hidden"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.5 }}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="object-cover w-full h-48 rounded-lg shadow-lg"
                    />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Right side: Image (Only for larger screens) */}
          {!isMobileView && (
            <div className="relative flex justify-center items-center">
              <motion.div
                className="absolute inset-0 flex justify-center items-center"
                key={selectedService}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src={services[selectedService].image}
                  alt={services[selectedService].title}
                  className="object-cover w-full h-full rounded-lg shadow-lg"
                />
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
