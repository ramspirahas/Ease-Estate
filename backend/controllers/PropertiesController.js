import express from 'express';
import Property from '../models/property.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Multer setup for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Save the file with a unique name
    }
});

const upload = multer({ storage });

// Add a new property
router.post('/addproperty', upload.single('propertyPhotos'), async (req, res) => {
    try {
        const { propertyName, sellerName, contactNumber, priceNegotiable, description, availableTime, eventDate } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: 'Image upload failed' });
        }

        const ImgPath = `/uploads/${req.file.filename}`;

        const property = new Property({
            propertyName,
            sellerName,
            contactNumber,
            priceNegotiable,
            description,
            availableTime,
            eventDate,
            propertyPhotos: ImgPath
        });

        await property.save(); // Save the new property to the database

        console.log("New Property Added:", property);
        res.status(201).json({ message: 'Property added successfully', data: property });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// GET route to retrieve all properties
router.get("/getproperties", async (req, res) => {
    try {
        const properties = await Property.find({});
        res.json({ message: "Found Properties", data: properties });
    } catch (err) {
        res.status(500).json({ message: "Error fetching properties", error: err });
    }
});

// GET route to retrieve a property by id
router.get("/getproperty/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const property = await Property.findById(id);
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }
        res.json({ message: "Found Property", data: property });
    } catch (err) {
        res.status(500).json({ message: "Error fetching property", error: err });
    }
});

// DELETE route to remove a property by id
router.delete("/deleteproperty/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const property = await Property.findByIdAndDelete(id);
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }
        res.json({ message: "Property deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting property", error: err });
    }
});

// PUT route to update a property by id
router.put('/updateproperty/:id', upload.single('propertyPhotos'), async (req, res) => {
    const id = req.params.id;
    const { propertyName, sellerName, contactNumber, priceNegotiable, description, availableTime, eventDate } = req.body;
    
    try {
        // Create an update object
        const updateData = {
            propertyName,
            sellerName,
            contactNumber,
            priceNegotiable,
            description,
            availableTime,
            eventDate
        };
        
        // Only update photo if a new one is provided
        if (req.file) {
            updateData.propertyPhotos = `/uploads/${req.file.filename}`;
        }

        const updatedProperty = await Property.findByIdAndUpdate(
            id, 
            updateData,
            { new: true }
        );
        
        if (!updatedProperty) {
            return res.status(404).json({ message: "Property not found" });
        }
        
        res.json({ message: "Property updated successfully", data: updatedProperty });
    } catch (err) {
        res.status(500).json({ message: "Error updating property", error: err });
    }
});

export default router;
