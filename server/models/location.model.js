// Import the necessary functions from mongoose to create models and define their schema.
import { model, Schema } from 'mongoose';

// Define the schema for a location, specifying the structure and data types of documents within the locations collection.
const LocationSchema = new Schema({
    // The name field is a unique identifier for each location, required and trimmed to avoid leading or trailing spaces.
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
}, {
    // Enable automatic creation of createdAt and updatedAt fields to track when documents are created or modified.
    timestamps: true,
});

// Create the Location model based on the schema, which allows us to interact with the locations collection in the database.
const Location = model('Location', LocationSchema);

// Export the Location model so it can be used elsewhere in the application.
export default Location;
