import express from 'express';
import LocationController from '../controllers/location.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';

// Initialize the router object from Express for managing location routes.
const locationRouter = express.Router();

// Route for creating a new location. Only accessible to authenticated users due to authMiddleware.
locationRouter.post('/locations', authMiddleware, LocationController.createLocation);

// Route to get all locations. Accessible to authenticated users.
locationRouter.get('/locations', authMiddleware, LocationController.getLocations);

// Route to get a specific location by its ID. Accessible to authenticated users.
locationRouter.get('/locations/:id', authMiddleware, LocationController.getLocationById);

// Route to update a location identified by its ID. Accessible to authenticated users.
locationRouter.put('/locations/:id', authMiddleware, LocationController.updateLocation);

// Route to delete a specific location by its ID. Accessible to authenticated users.
locationRouter.delete('/locations/:id', authMiddleware, LocationController.deleteLocation);

// Export the router so it can be mounted in the main application file.
export default locationRouter;
