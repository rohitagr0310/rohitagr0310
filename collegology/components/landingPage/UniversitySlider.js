import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";


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
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true }); // `once` ensures it only runs once



  useEffect(() => {
    if (!isInView) return;

    const duration = currentIndex === 0 ? 7000 : 5000;

    const timeout = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % universities.length);
    }, duration);

    return () => clearTimeout(timeout);
  }, [currentIndex, universities.length, isInView]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[600px] flex items-center justify-center py-10 md:py-16 bg-gray-50"
    >      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out before:absolute before:inset-0 before:bg-black before:opacity-50"
        style={{
          backgroundImage: `url(${universities[currentIndex].imageUrl})`,
        }}
      ></div>

      <div className="relative container mx-auto px-4 max-w-5xl">
        {currentIndex !== 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={isInView ? { duration: 5.15 } : { duration: 0 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-3xl font-bold drop-shadow-lg transition-all duration-200 hover:text-yellow-500 text-white">
              Top Indian Universities & Colleges
            </h2>
            <p className="text-gray-200 text-sm md:text-base mt-2 drop-shadow-lg">
              Explore and apply to India's most prestigious institutions.
            </p>
          </motion.div>
        )}


        {/* Card Section */}
        <div className="relative flex justify-center">
          {currentIndex === 0 ? (
            // Custom content for the first slide
            <motion.div
              key="sponsorship"
              className="relative w-full max-w-4xl bg-transparent text-center shadow-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={isInView ? { duration: 0.6, ease: "easeOut" } : { duration: 0 }}
            >
              <h1 className="font-bold text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl drop-shadow-lg hover:text-yellow-500">
                {universities[0].name}
              </h1>
              <p className="text-gray-200 text-base sm:text-lg md:text-xl lg:text-2xl mt-4 drop-shadow-lg">
                {universities[0].description}
              </p>

              {/* Slider Dots */}
              <div className="flex justify-center mt-6">
                {universities.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`w-3 h-3 mx-1 rounded-full transition-all duration-200 ${currentIndex === index ? "bg-[#FFB606] scale-125" : "bg-gray-400"
                      }`}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            // Standard card for other slides
            <motion.div
              key={currentIndex}
              className="relative w-full max-w-md bg-transparent text-center shadow-lg p-6 transition-opacity duration-700"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
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
          )}
        </div>


      </div>
    </section>
  );
};

export default UniversitySection;
