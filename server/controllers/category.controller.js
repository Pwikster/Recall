// Here stands the Category model, a cornerstone of our organizational framework.
import Category from '../models/category.model.js';

// The CategoryController, a guiding light in the categorization of our inventory.
const CategoryController = {
    // In the beginning, there is creation. Here, we bring a new category into existence.
    createCategory: async (req, res) => {
        const { name } = req.body;

        try {
            // With a creator's vision, we forge a new category, a label for our items.
            const newCategory = await Category.create({ name });
            // Triumph! A new category joins our ranks, expanding our organizational capabilities.
            res.status(201).json(newCategory);
        } catch (error) {
            // Alas, the path of creation is fraught with obstacles. Here, we encounter one such challenge.
            res.status(400).json({ message: `Error creating category: ${error.message}` });
        }
    },

    // Onward to discovery! We seek to unveil all categories within our domain.
    getCategories: async (req, res) => {
        try {
            // The hunt is fruitful, revealing the categories that comprise our system.
            const categories = await Category.find({});
            // Revealed! The categories lay before us, each a domain of its own.
            res.json(categories);
        } catch (error) {
            // Exploration is not without its perils. Here, we report back on any setbacks.
            res.status(500).json({ message: `Error fetching categories: ${error.message}` });
        }
    },

    // A focused inquiry, seeking the details of a single category.
    getCategoryById: async (req, res) => {
        const { id } = req.params;

        try {
            // A precise operation, we locate the category by its unique identifier.
            const category = await Category.findById(id);
            if (!category) {
                // An absence noted, the sought category remains beyond our grasp.
                return res.status(404).json({ message: "Category not found" });
            }

            // Success! The category's essence is shared, its role within our system clarified.
            res.json(category);
        } catch (error) {
            // Inquiry may lead to impasses. Here, we confront such an impasse head-on.
            res.status(500).json({ message: `Error fetching category: ${error.message}` });
        }
    },

    // Change, the only constant. Here, we navigate the waters of category modification.
    updateCategory: async (req, res) => {
        const { id } = req.params;
        const updateData = req.body;

        try {
            // An act of transformation, we refine the category's identity.
            const updatedCategory = await Category.findByIdAndUpdate(id, updateData, { new: true });

            if (!updatedCategory) {
                // Elusive, the category evades our efforts to redefine it.
                return res.status(404).json({ message: "Category not found" });
            }

            // Reborn, the category emerges anew, its purpose and definition revitalized.
            res.json(updatedCategory);
        } catch (error) {
            // The path to renewal may be fraught with difficulty. We acknowledge and address these challenges.
            res.status(400).json({ message: `Error updating category: ${error.message}` });
        }
    },

    // An end, as all things must face. Here, we outline the departure of a category from our ranks.
    deleteCategory: async (req, res) => {
        const { id } = req.params;

        try {
            // A final act, we remove the category from our records, erasing its trace.
            const deletedCategory = await Category.findByIdAndDelete(id);

            if (!deletedCategory) {
                // A void where once there was substance, the category has already faded from view.
                return res.status(404).json({ message: "Category not found" });
            }

            // A solemn goodbye, marking the category's removal from our system.
            res.json({ message: 'Category deleted successfully' });
        } catch (error) {
            // In conclusion, as in all things, challenges may arise. We meet these with resolution.
            res.status(500).json({ message: `Error deleting category: ${error.message}` });
        }
    },
}

// And with that, our narrative of the CategoryController draws to a close, a testament to our efforts in the realm of categorization.
export default CategoryController;
