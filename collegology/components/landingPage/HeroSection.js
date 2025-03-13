"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const images = [
  "/images/hero-1.webp",
  "/images/hero-2.webp",
  "/images/hero-3.webp",
];

const HeroSection = () => {
  const router = useRouter();
  const [role, setRole] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    if (role === "admin") {
      router.push("/admin");
    } else if (role === "user") {
      router.push("/user");
    } else if (role === "consultant") {
      router.push("/consultant");
    } else {
      router.push("/register");
    }
  };

  return (
    <div className="relative h-[800px] w-full overflow-hidden" id="home">
      {images.map((image, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentImage ? 1 : 0 }}
          transition={{ duration: 1.5 }}
        >
          <Image
            src={image}
            alt="College Admissions"
            layout="fill"
            objectFit="cover"
            priority
          />
        </motion.div>
      ))}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
        <div className="container mx-auto px-6 md:px-10 font-serif">
          <div className="max-w-3xl text-white md:text-left">
            <p className="text-lg md:text-xl mb-2 uppercase">
              Your One-Stop Solution for
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 animate-looping-typing text-[#FFB606] ">
              COLLEGE ADMISSIONS
            </h1>
            <ul className="mt-4 space-y-3 text-base md:text-lg">
              <li className="flex items-center gap-2">
                Explore Thousands of Colleges
              </li>
              <li className="flex items-center gap-2">Get Expert Guidance</li>
              <li className="flex items-center gap-2">
                Seamless Application Process
              </li>
            </ul>
            <button
              onClick={handleClick}
              className="mt-6 bg-[#FFB606] text-black font-bold px-6 py-3 rounded-lg transition hover:bg-yellow-500"
            >
              EXPLORE NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
