import { model, Schema } from 'mongoose';

// Define the User schema with a bit more breathing room
const UserSchema = new Schema({
    // Each user must have a unique and required username
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },

    // Email must also be unique and required
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },

    // Password is essential for account security
    password: { 
        type: String, 
        required: true 
    },

}, { timestamps: true }); // Automatically manage createdAt and updatedAt timestamps

// Create and export the User model based on the defined schema
const User = model("User", UserSchema);
export default User;
