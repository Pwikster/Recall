// Import model and Schema from mongoose to facilitate creation of the Category model and define its document structure.
import { model, Schema } from 'mongoose';

// Define the CategorySchema, outlining the expected structure for documents in the categories collection.
const CategorySchema = new Schema({
    // Each category is identified by a name, which must be unique, required, and whitespace-trimmed.
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
}, {
    // Automatically manage createdAt and updatedAt fields for each category document, tracking their creation and last update times.
    timestamps: true,
});

// Construct the Category model from its schema, enabling operations on and queries against the categories collection.
const Category = model('Category', CategorySchema);

// Make the Category model available for import and use in other parts of the application.
export default Category;
