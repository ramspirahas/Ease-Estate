import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center p-6">
      <div className="max-w-5xl px-6 py-12 text-center">
        {/* Header Section */}
        <h1 className="text-4xl font-bold mb-4">About Our Real Estate Company</h1>
        <p className="text-lg text-black">
          We are a trusted real estate agency dedicated to helping you find your dream property with ease. Our team of experts is committed to providing exceptional service and helping you make informed decisions, whether you are buying, selling, or renting a property.
        </p>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white text-green-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">🏠 Wide Range of Properties</h3>
            <p className="text-gray-700 mt-2">
              Browse through a variety of residential and commercial properties to find the perfect match for your needs.
            </p>
          </div>
          <div className="bg-white text-green-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">🔑 Expert Guidance</h3>
            <p className="text-gray-700 mt-2">
              Our experienced agents provide personalized advice to guide you through every step of the buying or selling process.
            </p>
          </div>
          <div className="bg-white text-green-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">📊 Market Insights</h3>
            <p className="text-gray-700 mt-2">
              We provide in-depth market analysis and reports to help you make informed investment decisions.
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="mt-12 bg-green-700 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold">🏡 Our Mission</h2>
          <p className="mt-2 text-gray-200">
            To provide our clients with exceptional real estate services, making the process of buying, selling, and renting properties seamless, stress-free, and rewarding.
          </p>
        </div>

        <div className="mt-6 bg-green-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold">🌟 Our Vision</h2>
          <p className="mt-2 text-gray-200">
            To become the leading real estate agency, offering innovative solutions and creating lasting relationships with our clients.
          </p>
        </div>

        {/* Call to Action */}
        <div className="mt-12">
          <a
            href="/propertyManagement/list"
            className="bg-white text-green-800 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-100 transition"
          >
            Explore Our Properties
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
