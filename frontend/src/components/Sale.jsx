import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Sale = () => {
    const [Sale, setSale] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5001/PropertiesController/getproperties`)
            .then((response) => {
                setSale(response.data.data);
            })
            .catch((error) => {
                console.log(error);
                alert("Error fetching properties. Please ensure the server is running.");
            });
    }, []);

    return (
        <div className="flex flex-col items-center py-8 px-4">
            {/* Heading */}
            <h2 className="text-3xl font-bold mb-8 text-center">Upcoming Appointments</h2>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl">
                {Array.isArray(Sale) && Sale.length > 0 ? (
                    Sale.map((shop, index) => (
                        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center" key={index}>
                            {/* Property Image */}
                            <div className="w-full h-64 mb-4">
                                <img
                                    src={`http://localhost:5001${shop.propertyPhotos}`} // Ensure correct URL structure
                                    alt="Property"
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>

                            {/* Property Details */}
                            <div className="w-full flex flex-col gap-3 text-center">
                                <p className="font-bold text-lg">Name: <span className="font-normal">{shop.sellerName}</span></p>
                                <p className="font-bold text-lg">Contact: <span className="font-normal">{shop.contactNumber}</span></p>
                                <p className="font-bold text-lg">Description: 
                                    <span className="font-normal"> {shop.description.length > 20 ? shop.description.slice(0, 20) + '...' : shop.description}</span>
                                </p>
                            </div>

                            {/* Contact Seller Button */}
                           <Link to='/AddAppointment/add'> <button className="bg-blue-500 text-white py-2 px-6 mt-4 rounded-lg hover:bg-blue-600 transition duration-300">
                                Contact Seller
                            </button></Link>
                        </div>
                    ))
                ) : (
                    <p className="text-lg text-center">No properties available.</p>
                )}
            </div>
        </div>
    );
}

export default Sale;
