// Import model and Schema from mongoose, which are essential for defining the Item model and its document schema.
import { model, Schema } from 'mongoose';

// ItemSchema defines the structure for documents in the items collection, specifying data types and relationships.
const ItemSchema = new Schema({
    // The item's name is a simple string that is required for each document.
    name: {
        type: String,
        required: true,
        trim: true
    },
    // Each item has a unique identifier (id) that is required and must be unique across all item documents.
    id: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    // The amount field tracks the quantity of the item, requiring a numeric value.
    amount: {
        type: Number,
        required: true
    },
    // Location references the Location model, establishing a relational link to a specific location document.
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    },
    // Category references the Category model, creating a relationship with a particular category document.
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
}, {
    // Enable the automatic generation of createdAt and updatedAt fields to record when item documents are created or updated.
    timestamps: true,
});

// The Item model is constructed from the ItemSchema, facilitating interactions with the items collection in the database.
const Item = model('Item', ItemSchema);

// Export the Item model so it can be imported and utilized in other parts of the application.
export default Item;
