import mongoose from "mongoose"; 

const appointmentSchema = new mongoose.Schema({
    clientName: {
        type: String,
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    propertyAddress: {
        type: String,
        required: true
    },
    propertyType: {
        type: String,
        required: true, // e.g., 'House', 'Apartment', etc.
    },
    contactEmail: {
        type: String,
        required: true,
        match: /.+@.+\..+/ // Email validation regex
    },
    phoneNumber: {
        type: String,
        required: true
    },
    message: {
        type: String,
        default: "" // Optional field for client to add any additional info
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed', 'Virtual', 'Visit'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}); 

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
