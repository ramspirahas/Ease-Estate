import express from "express"; 
import cors from "cors"; 
import dotenv from "dotenv";
import mongoose from "mongoose"; 
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import userRouter from "./routes/userRoutes.js";
import appointmentRouter from "./routes/appointmentRoutes.js";
import goalRouter from "./routes/goalRoutes.js"; // Import the new goal router
import propertyRouter from "./routes/propertyRoutes.js"; // Import the property router

dotenv.config();

const app = express(); 

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use(cors()); 
app.use(express.json()); 

// MongoDB URI from environment variables
const uri = process.env.MONGODB_URI; 

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error.message);
    });

// Set port to either environment variable or fallback to 5001
const port = process.env.PORT || 5001; 

// Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

// Default route (Optional)
app.get("/", (req, res) => {
    res.send("Welcome to the API");
});

// Use routers for different resources
app.use("/api/users", userRouter); 
app.use("/api/appointment", appointmentRouter);
app.use("/", propertyRouter);  // Use property router
app.use("/api/goals", goalRouter);  // Add new route for goals
