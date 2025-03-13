import { motion } from "framer-motion";
import { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <motion.div
      className=" from-blue-50 to-white py-16"
      id="faq"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center ">
        <motion.h2
          className="text-4xl font-bold text-gray-900 mb-12 hover:text-yellow-500"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          FAQs
        </motion.h2>

        <div className="space-y-4">
          {/* FAQ 1 */}
          <motion.div
            className="bg-[#F5F5F5] p-6 rounded-xl shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.6 }}
            onClick={() => toggleAccordion(0)}
          >
            <h3 className="text-xl font-semibold text-gray-800 hover:text-yellow-500">
              How does Collegology.com help in college admissions?
            </h3>
            {activeIndex === 0 && (
              <motion.p
                className="text-gray-600 mt-2"
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                We provide a comprehensive platform for students to explore
                colleges, get career counseling, apply for multiple
                universities, and receive expert admission guidance.
              </motion.p>
            )}
          </motion.div>

          {/* FAQ 2 */}
          <motion.div
            className="bg-[#F5F5F5] p-6 rounded-xl shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.7 }}
            onClick={() => toggleAccordion(1)}
          >
            <h3 className="text-xl font-semibold text-gray-800 hover:text-yellow-500">
              Can I apply to multiple colleges through your platform?
            </h3>
            {activeIndex === 1 && (
              <motion.p
                className="text-gray-600 mt-2"
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                Yes! Collegology allows you to apply to multiple universities
                through a single application process.
              </motion.p>
            )}
          </motion.div>

          {/* FAQ 3 */}
          <motion.div
            className="bg-[#F5F5F5] p-6 rounded-xl shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.8 }}
            onClick={() => toggleAccordion(2)}
          >
            <h3 className="text-xl font-semibold text-gray-800 hover:text-yellow-500">
              Do you provide assistance for entrance exam preparation?
            </h3>
            {activeIndex === 2 && (
              <motion.p
                className="text-gray-600 mt-2"
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                Absolutely! We offer expert mentoring and resources for JEE,
                NEET, CAT, CUET, and many more exams.
              </motion.p>
            )}
          </motion.div>

          {/* FAQ 4 */}
          <motion.div
            className="bg-[#F5F5F5] p-6 rounded-xl shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.9 }}
            onClick={() => toggleAccordion(3)}
          >
            <h3 className="text-xl font-semibold text-gray-800 hover:text-yellow-500">
              How can I get information about scholarships?
            </h3>
            {activeIndex === 3 && (
              <motion.p
                className="text-gray-600 mt-2"
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                We guide students on various scholarship opportunities based on
                merit, financial need, and category-based eligibility.
              </motion.p>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default FAQ;
