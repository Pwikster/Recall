import express from 'express';
import CategoryController from '../controllers/category.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';

// Initialize the router object from Express to manage category routes.
const categoryRouter = express.Router();

// Route for creating a new category. Requires authentication.
categoryRouter.post('/categories', authMiddleware, CategoryController.createCategory);

// Route to get all categories. Requires authentication.
categoryRouter.get('/categories', authMiddleware, CategoryController.getCategories);

// Route to get a specific category by its ID. Requires authentication.
categoryRouter.get('/categories/:id', authMiddleware, CategoryController.getCategoryById);

// Route to update a category identified by its ID. Requires authentication.
categoryRouter.put('/categories/:id', authMiddleware, CategoryController.updateCategory);

// Route to delete a specific category by its ID. Requires authentication.
categoryRouter.delete('/categories/:id', authMiddleware, CategoryController.deleteCategory);

// Export the router to be used in the application.
export default categoryRouter;
