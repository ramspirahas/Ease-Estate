import express from "express"; 
import {
    addAppointment,
    getAppointment,
    getAllAppointments,
    deleteAppointment,
    updateAppointment,
    schedulePropertyAppointment,
    confirmAppointment
} from "../controllers/appointmentController.js";

const appointmentRouter = express.Router(); 

// Define the routes for handling appointments
appointmentRouter.get("/appointments", getAllAppointments); // Get all appointments
appointmentRouter.get("/appointment/:id", getAppointment); // Get a specific appointment by ID
appointmentRouter.post("/addappointment", addAppointment); // Add a new appointment
appointmentRouter.delete("/delete/:id", deleteAppointment); // Delete an appointment by ID
appointmentRouter.put("/appointment/:id", updateAppointment); // Update an appointment by ID
appointmentRouter.post("/schedule-property-appointment", schedulePropertyAppointment); // New endpoint for scheduling based on property availability
appointmentRouter.put("/confirm/:id", confirmAppointment); // Confirm an appointment

export default appointmentRouter;
