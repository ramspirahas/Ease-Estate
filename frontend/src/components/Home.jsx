import React from 'react';
import { Link } from 'react-router-dom';
import ProjectList from './Properties/PropertyList';
import heroBg from '../assets/HERO.jpg';
import About from './about';

const Home = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center p-6 relative w-full">
            {/* Hero Section */}
            <div className="relative h-screen w-full">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${heroBg})` }}
                ></div>

                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                    <h1 className="text-5xl font-bold text-white">Welcome to EASE REAL-ESTATE</h1>
                    <p className="mt-4 text-lg text-gray-100 max-w-3xl">
                        Your all-in-one Real Estate Management Solution. Streamline property management, track transactions, and collaborate effortlessly.
                    </p>
                    <div className="mt-6 space-x-4">
                        <Link
                            to="/Sale"
                            className="bg-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-700 transition"
                        >
                            Get Started
                        </Link>
                        <Link
                            to="/about"
                            className="bg-white text-green-600 border border-green-600 px-6 py-3 rounded-full shadow-lg hover:bg-green-100 transition"
                        >
                            Learn More
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="w-full max-w-6xl mx-auto mt-16 bg-white rounded-2xl shadow-md p-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <h2 className="text-5xl font-medium text-green-600">2500+</h2>
                        <p className="text-gray-600 mt-2">Properties Listed</p>
                    </div>
                    <div>
                        <h2 className="text-5xl font-medium text-green-600">1800+</h2>
                        <p className="text-gray-600 mt-2">Happy Clients</p>
                    </div>
                    <div>
                        <h2 className="text-5xl font-medium text-green-600">200+</h2>
                        <p className="text-gray-600 mt-2">Award Winning</p>
                    </div>
                    <div>
                        <h2 className="text-5xl font-medium text-green-600">50+</h2>
                        <p className="text-gray-600 mt-2">Expert Agents</p>
                    </div>
                </div>
            </div>

            {/* Donation Section */}
            <div className="mt-16 mb-16 bg-white shadow-md hover:shadow-lg max-w-2xl min-h-32 flex flex-col gap-6 rounded-xl items-center justify-center p-10">
                <div className="flex flex-col items-center justify-center text-center">
                    <h1 className="text-3xl font-bold text-green-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Support Our Mission
                    </h1>
                    <p className="mt-2 text-gray-700 text-base max-w-md" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Your contribution helps us continue making a positive impact. Schedule an appointment to be a part of the change.
                    </p>
                    <Link to="/AddAppointment/add">
                        <button className="bg-green-600 text-white px-8 py-3 rounded-full mt-6 text-lg font-medium shadow hover:bg-green-700 transition duration-300">
                            Book an Appointment
                        </button>
                    </Link>
                </div>
            </div>

            {/* Testimonials Section */}
<section className="bg-white py-16 w-full flex flex-col items-center px-6">
  <div className="max-w-6xl w-full mx-auto text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">What Our Clients Say</h2>
    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
      Don't just take our word for it. See what our satisfied clients have to say about their experience with us.
    </p>

    <div className="mt-12 grid gap-8 md:grid-cols-2">
      {/* Testimonial 1 */}
      <div className="bg-gray-100 p-8 rounded-2xl shadow-md text-left flex flex-col items-start">
        <div className="flex items-center mb-4">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Emily Robertson"
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div>
            <h4 className="text-lg font-semibold text-gray-800">Emily Robertson</h4>
            <p className="text-gray-500 text-sm">First-time Homebuyer</p>
          </div>
        </div>
        <div className="flex items-center mb-4">
          {Array(5).fill(0).map((_, index) => (
            <svg key={index} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.04 3.2a1 1 0 00.95.69h3.36c.969 0 1.371 1.24.588 1.81l-2.72 1.97a1 1 0 00-.364 1.118l1.04 3.2c.3.921-.755 1.688-1.54 1.118l-2.72-1.97a1 1 0 00-1.176 0l-2.72 1.97c-.784.57-1.838-.197-1.54-1.118l1.04-3.2a1 1 0 00-.364-1.118L2.098 8.627c-.783-.57-.38-1.81.588-1.81h3.36a1 1 0 00.95-.69l1.04-3.2z" />
            </svg>
          ))}
        </div>
        <p className="italic text-gray-600">
          As a first-time homebuyer, I was nervous about the process. The EASE team made everything simple and transparent. They found me the perfect home within my budget and handled all the paperwork efficiently.
        </p>
      </div>

      {/* Testimonial 2 */}
      <div className="bg-gray-100 p-8 rounded-2xl shadow-md text-left flex flex-col items-start">
        <div className="flex items-center mb-4">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Michael Thompson"
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div>
            <h4 className="text-lg font-semibold text-gray-800">Michael Thompson</h4>
            <p className="text-gray-500 text-sm">Property Investor</p>
          </div>
        </div>
        <div className="flex items-center mb-4">
          {Array(5).fill(0).map((_, index) => (
            <svg key={index} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.04 3.2a1 1 0 00.95.69h3.36c.969 0 1.371 1.24.588 1.81l-2.72 1.97a1 1 0 00-.364 1.118l1.04 3.2c.3.921-.755 1.688-1.54 1.118l-2.72-1.97a1 1 0 00-1.176 0l-2.72 1.97c-.784.57-1.838-.197-1.54-1.118l1.04-3.2a1 1 0 00-.364-1.118L2.098 8.627c-.783-.57-.38-1.81.588-1.81h3.36a1 1 0 00.95-.69l1.04-3.2z" />
            </svg>
          ))}
        </div>
        <p className="italic text-gray-600">
          I've worked with many real estate firms over the years, but EASE stands out for their market knowledge and investment expertise. They've helped me build a profitable portfolio of properties with minimal hassle.
        </p>
      </div>
    </div>
  </div>
</section>


            {/* CTA Section - Find Your Dream Home */}
           {/* CTA Section - Find Your Dream Home */}
<div className="bg-green-700 text-white py-16 flex flex-col items-center justify-center px-6 mt-16 rounded-lg shadow-md w-full">
    <div className="w-full max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Dream Home?
        </h2>
        <p className="text-lg max-w-2xl mx-auto mb-8">
            Let us help you navigate the real estate market with confidence. Our team of experts is ready to assist you with all your property needs.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
                to="/Sale"
                className="bg-white text-green-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
            >
                Browse Properties
            </Link>
            <Link
                to="/contact"
                className="border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-green-700 transition"
            >
                Contact Us
            </Link>
        </div>
    </div>
</div>


            {/* About Section */}
            <About />

            

            {/* Features Section */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-green-800">Project Planning</h2>
                    <p className="text-gray-600 mt-2">Plan and organize your projects efficiently.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-green-800">Task Tracking</h2>
                    <p className="text-gray-600 mt-2">Monitor tasks and milestones with ease.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-green-800">Team Collaboration</h2>
                    <p className="text-gray-600 mt-2">Enhance teamwork with streamlined communication.</p>
                </div>
            </div>

            {/* Project List Section */}
            <section className="max-w-6xl mx-auto py-12 px-6 w-full">
                <h2 className="text-3xl font-bold text-green-800 text-center">Explore Our Projects</h2>
                <p className="text-gray-600 text-center mt-2">Discover our latest eco-friendly projects.</p>
                {/* <ProjectList /> */}
            </section>
        </div>
    );
};

export default Home;
