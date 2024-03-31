// Welcoming the Location model into the fold, setting the stage for location management.
import Location from '../models/location.model.js';

// The maestro of location operations, the LocationController orchestrates everything location-related.
const LocationController = {
    // The curtain rises on adding a new location. A name is all we need to set the scene.
    createLocation: async (req, res) => {
        const { name } = req.body;

        try {
            // And with a flourish, a new location is created, ready to host our items.
            const newLocation = await Location.create({ name });
            // Success! Our inventory's geography expands with the addition of this new location.
            res.status(201).json(newLocation);
        } catch (error) {
            // Alas, not all endeavors go as planned. Here, we navigate the stormy seas of error handling.
            res.status(400).json({ message: `Error creating location: ${error.message}` });
        }
    },

    // With an explorer's zeal, we set out to discover all our locations.
    getLocations: async (req, res) => {
        try {
            // The quest yields results, a treasure trove of locations unveiled.
            const locations = await Location.find({});
            // Behold the map of our domain, each location a realm of possibilities.
            res.json(locations);
        } catch (error) {
            // Should our expedition face adversity, we duly report back.
            res.status(500).json({ message: `Error fetching locations: ${error.message}` });
        }
    },

    // Sometimes, our focus narrows to a single location, its details magnified.
    getLocationById: async (req, res) => {
        const { id } = req.params;

        try {
            // With precision, we seek out this location by its identifier.
            const location = await Location.findById(id);
            if (!location) {
                // An empty spot on our map, the location sought remains elusive.
                return res.status(404).json({ message: "Location not found" });
            }

            // Found! The location stands revealed, its secrets shared.
            res.json(location);
        } catch (error) {
            // Even the best-laid plans may go awry. Here, we confront our challenges head-on.
            res.status(500).json({ message: `Error fetching location: ${error.message}` });
        }
    },

    // To update is to change, and in our inventory, change is the only constant.
    updateLocation: async (req, res) => {
        const { id } = req.params;
        const updateData = req.body;

        try {
            // With a deft touch, we reshape the location, its identity transformed.
            const updatedLocation = await Location.findByIdAndUpdate(id, updateData, { new: true });

            if (!updatedLocation) {
                // Missing! The location sought has slipped through the sands of time.
                return res.status(404).json({ message: "Location not found" });
            }

            // Renewed! The location emerges, reborn and ready for new adventures.
            res.json(updatedLocation);
        } catch (error) {
            // Change invites challenge, and here we meet it with open arms.
            res.status(400).json({ message: `Error updating location: ${error.message}` });
        }
    },

    // Sometimes, we must say goodbye. Here's how we part ways with a location.
    deleteLocation: async (req, res) => {
        const { id } = req.params;

        try {
            // A solemn act, the deletion of a location erases it from our map.
            const deletedLocation = await Location.findByIdAndDelete(id);

            if (!deletedLocation) {
                // A ghost among our records, the location sought is nowhere to be found.
                return res.status(404).json({ message: "Location not found" });
            }

            // Farewell, location. Your memory lingers, even as you vanish from our charts.
            res.json({ message: 'Location deleted successfully' });
        } catch (error) {
            // In parting, as in all things, we may face unexpected trials.
            res.status(500).json({ message: `Error deleting location: ${error.message}` });
        }
    },
}

// Thus concludes our journey through the LocationController, a beacon in the management of our geographical realms.
export default LocationController;
