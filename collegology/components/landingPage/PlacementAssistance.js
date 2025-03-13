"use client";
import { motion } from "framer-motion";
import { Award, Briefcase, FileText, UserCheck, Users } from "lucide-react";
import { useEffect, useState } from "react";

const PlacementAssistance = () => {
    const [selectedFeature, setSelectedFeature] = useState(0);
    const [isMobileView, setIsMobileView] = useState(false);

    const features = [
        { title: "Internships & Jobs", desc: "Exclusive job and internship listings from top companies.", image: "/images/placement-1.webp", icon: <UserCheck /> },
        { title: "Resume & Interview Prep", desc: "Expert guidance for resumes and interview success.", image: "/images/placement-2.webp", icon: <FileText /> },
        { title: "Skill Development Programs", desc: "Industry-focused courses to boost your employability.", image: "/images/placement-3.webp", icon: <Award /> },
        { title: "Recruiter Connections", desc: "Network with top recruiters and industry professionals.", image: "/images/placement-4.webp", icon: <Users /> },
        { title: "Mock Interviews & Career Counseling", desc: "Personalized sessions to boost confidence and job readiness.", image: "/images/placement-5.webp", icon: <Briefcase /> }
    ];

    const handleResize = () => {
        setIsMobileView(window.innerWidth <= 768);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <section className="bg-[#FFFDFA] py-12 px-6 md:px-12 lg:px-24">
            <div className="max-w-6xl mx-auto text-center">
                <motion.h2
                    className="text-3xl md:text-4xl font-bold text-[#284855] mb-6 flex items-center justify-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Your Career Success, Our Commitment!
                </motion.h2>

                <motion.p
                    className="text-lg md:text-xl text-gray-700 mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    At <strong>Collegology</strong>, we go beyond admissions – we help students secure top placements in leading companies with
                    <strong> attractive salary packages!</strong>
                </motion.p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left side: Image (Only for larger screens) */}
                    {!isMobileView && (
                        <div className="relative flex justify-center items-center">
                            <motion.div
                                className="absolute inset-0 flex justify-center items-center"
                                key={selectedFeature}
                                initial={{ opacity: 0, x: -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <img
                                    src={features[selectedFeature].image}
                                    alt={features[selectedFeature].title}
                                    className="object-cover w-full h-full rounded-lg shadow-lg"
                                />
                            </motion.div>
                        </div>
                    )}
                    {/* Right side: Content */}
                    <div className="space-y-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-lg shadow-lg p-4 cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-xl"
                                onClick={() => setSelectedFeature(index)}
                                initial={{ opacity: 0, x: -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                            >
                                <div className="text-[#FFB606] text-4xl mb-3">{feature.icon}</div>
                                <h3 className="font-bold text-gray-700 mb-2 hover:text-[#FFB606]">{feature.title}</h3>
                                <p className="text-gray-600">{feature.desc}</p>
                                {isMobileView && selectedFeature === index && (
                                    <motion.div
                                        className="mt-4 rounded-lg overflow-hidden"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <img
                                            src={feature.image}
                                            alt={feature.title}
                                            className="object-cover w-full h-48 rounded-lg shadow-lg"
                                        />
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PlacementAssistance;