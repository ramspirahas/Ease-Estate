import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function AddAppointment({ show, onHide, propertyData }) {
  const [formData, setFormData] = useState({
    clientName: "",
    appointmentDate: "",
    propertyAddress: "",
    propertyType: "",
    contactEmail: "",
    phoneNumber: "",
    message: "",
    status: "Pending",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Populate form data when propertyData changes
  useEffect(() => {
    if (propertyData) {
      // Format the date to YYYY-MM-DD for the date input
      const formattedDate = propertyData.start ? new Date(propertyData.start).toISOString().split('T')[0] : '';
      
      setFormData(prev => ({
        ...prev,
        propertyAddress: propertyData.title || "",
        appointmentDate: formattedDate,
        // Set property type if available, or default to first option
        propertyType: propertyData.propertyType || "House",
      }));
    }
  }, [propertyData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.clientName.trim()) newErrors.clientName = "Client name is required";
    if (!formData.appointmentDate.trim()) newErrors.appointmentDate = "Appointment date is required";
    if (!formData.propertyAddress.trim()) newErrors.propertyAddress = "Property address is required";
    if (!formData.propertyType.trim()) newErrors.propertyType = "Property type is required";
    if (!formData.contactEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = "Valid email is required";
    }
    if (!formData.phoneNumber.trim() || !/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Valid 10-digit phone number is required";
    }
    if (formData.message.length > 500) newErrors.message = "Message cannot exceed 500 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      // Using the new endpoint to schedule appointments based on property availability
      const response = await axios.post("http://localhost:5001/api/appointment/schedule-property-appointment", formData);
      
      alert("Appointment Booked Successfully!");
      setLoading(false);
      onHide(); // Close the modal on success
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 409) {
        // Property is not available at the requested time
        setErrors({ 
          form: "This property is not available at the requested time. Please select another date." 
        });
      } else {
        console.error("Error creating appointment:", error);
        setErrors({ 
          form: "An error occurred while booking your appointment. Please try again." 
        });
      }
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton className="bg-green-700 text-white">
        <Modal.Title>Book an Appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 w-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="font-medium text-gray-600">Client Name</label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  className={`border rounded-md p-2 focus:outline-none focus:ring-2 ${errors.clientName ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"}`}
                />
                {errors.clientName && <p className="text-red-500 text-sm">{errors.clientName}</p>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-gray-600">Appointment Date</label>
                <input
                  type="date"
                  name="appointmentDate"
                  value={formData.appointmentDate}
                  onChange={handleChange}
                  disabled={true}
                  className={`border rounded-md p-2 bg-gray-100 focus:outline-none focus:ring-2 ${errors.appointmentDate ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"}`}
                />
                {errors.appointmentDate && <p className="text-red-500 text-sm">{errors.appointmentDate}</p>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-gray-600">Property Name</label>
                <input
                  type="text"
                  name="propertyAddress"
                  value={formData.propertyAddress}
                  onChange={handleChange}
                  disabled={true}
                  className={`border rounded-md p-2 bg-gray-100 focus:outline-none focus:ring-2 ${errors.propertyAddress ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"}`}
                />
                {errors.propertyAddress && <p className="text-red-500 text-sm">{errors.propertyAddress}</p>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-gray-600">Property Type</label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className={`border rounded-md p-2 focus:outline-none focus:ring-2 ${errors.propertyType ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"}`}
                >
                  <option value="">Select property type</option>
                  <option value="House">House</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Land">Land</option>
                </select>
                {errors.propertyType && <p className="text-red-500 text-sm">{errors.propertyType}</p>}
              </div>
            </div>

           
            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="font-medium text-gray-600">Email Address</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  className={`border rounded-md p-2 focus:outline-none focus:ring-2 ${errors.contactEmail ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"}`}
                />
                {errors.contactEmail && <p className="text-red-500 text-sm">{errors.contactEmail}</p>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-gray-600">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="1234567890"
                  className={`border rounded-md p-2 focus:outline-none focus:ring-2 ${errors.phoneNumber ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"}`}
                />
                {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-gray-600">Message (Optional)</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="3"
                  className={`border rounded-md p-2 focus:outline-none focus:ring-2 ${errors.message ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"}`}
                />
                {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-gray-600">Appointment Type</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="Virtual">Virtual</option>
                  <option value="Visit">Visit</option>
                </select>
              </div>
            </div>
          </div>

          {errors.form && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-500 text-sm text-center">{errors.form}</p>
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <Button
              type="submit"
              className="w-full md:w-1/2 h-12 bg-green-500 text-white text-lg font-semibold rounded-md hover:bg-green-700 transition"
              variant="success"
              disabled={loading}
            >
              {loading ? "Scheduling..." : "Book Appointment"}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default AddAppointment;