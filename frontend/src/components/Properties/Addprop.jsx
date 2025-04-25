import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Addprop = () => {
    const [prop, setProp] = useState({
        propertyName: "",
        sellerName: "",
        contactNumber: "",
        priceNegotiable: "",
        description: "",
        availableTime: new Date(),
        propertyPhotos: null,
        eventDate: new Date(),
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProp({ ...prop, [name]: value });
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setProp({ ...prop, propertyPhotos: e.target.files[0] });
        }
    };

    const handleDateChange = (date) => {
        setProp({ ...prop, eventDate: date });
    };

    const handleTimeChange = (time) => {
        setProp({ ...prop, availableTime: time });
    };

    const validateForm = () => {
        if (!prop.sellerName.trim()) {
            setError("Seller name is required");
            return false;
        }
        if (!prop.contactNumber.trim()) {
            setError("Contact number is required");
            return false;
        }
        if (!/^\d{10,15}$/.test(prop.contactNumber)) {
            setError("Please enter a valid contact number");
            return false;
        }
        if (!prop.priceNegotiable) {
            setError("Please specify if price is negotiable");
            return false;
        }
        if (!prop.description.trim()) {
            setError("Description is required");
            return false;
        }
        if (!prop.propertyPhotos) {
            setError("Property photo is required");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        const formDataToSend = new FormData();
        
        // Append all form data
        formDataToSend.append("propertyName", prop.propertyName);
        formDataToSend.append("sellerName", prop.sellerName);
        formDataToSend.append("contactNumber", prop.contactNumber);
        formDataToSend.append("priceNegotiable", prop.priceNegotiable);
        formDataToSend.append("description", prop.description);
        formDataToSend.append("availableTime", prop.availableTime.toISOString());
        formDataToSend.append("eventDate", prop.eventDate.toISOString());
        formDataToSend.append("propertyPhotos", prop.propertyPhotos);

        try {
            const response = await fetch("http://localhost:5001/PropertiesController/addproperty", {
                method: "POST",
                body: formDataToSend,
                // Don't set Content-Type header when sending FormData
                // The browser will set it automatically with the correct boundary
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || "Failed to add property");
            }
            
            setSuccess("Property added successfully!");
            // Reset form
            setProp({
                propertyName: "",
                sellerName: "",
                contactNumber: "",
                priceNegotiable: "",
                description: "",
                availableTime: new Date(),
                propertyPhotos: null,
                eventDate: new Date(),
            });
        } catch (error) {
            console.error("Error adding property:", error);
            setError(error.message || "An error occurred while adding the property");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md w-full">
                <h2 className="text-2xl font-bold mb-4 text-center">Add Property</h2>
                
                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                        {error}
                    </div>
                )}
                
                {success && (
                    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                        {success}
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Property Name */}
                    <input
                        type="text"
                        name="propertyName"
                        placeholder="Property Name"
                        value={prop.propertyName}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />

                    {/* Row 1: Seller Name & Contact Number */}
                    <div className="flex gap-4">
                        <input
                            type="text"
                            name="sellerName"
                            placeholder="Seller Name"
                            value={prop.sellerName}
                            onChange={handleChange}
                            className="flex-1 p-2 border border-gray-300 rounded"
                            required
                        />
                        <input
                            type="text"
                            name="contactNumber"
                            placeholder="Contact Number"
                            value={prop.contactNumber}
                            onChange={handleChange}
                            className="flex-1 p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    {/* Row 2: Event Date & Available Time */}
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block mb-1">Event Date</label>
                            <DatePicker
                                selected={prop.eventDate}
                                onChange={handleDateChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                dateFormat="MMMM d, yyyy"
                                minDate={new Date()}
                                required
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block mb-1">Available Time</label>
                            <DatePicker
                                selected={prop.availableTime}
                                onChange={handleTimeChange}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                    </div>

                    {/* Row 3: Price Negotiable */}
                    <div className="flex gap-4">
                        <div className="w-full">
                            <label className="block mb-1">Is Price Negotiable?</label>
                            <div className="flex gap-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="priceNegotiable"
                                        value="yes"
                                        checked={prop.priceNegotiable === "yes"}
                                        onChange={handleChange}
                                        className="mr-2"
                                        required
                                    />
                                    Yes
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="priceNegotiable"
                                        value="no"
                                        checked={prop.priceNegotiable === "no"}
                                        onChange={handleChange}
                                        className="mr-2"
                                        required
                                    />
                                    No
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Row 4: Description (Full Width) */}
                    <div>
                        <label className="block mb-1">Description</label>
                        <textarea
                            name="description"
                            placeholder="Property Description"
                            value={prop.description}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            rows="4"
                            required
                        ></textarea>
                    </div>

                    {/* Row 5: Upload Image */}
                    <div>
                        <label className="block mb-1">Property Photo</label>
                        <input
                            type="file"
                            name="propertyPhotos"
                            onChange={handleFileChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            accept="image/*"
                            required
                        />
                        {prop.propertyPhotos && (
                            <p className="mt-1 text-sm text-gray-600">
                                Selected: {prop.propertyPhotos.name}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors disabled:bg-gray-400"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Adding..." : "Add Property"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Addprop;