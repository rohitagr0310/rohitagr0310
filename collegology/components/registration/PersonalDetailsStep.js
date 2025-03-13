import { FaArrowLeft } from "react-icons/fa"; // Import FontAwesome icon (install react-icons package if not already)
import { FaLock, FaUserAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa"; // For icons

const PersonalDetailsStep = ({
  formData,
  updatePersonalData,
  prevStep,
  handleSubmit,
}) => {
  return (
    <div className="flex items-center justify-center bg-gray-100 p-4 sm:p-6 lg:p-8 overflow-auto min-h-full">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-lg flex flex-col">
        {/* Back Icon Section */}
        <div className="flex items-center p-4">
          <button onClick={prevStep} className="text-black text-xl">
            <FaArrowLeft />
          </button>
        </div>

        {/* Personal Details Form */}
        <div className="flex-1 p-6 sm:p-10 flex flex-col justify-center items-center">
          <h2 className="text-2xl sm:text-3xl text-[#FFB606] font-bold mb-6 text-center">
            Enter Your Personal Details
          </h2>

          {/* Full Name */}
          <div className="w-full sm:w-96 mb-4">
            <label htmlFor="name" className="flex items-center text-black mb-2">
              <FaUserAlt className="mr-2" /> Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Full Name"
              value={formData.personal.name}
              onChange={(e) => updatePersonalData("name", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#FFB606]"
            />
          </div>

          {/* Email */}
          <div className="w-full sm:w-96 mb-4">
            <label
              htmlFor="email"
              className="flex items-center text-black mb-2"
            >
              <FaEnvelope className="mr-2" /> Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={formData.personal.email}
              onChange={(e) => updatePersonalData("email", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#FFB606]"
            />
          </div>

          {/* Phone Number */}
          <div className="w-full sm:w-96 mb-4">
            <label
              htmlFor="phone"
              className="flex items-center text-black mb-2"
            >
              <FaPhoneAlt className="mr-2" /> Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="Phone Number"
              value={formData.personal.phone}
              onChange={(e) => updatePersonalData("phone", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#FFB606]"
            />
          </div>

          {/* Password */}
          <div className="w-full sm:w-96 mb-4">
            <label
              htmlFor="password"
              className="flex items-center text-black mb-2"
            >
              <FaLock className="mr-2" /> Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={formData.personal.password}
              onChange={(e) => updatePersonalData("password", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#FFB606]"
            />
          </div>

          <div className="mt-4 flex justify-center w-full">
            <button
              onClick={handleSubmit}
              className="py-2 px-4 bg-[#FFB606] w-full text-white rounded-lg transition"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsStep;
