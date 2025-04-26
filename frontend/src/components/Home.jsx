import React from 'react';
import { Link } from 'react-router-dom';
import ProjectList from './Properties/PropertyList';
import heroBg from '../assets/HERO.jpg'; 

const Home = () => {
    return (
        <div className="min-h-screen bg-white-50 flex flex-col items-center justify-center text-center p-6 relative w-full">
            {/* Hero Section */}
            <div className="relative h-screen w-full">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${heroBg})` }}
                ></div>

              

                {/* Content */}
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

            {/* Donation Section */}
<div className='mt-10 bg-white-100 shadow-md hover:shadow-lg max-w-2xl min-h-32 flex flex-col gap-6 rounded-xl items-center justify-center p-10'>
    <div className='flex flex-col items-center justify-center text-center'>
    <h1 className='text-3xl font-bold text-green-800' style={{ fontFamily: 'Poppins, sans-serif' }}>
    Support Our Mission
</h1>

        <p className=' text-3xl font-light mt-2 text-gray-700 text-base max-w-md' style={{ fontFamily: 'Poppins, sans-serif' }}>
            Your contribution helps us continue making a positive impact. Schedule an appointment to be a part of the change.
        </p>
        <Link to="/AddAppointment/add">
            <button className='bg-green-600 text-white px-8 py-3 rounded-full mt-6 text-lg font-medium shadow hover:bg-green-700 transition duration-300'>
                Book an Appointment
            </button>
        </Link>
    </div>
</div>


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
                {/* You can render the ProjectList component here if needed */}
                {/* <ProjectList /> */}
            </section>
        </div>
    );
};

export default Home;
