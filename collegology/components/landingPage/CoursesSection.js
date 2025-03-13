import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const CoursesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const courses = [
    { title: "Engineering & Technology", description: "B.Tech, M.Tech, Diploma", icon: "🎓" },
    { title: "Medical & Healthcare", description: "MBBS, BDS, Nursing, Ayurveda", icon: "🏥" },
    { title: "Management & Business", description: "BBA, MBA, PGDM", icon: "📈" },
    { title: "Law & Judiciary", description: "LLB, LLM, Integrated Law Programs", icon: "📜" },
    { title: "Arts, Humanities & Social Sciences", description: "BA, MA, Psychology, Sociology", icon: "🎭" },
    { title: "Computer Applications & IT", description: "BCA, MCA, Data Science, AI & ML", icon: "💻" },
    { title: "Commerce & Finance", description: "B.Com, M.Com, CA, CS, CFA", icon: "💰" },
    { title: "Hospitality & Travel", description: "Hotel Management, Tourism Studies", icon: "✈️" },
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % courses.length);
  };

  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(nextSlide, 2000);
      return () => clearInterval(interval);
    }
  }, [isMobile]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="py-16  bg-cover bg-center font-serif" id="courses">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-black text-center hover:text-yellow-500">
          Courses We Offer Guidance For
        </h2>
        <p className="text-center text-gray-600 text-black mb-8">
          Explore a wide range of undergraduate and postgraduate courses across India's top universities:
        </p>

        {!isMobile ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, index) => (
              <motion.div
                key={index}
                className="bg-gray-200 rounded-lg shadow-lg p-6 text-center bg-[#FFF6E1] "
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div className="text-5xl mb-4" animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                  {course.icon}
                </motion.div>
                <h3 className="font-bold text-gray-600 mb-2">{course.title}</h3>
                <p className="text-gray-500">{course.description}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="relative flex justify-center items-center">
            <motion.div
              className="overflow-hidden"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              key={currentIndex}
            >
              <div className="flex justify-center">
                <motion.div
                  className="flex-shrink-0 bg-gray-200 rounded-lg shadow-lg p-6 text-center cursor-pointer w-80 mx-2 hover:text-yellow-500"
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-5xl mb-4">{courses[currentIndex].icon}</div>
                  <h3 className="font-bold text-gray-600 mb-2">{courses[currentIndex].title}</h3>
                  <p className="text-gray-500">{courses[currentIndex].description}</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}

        {isMobile && (
          <div className="flex justify-center mt-6">
            {courses.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 mx-2 rounded-full ${currentIndex === index ? "bg-[#FFB606]" : "bg-gray-400"} transition-all duration-200`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
