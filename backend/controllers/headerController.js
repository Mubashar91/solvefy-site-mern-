const HeaderItem = require('../models/HeaderItem');
const Header = require('../models/Header');
const fs = require('fs').promises;
const path = require('path');

// Get all header items
exports.getHeaderItems = async (req, res) => {
    try {
        const items = await HeaderItem.find().sort('order');
        res.json(items);
    } catch (err) {
        console.error('Error in getHeaderItems:', err);
        res.status(500).json({ 
            success: false,
            message: 'Failed to fetch header items',
            error: err.message 
        });
    }
};

// Create a new header item
exports.createHeaderItem = async (req, res) => {
    try {
        const { text, link, order, isActive } = req.body;
        if (!text || !link) {
            return res.status(400).json({ 
                success: false,
                message: 'Text and link are required' 
            });
        }

        const newItem = new HeaderItem({ text, link, order, isActive });
        await newItem.save();
        res.status(201).json({
            success: true,
            data: newItem
        });
    } catch (err) {
        console.error('Error in createHeaderItem:', err);
        res.status(500).json({ 
            success: false,
            message: 'Failed to create header item',
            error: err.message 
        });
    }
};

// Update a header item
exports.updateHeaderItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { text, link, order, isActive } = req.body;
        
        if (!text || !link) {
            return res.status(400).json({ 
                success: false,
                message: 'Text and link are required' 
            });
        }

        const updatedItem = await HeaderItem.findByIdAndUpdate(
            id,
            { text, link, order, isActive },
            { new: true }
        );

        if (!updatedItem) {
            return res.status(404).json({ 
                success: false,
                message: 'Header item not found' 
            });
        }

        res.json({
            success: true,
            data: updatedItem
        });
    } catch (err) {
        console.error('Error in updateHeaderItem:', err);
        res.status(500).json({ 
            success: false,
            message: 'Failed to update header item',
            error: err.message 
        });
    }
};

// Delete a header item
exports.deleteHeaderItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await HeaderItem.findByIdAndDelete(id);
        
        if (!deletedItem) {
            return res.status(404).json({ 
                success: false,
                message: 'Header item not found' 
            });
        }

        // Reorder remaining items
        const remainingItems = await HeaderItem.find().sort('order');
        for (let i = 0; i < remainingItems.length; i++) {
            remainingItems[i].order = i;
            await remainingItems[i].save();
        }

        res.json({
            success: true,
            message: 'Header item deleted successfully'
        });
    } catch (err) {
        console.error('Error in deleteHeaderItem:', err);
        res.status(500).json({ 
            success: false,
            message: 'Failed to delete header item',
            error: err.message 
        });
    }
};

// Get logo
exports.getLogo = async (req, res) => {
    try {
        const header = await Header.findOne();
        if (!header || !header.logo) {
            return res.status(404).json({ 
                success: false,
                message: 'Logo not found' 
            });
        }
        res.json({
            success: true,
            data: header.logo
        });
    } catch (err) {
        console.error('Error in getLogo:', err);
        res.status(500).json({ 
            success: false,
            message: 'Failed to fetch logo',
            error: err.message 
        });
    }
};

// Update logo
exports.updateLogo = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ 
                success: false,
                message: 'No file uploaded' 
            });
        }

        const header = await Header.findOne() || new Header();
        
        // Delete old logo file if it exists
        if (header.logo && header.logo.path) {
            try {
                await fs.unlink(path.join(__dirname, '..', header.logo.path));
            } catch (err) {
                console.error('Error deleting old logo:', err);
            }
        }

        header.logo = {
            url: `/uploads/${req.file.filename}`,
            path: `uploads/${req.file.filename}`,
            alt: req.body.alt || 'Site Logo'
        };

        await header.save();

        res.json({
            success: true,
            data: header.logo
        });
    } catch (err) {
        console.error('Error in updateLogo:', err);
        res.status(500).json({ 
            success: false,
            message: 'Failed to update logo',
            error: err.message 
        });
    }
};