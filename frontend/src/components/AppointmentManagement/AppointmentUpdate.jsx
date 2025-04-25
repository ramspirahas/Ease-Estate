import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AppointmentUpdate() {
  const [appointments, setAppointments] = useState([]);
  const [editAppointment, setEditAppointment] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/appointment/appointments");
      if (response.data && Array.isArray(response.data.data)) {
        setAppointments(response.data.data);
      } else {
        console.error("Received data is not an array:", response.data);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/appointment/delete/${id}`);
      fetchAppointments();
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const handleEdit = (appointment) => {
    setEditAppointment({ 
      _id: appointment._id, // Using _id which is standard for MongoDB
      clientName: appointment.clientName,
      appointmentDate: appointment.appointmentDate ? appointment.appointmentDate.split('T')[0] : '',
      propertyAddress: appointment.propertyAddress,
      propertyType: appointment.propertyType,
      contactEmail: appointment.contactEmail,
      phoneNumber: appointment.phoneNumber
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.put(
        `http://localhost:5001/api/appointment/appointment/${editAppointment._id}`,
        editAppointment
      );
      alert("Appointment Updated Successfully!");
      setEditAppointment(null);
      fetchAppointments();
    } catch (error) {
      console.error("Error updating appointment:", error);
      setErrors({ 
        form: error.response?.data?.message || 
             "An error occurred while updating your appointment. Please try again." 
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditAppointment(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };


  const validateForm = () => {
    let newErrors = {};
    if (!editAppointment.clientName?.trim()) newErrors.clientName = "Client name is required";
    if (!editAppointment.appointmentDate?.trim()) newErrors.appointmentDate = "Appointment date is required";
    if (!editAppointment.propertyAddress?.trim()) newErrors.propertyAddress = "Property address is required";
    if (!editAppointment.propertyType?.trim()) newErrors.propertyType = "Property type is required";
    if (!editAppointment.contactEmail?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editAppointment.contactEmail)) {
      newErrors.contactEmail = "Valid email is required";
    }
    if (!editAppointment.phoneNumber?.trim() || !/^\d{10}$/.test(editAppointment.phoneNumber)) {
      newErrors.phoneNumber = "Valid 10-digit phone number is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-8">Appointments List</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">Client Name</th>
              <th className="py-2 px-4 border">Appointment Date</th>
              <th className="py-2 px-4 border">Property Address</th>
              <th className="py-2 px-4 border">Property Type</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Phone</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td className="py-2 px-4 border">{appointment.clientName}</td>
                <td className="py-2 px-4 border">
                  {new Date(appointment.appointmentDate).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border">{appointment.propertyAddress}</td>
                <td className="py-2 px-4 border">{appointment.propertyType}</td>
                <td className="py-2 px-4 border">{appointment.contactEmail}</td>
                <td className="py-2 px-4 border">{appointment.phoneNumber}</td>
                <td className="py-2 px-4 border space-y-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded mr-2"
                    onClick={() => handleEdit(appointment)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                    onClick={() => handleDelete(appointment._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editAppointment && (
        <div className="mt-10 bg-gray-50 p-6 rounded-lg shadow-md max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Update Appointment</h2>
          {errors.form && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {errors.form}
            </div>
          )}
          
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Client Name</label>
              <input
                type="text"
                name="clientName"
                value={editAppointment.clientName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              />
              {errors.clientName && <p className="mt-1 text-sm text-red-600">{errors.clientName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Appointment Date</label>
              <input
                type="date"
                name="appointmentDate"
                value={editAppointment.appointmentDate}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              />
              {errors.appointmentDate && <p className="mt-1 text-sm text-red-600">{errors.appointmentDate}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Property Address</label>
              <input
                type="text"
                name="propertyAddress"
                value={editAppointment.propertyAddress}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              />
              {errors.propertyAddress && <p className="mt-1 text-sm text-red-600">{errors.propertyAddress}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Property Type</label>
              <select
                name="propertyType"
                value={editAppointment.propertyType}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              >
                <option value="">Select property type</option>
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Condo">Condo</option>
                <option value="Townhouse">Townhouse</option>
                <option value="Land">Land</option>
              </select>
              {errors.propertyType && <p className="mt-1 text-sm text-red-600">{errors.propertyType}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="contactEmail"
                value={editAppointment.contactEmail}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              />
              {errors.contactEmail && <p className="mt-1 text-sm text-red-600">{errors.contactEmail}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={editAppointment.phoneNumber}
                onChange={handleChange}
                placeholder="1234567890"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              />
              {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => setEditAppointment(null)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Update Appointment
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AppointmentUpdate;