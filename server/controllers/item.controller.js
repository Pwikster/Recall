// Importing our main characters: the Item model for inventory items.
import Item from '../models/item.model.js';

// Defining the ItemController, our central hub for orchestrating item-related operations.
const ItemController = {
    // Let's kick things off by creating a new item. We need details like name, id, amount, location, and category.
    createItem: async (req, res) => {
        const { name, id, amount, location, category } = req.body;

        try {
            // Here's where the magic happens: we create a new item using the provided details.
            const newItem = await Item.create({ name, id, amount, location, category });
            // Voila, a new item is born! Let's celebrate by sending it back in our response.
            res.status(201).json(newItem);
        } catch (error) {
            // If something goes awry, we're here to catch the error and let the caller know.
            res.status(400).json({ message: `Error creating item: ${error.message}` });
        }
    },

    // Time to unveil our entire collection of items, because transparency is key.
    getItems: async (req, res) => {
        try {
            // We're on a quest to find all items. No stone left unturned.
            const items = await Item.find({});
            // Mission accomplished! Presenting our findings.
            res.json(items);
        } catch (error) {
            // Should our quest face any hurdles, we communicate that back swiftly.
            res.status(500).json({ message: `Error fetching items: ${error.message}` });
        }
    },

    // In search of one item in particular? Let's narrow down our focus.
    getItemById: async (req, res) => {
        const { id } = req.params;

        try {
            // Our target is in sight: finding the item by its unique identifier.
            const item = await Item.findById(id);
            if (!item) {
                // If our search yields no results, we break the news gently.
                return res.status(404).json({ message: "Item not found" });
            }

            // Target acquired! Here's the item you were looking for.
            res.json(item);
        } catch (error) {
            // Encountering error is part of the journey. We report back with details.
            res.status(500).json({ message: `Error fetching item: ${error.message}` });
        }
    },

    // Change is constant, and so is the need to update item details.
    updateItem: async (req, res) => {
        const { id } = req.params;
        const updateData = req.body;

        try {
            // Engaging update mode: we seek and update the item in one fell swoop.
            const updatedItem = await Item.findByIdAndUpdate(id, updateData, { new: true });

            if (!updatedItem) {
                // If the item slips through our update net, we report the miss.
                return res.status(404).json({ message: "Item not found" });
            }

            // Update successful! Here's the refreshed item, ready for review.
            res.json(updatedItem);
        } catch (error) {
            // Should our update attempt stumble, we're upfront about it.
            res.status(400).json({ message: `Error updating item: ${error.message}` });
        }
    },

    // There comes a time when we must part ways with an item. Here's how we handle that.
    deleteItem: async (req, res) => {
        const { id } = req.params;

        try {
            // Executing the departure sequence: we find and remove the item.
            const deletedItem = await Item.findByIdAndDelete(id);

            if (!deletedItem) {
                // If the item is elusive or already gone, we communicate accordingly.
                return res.status(404).json({ message: "Item not found" });
            }

            // Parting is such sweet sorrow, but it's done. Farewell, item.
            res.json({ message: 'Item deleted successfully' });
        } catch (error) {
            // In the event of a deletion hiccup, we deliver the details.
            res.status(500).json({ message: `Error deleting item: ${error.message}` });
        }
    },

    // Adding a new function within the ItemController to filter items based on location and category.
    getItemsByLocationAndCategory: async (req, res) => {
        const { location, category } = req.query;

        try {
            // Constructing the query object based on provided filters.
            let query = {};
            if (location) query.location = location;
            if (category) query.category = category;

            // Searching for items that match the query criteria.
            const filteredItems = await Item.find(query).populate('location').populate('category');
            // If no items match the criteria, return an appropriate message.
            if (!filteredItems.length) {
                return res.status(404).json({ message: "No items found matching the criteria." });
            }

            // Success! Returning the filtered list of items.
            res.json(filteredItems);
        } catch (error) {
            // Should any errors arise during the filtering process, we provide details of the mishap.
            res.status(500).json({ message: `Error fetching items by location and category: ${error.message}` });
        }
    },

}

// And thus concludes our narrative on the ItemController.
export default ItemController;
