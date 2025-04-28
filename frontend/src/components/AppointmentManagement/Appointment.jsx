import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHome, faCalendarAlt, faClock, faBuilding, faTag, faEdit, faTimes, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import 'react-calendar/dist/Calendar.css';

function Appointments() {
    const [apiData, setApiData] = useState([]);
    const [isFetched, setIsFetched] = useState(false);
    const [editingAppointment, setEditingAppointment] = useState(null);
    const [updatedData, setUpdatedData] = useState({ clientName: '', propertyAddress: '', appointmentDate: '' });
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/appointment/appointments');
                if (response.status === 200) {
                    setApiData(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching appointments:", error.message);
            }
            setIsFetched(true);
        };
        fetchAppointments();
    }, []);

    const handleDelete = async (appointmentId) => {
        try {
            if (window.confirm("Are you sure you want to cancel this appointment?")) {
                const response = await axios.delete(`http://localhost:5001/api/appointment/delete/${appointmentId}`);
                if (response.status === 200) {
                    setApiData(apiData.filter(appointment => appointment._id !== appointmentId));
                }
            }
        } catch (error) {
            console.error("Error deleting appointment:", error.message);
            alert('An error occurred while deleting the appointment.');
        }
    };

    const handleUpdateStatus = async (appointmentId, newStatus) => {
        try {
            const response = await axios.put(
                `http://localhost:5001/api/appointment/appointment/${appointmentId}`,
                { status: newStatus }
            );
            if (response.status === 200) {
                setApiData(apiData.map(appointment => 
                    appointment._id === appointmentId 
                        ? { ...appointment, status: newStatus } 
                        : appointment
                ));
            }
        } catch (error) {
            console.error("Error updating appointment:", error.message);
            alert('An error occurred while updating the appointment.');
        }
    };

    const handleEdit = (appointment) => {
        setEditingAppointment(appointment._id);
        setUpdatedData({
            clientName: appointment.clientName,
            propertyAddress: appointment.propertyAddress,
            appointmentDate: new Date(appointment.appointmentDate).toISOString().slice(0, 16),
        });
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.put(
                `http://localhost:5001/api/appointment/appointment/${editingAppointment}`,
                updatedData
            );
            if (response.status === 200) {
                setApiData(apiData.map(appointment => 
                    appointment._id === editingAppointment
                        ? { ...appointment, ...updatedData }
                        : appointment
                ));
                setEditingAppointment(null);
            }
        } catch (error) {
            console.error("Error updating appointment:", error.message);
            alert('An error occurred while updating the appointment.');
        }
    };

    // Filter appointments based on status
    const filteredAppointments = statusFilter === 'all' 
        ? apiData 
        : apiData.filter(appointment => appointment.status === statusFilter);

    // Get status badge color
    const getStatusBadgeClass = (status) => {
        switch(status) {
            case 'Pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Confirmed':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'Cancelled':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'Completed':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Virtual':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'Visit':
                return 'bg-indigo-100 text-indigo-800 border-indigo-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="appointments-container">
            {/* Filter Controls */}
            <div className="m-6 flex flex-wrap gap-3">
                <button 
                    onClick={() => setStatusFilter('all')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                        statusFilter === 'all' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border'
                    }`}
                >
                    All
                </button>
                <button 
                    onClick={() => setStatusFilter('Pending')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                        statusFilter === 'Pending' ? 'bg-yellow-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border'
                    }`}
                >
                    Pending
                </button>
                <button 
                    onClick={() => setStatusFilter('Confirmed')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                        statusFilter === 'Confirmed' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border'
                    }`}
                >
                    Confirmed
                </button>
                <button 
                    onClick={() => setStatusFilter('Virtual')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                        statusFilter === 'Virtual' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border'
                    }`}
                >
                    Virtual
                </button>
                <button 
                    onClick={() => setStatusFilter('Visit')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                        statusFilter === 'Visit' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border'
                    }`}
                >
                    Visit
                </button>
            </div>

            {/* Appointments List */}
            <div className="space-y-4 p-4">
                {isFetched ? (
                    filteredAppointments.length > 0 ? (
                        filteredAppointments.map((appointment) => (
                            <div key={appointment._id} 
                                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition hover:shadow-lg">
                                {editingAppointment === appointment._id ? (
                                    <div className="p-5">
                                        <h3 className="text-lg font-semibold mb-4">Edit Appointment</h3>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                                                <input
                                                    type="text"
                                                    value={updatedData.clientName}
                                                    onChange={(e) => setUpdatedData({ ...updatedData, clientName: e.target.value })}
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                                    placeholder="Client Name"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Property Address</label>
                                                <input
                                                    type="text"
                                                    value={updatedData.propertyAddress}
                                                    onChange={(e) => setUpdatedData({ ...updatedData, propertyAddress: e.target.value })}
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                                    placeholder="Property Address"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Date & Time</label>
                                                <input
                                                    type="datetime-local"
                                                    value={updatedData.appointmentDate}
                                                    onChange={(e) => setUpdatedData({ ...updatedData, appointmentDate: e.target.value })}
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                                />
                                            </div>
                                            <div className="flex justify-end space-x-2 pt-2">
                                                <button 
                                                    onClick={() => setEditingAppointment(null)} 
                                                    className="flex items-center gap-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                                                >
                                                    <FontAwesomeIcon icon={faTimes} />
                                                    Cancel
                                                </button>
                                                <button 
                                                    onClick={handleUpdate} 
                                                    className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                                                >
                                                    <FontAwesomeIcon icon={faSave} />
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="px-6 py-4">
                                            {/* Status Badge */}
                                            <div className="flex justify-between items-start mb-3">
                                                <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full border ${getStatusBadgeClass(appointment.status)}`}>
                                                    {appointment.status}
                                                </span>
                                                <div className="flex gap-1">
                                                    <button 
                                                        onClick={() => handleEdit(appointment)} 
                                                        className="text-gray-500 hover:text-green-600 transition"
                                                        title="Edit"
                                                    >
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(appointment._id)} 
                                                        className="text-gray-500 hover:text-red-600 transition"
                                                        title="Cancel"
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-3">
                                                    <div className="flex items-start gap-3">
                                                        <FontAwesomeIcon icon={faUser} className="text-green-600 mt-1" />
                                                        <div>
                                                            <p className="text-xs text-gray-500">Client</p>
                                                            <p className="font-medium">{appointment.clientName}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-3">
                                                        <FontAwesomeIcon icon={faHome} className="text-green-600 mt-1" />
                                                        <div>
                                                            <p className="text-xs text-gray-500">Property</p>
                                                            <p className="font-medium">{appointment.propertyAddress}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space-y-3">
                                                    <div className="flex items-start gap-3">
                                                        <FontAwesomeIcon icon={faCalendarAlt} className="text-green-600 mt-1" />
                                                        <div>
                                                            <p className="text-xs text-gray-500">Date</p>
                                                            <p className="font-medium">{new Date(appointment.appointmentDate).toLocaleDateString()}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-3">
                                                        <FontAwesomeIcon icon={faClock} className="text-green-600 mt-1" />
                                                        <div>
                                                            <p className="text-xs text-gray-500">Time</p>
                                                            <p className="font-medium">{new Date(appointment.appointmentDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-4 mt-4">
                                                <div className="flex items-start gap-3 min-w-[120px]">
                                                    <FontAwesomeIcon icon={faBuilding} className="text-green-600 mt-1" />
                                                    <div>
                                                        <p className="text-xs text-gray-500">Property Type</p>
                                                        <p className="font-medium">{appointment.propertyType}</p>
                                                    </div>
                                                </div>
                                                {appointment.message && (
                                                    <div className="flex items-start gap-3">
                                                        <FontAwesomeIcon icon={faTag} className="text-green-600 mt-1" />
                                                        <div>
                                                            <p className="text-xs text-gray-500">Additional Info</p>
                                                            <p className="font-medium">{appointment.message}</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        {appointment.status !== 'Cancelled' && appointment.status !== 'Completed' && (
                                            <div className="bg-gray-50  px-6 py-3 flex flex-wrap gap-2">
                                                {appointment.status === 'Pending' && (
                                                    <button 
                                                        onClick={() => handleUpdateStatus(appointment._id, 'Confirmed')}
                                                        className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded hover:bg-green-200 transition"
                                                    >
                                                        Confirm
                                                    </button>
                                                )}
                                                
                                                {(appointment.status === 'Confirmed' || appointment.status === 'Pending') && (
                                                    <>
                                                        <button 
                                                            onClick={() => handleUpdateStatus(appointment._id, 'Virtual')}
                                                            className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded hover:bg-purple-200 transition"
                                                        >
                                                            Convert to Virtual
                                                        </button>
                                                        <button 
                                                            onClick={() => handleUpdateStatus(appointment._id, 'Visit')}
                                                            className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-medium rounded hover:bg-indigo-200 transition"
                                                        >
                                                            Convert to Visit
                                                        </button>
                                                        <button 
                                                            onClick={() => handleUpdateStatus(appointment._id, 'Completed')}
                                                            className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded hover:bg-blue-200 transition"
                                                        >
                                                            Mark Completed
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="bg-white p-8 rounded-lg shadow text-center">
                            <div className="text-gray-500 mb-2 text-6xl">
                                <FontAwesomeIcon icon={faCalendarAlt} />
                            </div>
                            <h3 className="text-xl font-medium text-gray-700 mb-1">No appointments found</h3>
                            <p className="text-gray-500">
                                {statusFilter === 'all' 
                                    ? "You don't have any appointments scheduled yet." 
                                    : `You don't have any ${statusFilter.toLowerCase()} appointments.`}
                            </p>
                        </div>
                    )
                ) : (
                    <div className="bg-white p-8 rounded-lg shadow flex justify-center items-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500"></div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Appointments;
