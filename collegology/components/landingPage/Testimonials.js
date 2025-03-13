// Testimonials.js
import Image from "next/image"; // or use <img> if not using Next.js Image component

const testimonials = [
  {
    name: "Rahul Mehta",
    city: "Mumbai",
    degree: "IIT Bombay",
    testimonial:
      "Collegology.com made my college admission process effortless! I got expert guidance for JEE and secured a seat in IIT Bombay.",
    image: "/images/outstanding-img-1-1.webp",
  },
  {
    name: "Simran Kaur",
    city: "Delhi",
    degree: "Delhi University",
    testimonial:
      "With their amazing counseling and scholarship assistance, I got admission into Delhi University without any stress.",
    image: "/images/outstanding-img-2-1.webp",
  },
  {
    name: "Ananya Sharma",
    city: "Bangalore",
    degree: "Career Counseling",
    testimonial:
      "I was confused about my career path, but Collegology’s career counseling helped me choose the right course. Highly recommended!",
    image: "/images/outstanding-img-3-1.webp",
  },
];

const Testimonials = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold pb-16 text-black text-center mb-2 hover:text-yellow-500">
          📢 What Our Students Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center transform transition-all duration-500 hover:scale-105"
            >
              {/* Circular Image with Hover and Zoom Effect */}
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 transition-shadow duration-300 ease-in-out hover:shadow-xl">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={128}
                  height={128}
                  className="object-cover transition-transform duration-300 ease-in-out hover:scale-110 "
                />
              </div>

              {/* Name and Degree */}
              <h3 className="font-bold text-gray-600 text-lg transition-transform duration-300 ease-in-out hover:scale-110 hover:text-yellow-500">
                {testimonial.name}
              </h3>
              <p className="text-gray-600 text-sm mb-3 transition-transform duration-300 ease-in-out hover:scale-110 hover:text-yellow-500">
                {testimonial.degree}
              </p>

              {/* Testimonial */}
              <p className="text-gray-500 italic max-w-sm transition-transform duration-300 ease-in-out hover:scale-110">
                {`"${testimonial.testimonial}"`}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
