import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const UniversitySection = () => {
  const universities = [
    {
      name: "STUDENT SPONSORSHIP PROGRAM",
      description:
        "For every 10 students 1 will receive full scholarship for their fees from collegology.",
      imageUrl: "/images/sponsorship.webp",
    },
    {
      name: "IITs, NITs & IIITs",
      description: "Premier engineering institutes.",
      imageUrl: "/images/IIT.webp",
    },
    {
      name: "AIIMS & JIPMER",
      description: "Top medical colleges.",
      imageUrl: "/images/AIIMS.webp",
    },
    {
      name: "IIMs, XLRI & SPJIMR",
      description: "Leading management schools.",
      imageUrl: "/images/IIM.webp",
    },
    {
      name: "Delhi University, JNU, BHU, AMU",
      description: "Top humanities and science institutions.",
      imageUrl: "/images/DU.webp",
    },
    {
      name: "NLUs & Symbiosis Law School",
      description: "India's finest law colleges.",
      imageUrl: "/images/NLU.webp",
    },
    {
      name: "IHM Institutes",
      description: "Leading hospitality management institutions.",
      imageUrl: "/images/HIM.webp",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Slow auto-slide (every 5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % universities.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [universities.length]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="relative min-h-[600px] flex items-center justify-center py-10 md:py-16 bg-gray-50">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out before:absolute before:inset-0 before:bg-black before:opacity-50"
        style={{
          backgroundImage: `url(${universities[currentIndex].imageUrl})`,
        }}
      ></div>

      <div className="relative container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 3.15 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-3xl font-bold drop-shadow-lg transition-all duration-200 hover:text-yellow-500 text-white">
            Top Indian Universities & Colleges
          </h2>
          <p className="text-gray-200 text-sm md:text-base mt-2 drop-shadow-lg">
            Explore and apply to India's most prestigious institutions.
          </p>
        </motion.div>

        {/* Card Section */}
        <div className="relative flex justify-center">
          <motion.div
            key={currentIndex}
            className="relative w-full max-w-md bg-transparent text-center shadow-lg p-6 transition-opacity duration-700"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 3.5, ease: "easeInOut" }}
          >
            <h3 className="font-bold text-white text-lg drop-shadow-lg hover:text-yellow-500">
              {universities[currentIndex].name}
            </h3>
            <p className="text-gray-200 text-sm mt-2 drop-shadow-lg">
              {universities[currentIndex].description}
            </p>

            {/* Slider Dots */}
            <div className="flex justify-center mt-4">
              {universities.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-3 h-3 mx-1 rounded-full transition-all duration-200 ${currentIndex === index
                    ? "bg-[#FFB606] scale-125"
                    : "bg-gray-400"
                    }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default UniversitySection;
