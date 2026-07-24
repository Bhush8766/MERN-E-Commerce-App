import {
  FaShippingFast,
  FaUndoAlt,
  FaHeadset,
  FaLock,
} from "react-icons/fa";

const features = [
  {
    icon: <FaShippingFast size={34} />,
    title: "Free Shipping",
    description: "Free delivery on orders above ₹999.",
  },
  {
    icon: <FaLock size={34} />,
    title: "Secure Payment",
    description: "100% secure online payment gateway.",
  },
  {
    icon: <FaUndoAlt size={34} />,
    title: "Easy Returns",
    description: "30-day hassle-free return policy.",
  },
  {
    icon: <FaHeadset size={34} />,
    title: "24/7 Support",
    description: "Our experts are always ready to help.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">

          <p className="text-blue-600 font-semibold uppercase tracking-widest">
            Why Shop With Us
          </p>

          <h2 className="text-4xl font-bold mt-3">
            Premium Shopping Experience
          </h2>

          <p className="text-gray-500 mt-5 max-w-2xl mx-auto">
            We provide everything you need for a safe,
            fast and enjoyable online shopping experience.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {features.map((item, index) => (
            <div
              key={index}
              className="group bg-gray-50 rounded-3xl p-8 shadow-sm hover:shadow-2xl transition duration-300 hover:-translate-y-3"
            >

              <div className="w-20 h-20 rounded-2xl bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition">
                {item.icon}
              </div>

              <h3 className="text-2xl font-bold mt-8">
                {item.title}
              </h3>

              <p className="text-gray-500 mt-4 leading-7">
                {item.description}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;
