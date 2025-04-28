import Appointment from "../models/appointment.js"; // Import the Appointment model

// Add new appointment
export const addAppointment = async (req, res) => {
    try {
        const { clientName, appointmentDate, propertyAddress, propertyType, contactEmail, phoneNumber, message, status } = req.body;

        // Ensure the appointmentDate is properly formatted
        const formattedDate = appointmentDate ? new Date(appointmentDate) : undefined;

        const appointment = await Appointment.create({
            clientName,
            appointmentDate: formattedDate,  // Ensure date is a valid Date object
            propertyAddress,
            propertyType,
            contactEmail,
            phoneNumber,
            message,
            status: status || 'Pending'  // Default to 'Pending' if status is not provided
        });

        if (appointment) {
            return res.status(201).json({ message: "Appointment Added Successfully", data: appointment });
        } else {
            return res.status(400).json({ message: "Error when adding appointment" });
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Error during adding appointment" });
    }
};

// Get all appointments
export const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find(); // Retrieve all appointments from the database
        if (appointments) {
            return res.status(200).json({ message: "Found Appointments", data: appointments });
        } else {
            return res.status(400).json({ message: "Error when getting appointments" });
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Error during getting appointments" });
    }
};

// Get a specific appointment by ID
export const getAppointment = async (req, res) => {
    const appointmentId = req.params.id; // Extract the appointment ID from request parameters
    try {
        const appointment = await Appointment.findById({ _id: appointmentId });
        if (appointment) {
            return res.status(200).json({ message: "Found Appointment", data: appointment });
        } else {
            return res.status(400).json({ message: "Error when getting appointment" });
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Error during getting appointment" });
    }
};

// Delete an appointment
export const deleteAppointment = async (req, res) => {
    const appointmentId = req.params.id; // Extract the appointment ID from request parameters
    try {
        const appointment = await Appointment.findByIdAndDelete({ _id: appointmentId });
        if (appointment) {
            return res.status(200).json({ message: "Appointment Deleted Successfully" });
        } else {
            return res.status(400).json({ message: "Error when deleting appointment" });
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Error during deleting appointment" });
    }
};

// Update an appointment
export const updateAppointment = async (req, res) => {
    const appointmentId = req.params.id; // Extract the appointment ID from request parameters
    try {
        const appointment = await Appointment.findByIdAndUpdate({ _id: appointmentId }, req.body, { new: true });
        if (appointment) {
            return res.status(200).json({ message: "Appointment Updated Successfully", data: appointment });
        } else {
            return res.status(400).json({ message: "Error when updating appointment" });
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Error during updating appointment" });
    }
};

// Schedule appointment based on property availability
export const schedulePropertyAppointment = async (req, res) => {
    try {
        const { clientName, appointmentDate, propertyAddress, propertyType, contactEmail, phoneNumber, message, status } = req.body;

        if (!appointmentDate || !propertyAddress) {
            return res.status(400).json({ message: "Appointment date and property address are required" });
        }

        // Convert to Date object for comparison
        const requestedDate = new Date(appointmentDate);
        
        // Check for existing appointments at the same property and same time
        const existingAppointments = await Appointment.find({
            propertyAddress: propertyAddress,
            appointmentDate: {
                // Check for appointments within the same day (can be refined to check specific time slots if needed)
                $gte: new Date(requestedDate.setHours(0, 0, 0, 0)),
                $lt: new Date(requestedDate.setHours(23, 59, 59, 999))
            }
        });

        // If appointments already exist for this property on the requested date
        if (existingAppointments.length > 0) {
            return res.status(409).json({ 
                message: "Property is not available at the requested time",
                conflictingAppointments: existingAppointments
            });
        }

        // Property is available, create the appointment
        const appointment = await Appointment.create({
            clientName,
            appointmentDate: requestedDate,
            propertyAddress,
            propertyType,
            contactEmail,
            phoneNumber,
            message,
            status: status || 'Confirmed'  // Set as confirmed since we checked availability
        });

        if (appointment) {
            return res.status(201).json({ 
                message: "Appointment scheduled successfully", 
                data: appointment 
            });
        } else {
            return res.status(400).json({ message: "Error when scheduling appointment" });
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Error during appointment scheduling", error: error.message });
    }
};


export const confirmAppointment = async (req, res) => {
    const appointmentId = req.params.id;
    try {
        const appointment = await Appointment.findByIdAndUpdate(
            { _id: appointmentId },
            { status: 'Confirmed' },
            { new: true }
        );
        
        if (appointment) {
            return res.status(200).json({ 
                message: "Appointment Confirmed Successfully", 
                data: appointment 
            });
        } else {
            return res.status(404).json({ message: "Appointment not found" });
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Error during confirming appointment" });
    }
};
