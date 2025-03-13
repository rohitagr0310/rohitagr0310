import { CheckCircle, Lightbulb } from "lucide-react";

export default function About() {
  return (
    <div className="from-blue-50 to-white" id="about">
      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8 font-serif">
        {/* About Us Section */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h3 className="text-[#FFB606] uppercase font-semibold text-2xl">
              About Us
            </h3>
            <h2 className="text-5xl font-bold text-gray-900 mb-6 hover:text-yellow-500">
              Your Gateway to a Brighter Future
            </h2>
            <p className="text-2xl text-gray-700 mb-6 leading-relaxed">
              At Collegology.com, we believe that every student deserves access
              to quality education. Our mission is to bridge the gap between
              students and universities by providing a seamless, transparent,
              and efficient admission process.
            </p>
          </div>
          <div className="w-full lg:w-2/3 xl:w-1/2">
            <img
              src="/images/about.webp"
              alt="About Us"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-gray-100 rounded-xl shadow-lg p-10 mb-12 transition-all duration-300 hover:scale-105">
          <div className="flex items-center mb-6">
            <Lightbulb className="w-8 h-8 text-yellow-500 mr-3" />
            <h3 className="text-4xl font-bold text-gray-900 hover:text-yellow-500">
              Why Choose Us?
            </h3>
          </div>

          <div className="space-y-6 text-2xl">
            {[
              "Comprehensive database of Indian universities and colleges.",
              "Expert counseling for career guidance, entrance exams, and course selection.",
              "Hassle-free application tracking and admission updates.",
              "Assistance with scholarships, education loans, and hostel facilities.",
            ].map((feature, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 mr-3 flex-shrink-0 hover:text-yellow-500" />
                <p className="text-xl text-gray-700">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <p className="text-2xl text-gray-700 mb-6">
            Join Collegology.com and let us simplify your college admission
            journey!
          </p>
        </div>
      </div>
    </div>
  );
}
