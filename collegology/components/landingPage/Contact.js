import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaGlobe,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaRegCommentDots,
} from "react-icons/fa";

const Contact = () => {
  return (
    <motion.div
      className="from-blue-50 to-white py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="contact"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          className="text-4xl font-bold text-gray-900 mb-8 hover:text-yellow-500"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          Contact Us
        </motion.h1>

        <div className=" rounded-xl shadow-lg p-8">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Contact Info */}
            <motion.div
              className="space-y-6"
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="flex items-center">
                <FaPhoneAlt className="w-6 h-6 text-[#FFB606] mr-3" />
                <div>
                  <p className="font-medium text-gray-600 mr-40px">
                    +91 9981185014
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <FaEnvelope className="w-6 h-6 text-[#FFB606] mr-3" />
                <div>
                  <p className="font-medium text-gray-600 mr-40px">
                    Collegologyteam@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <FaGlobe className="w-6 h-6 text-[#FFB606] mr-3" />
                <div>
                  <p className="font-medium text-gray-600 mr-40px">
                    www.collegology.com
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <FaMapMarkerAlt className="w-6 h-6 text-[#FFB606] mr-3" />
                <div>
                  <p className="font-medium text-gray-600 mr-40px">
                    Vijay Nagar Square , Indore
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <FaRegCommentDots className="w-6 h-6 text-[#FFB606] mr-3" />
                <div>
                  <p className="font-medium text-gray-600 mr-40px">
                    Support Available 24/7
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-1.5 border rounded-md focus:ring-2 focus:ring-[#284855] focus:outline-none text-black"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-1.5 border rounded-md focus:ring-2 focus:ring-[#284855] focus:outline-none text-black"
              />
              <textarea
                placeholder="Your Message"
                rows={3}
                className="w-full px-4 py-1.5 border rounded-md focus:ring-2 focus:ring-[#284855] focus:outline-none text-black"
              />
              <motion.button
                className="w-full bg-[#FFB606] text-white py-2 px-6 rounded-md hover:bg-[#FF9C00] transition duration-150"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                Contact Us Now
              </motion.button>
            </motion.form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
