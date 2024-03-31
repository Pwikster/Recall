import express from 'express';
import ItemController from '../controllers/item.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';

// Initialize the router object from Express for managing item routes.
const itemRouter = express.Router();

// Route for creating a new item in the inventory. Requires user authentication.
itemRouter.post('/items', authMiddleware, ItemController.createItem);

// Route to get all items from the inventory. Only accessible to authenticated users.
itemRouter.get('/items', authMiddleware, ItemController.getItems);

// Route to get a specific item by its ID. Item ID is expected in the path. Requires authentication.
itemRouter.get('/items/:id', authMiddleware, ItemController.getItemById);

// Route to update an item identified by its ID. The updated data is expected in the request body. Requires authentication.
itemRouter.put('/items/:id', authMiddleware, ItemController.updateItem);

// Route to delete a specific item by its ID. Requires authentication.
itemRouter.delete('/items/:id', authMiddleware, ItemController.deleteItem);

// Route to get items filtered by location and/or category. Accessible to authenticated users.
itemRouter.get('/items/filter', authMiddleware, ItemController.getItemsByLocationAndCategory);


// Export the router for mounting in the main application.
export default itemRouter;
