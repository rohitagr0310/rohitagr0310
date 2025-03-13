import { motion } from "framer-motion";
import Image from "next/image";

export const WelcomeSection = () => (
  <div className="py-16 ">
    <div className="container mx-auto px-4 font-serif">
      <motion.div
        className="flex flex-col md:flex-row items-center gap-8 border border-gray-300 mr-4 rounded-r-md bg-gray-100"
        initial={{ opacity: 0, rotateY: 90 }}
        animate={{ opacity: 1, rotateY: 0 }}
        transition={{ duration: 1.5, type: "spring", stiffness: 50 }}
      >
        <div className="w-full md:w-1/2">
          <div className="relative h-[400px] overflow-hidden">
            <Image
              src="/images/welcome.webp"
              alt="Welcome"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <motion.h3
            className="text-4xl text-[#FFB606] text-center font-bold mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, type: "spring", stiffness: 50 }}
          >
            Welcome to Collegology
          </motion.h3>
          <motion.p
            className="text-2xl text-gray-600 text-center mb-6 p-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, type: "spring", stiffness: 50 }}
          >
            Whether you're a student seeking the best-fit university or a parent
            looking for guidance, we provide end-to-end solutions to simplify
            your admission journey.
          </motion.p>
        </div>
      </motion.div>
    </div>
  </div>
);
