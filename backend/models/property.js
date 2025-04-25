import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
    propertyName: {
        type: String,
        required: true
    },
    sellerName: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    priceNegotiable: {
        type: Boolean,
        default: false
    },
    propertyPhotos:{ 
        type: String, 
        required: false, 
    }, 
    description: {
        type: String,
        required: true
    },
    availableTime: {
        type: String, 
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    }
});

const Property = mongoose.model("Property", propertySchema);

export default Property;
