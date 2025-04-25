import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PropertyList = () => {
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

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/PropertiesController/deleteproperty/${id}`);
            setSale(Sale.filter((shop) => shop._id !== id)); // Fix: Use _id instead of id
        } catch (error) {
            console.error("Error deleting property:", error);
        }
    };

    return (
        <div className="flex justify-center py-8">
            <div className="slot-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl w-full">
                {Sale.length > 0 ? (
                    Sale.map((shop) => (
                        <div className="slot bg-white shadow-lg rounded-lg p-6" key={shop._id}>
                            <div className="flex justify-center mb-4">
                                <img
                                    src={`http://localhost:5001${shop.propertyPhotos}`}
                                    alt="Property"
                                    className="w-full h-64 object-cover rounded-lg"
                                />
                            </div>
                            <div className="flex flex-col gap-4 mb-4">
                                <p className="font-bold">Name: {shop.sellerName}</p>
                                <p className="font-bold">Contact: {shop.contactNumber}</p>
                                <p className="font-bold">Description: {shop.description.slice(0, 20)}...</p>
                            </div>

                            <div className="flex justify-between items-center">
                                <Link to={`/update/${shop._id}`} className="bg-blue-500 text-white py-2 px-4 rounded-lg">Edit</Link>
                                <button onClick={() => handleDelete(shop._id)} className="bg-red-500 text-white py-2 px-4 rounded-lg">Delete</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No properties available.</p>
                )}
            </div>
        </div>
    );
};

export default PropertyList;
