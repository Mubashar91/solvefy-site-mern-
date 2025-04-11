const HeaderSetting = require('../models/HeaderSettings');

exports.createHeader = async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    console.log('Request File:', req.file);

    const { text } = req.body;
    const logo = req.file ? `/uploads/${req.file.filename}` : null;

    if (!text || !logo) {
      return res.status(400).json({ message: 'Text and logo are required' });
    }

    const headerSetting = new HeaderSetting({
      text,
      logo
    });

    const savedHeader = await headerSetting.save();
    console.log('Saved Header:', savedHeader);
    res.status(201).json(savedHeader);
  } catch (error) {
    console.error('Save Error:', error);
    res.status(500).json({ message: 'Error creating header', error: error.message });
  }
};

exports.getAllHeaders = async (req, res) => {
  try {
    const headers = await HeaderSetting.find();
    res.json(headers);
  } catch (error) {
    console.error('Error fetching headers:', error);
    res.status(500).json({ message: 'Error fetching headers', error: error.message });
  }
};

exports.getHeader = async (req, res) => {
  try {
    const header = await HeaderSetting.findById(req.params.id);
    if (!header) {
      return res.status(404).json({ message: 'Header not found' });
    }
    res.json(header);
  } catch (error) {
    console.error('Error fetching header:', error);
    res.status(500).json({ message: 'Error fetching header', error: error.message });
  }
};

exports.updateHeader = async (req, res) => {
  try {
    const { text, logoWidth, logoHeight } = req.body;
    const logo = req.file ? `/uploads/${req.file.filename}` : req.body.logo; // Use existing logo if no file uploaded

    const updateData = {};
    if (text) updateData.text = text;
    if (logo) updateData.logo = logo;
    if (logoWidth) updateData.logoWidth = Number(logoWidth);
    if (logoHeight) updateData.logoHeight = Number(logoHeight);

    const header = await HeaderSetting.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!header) {
      return res.status(404).json({ message: 'Header not found' });
    }

    res.json(header);
  } catch (error) {
    console.error('Update Error:', error);
    res.status(500).json({ message: 'Error updating header', error: error.message });
  }
};

exports.deleteHeader = async (req, res) => {
  try {
    const header = await HeaderSetting.findByIdAndDelete(req.params.id);
    if (!header) {
      return res.status(404).json({ message: 'Header not found' });
    }
    res.json({ message: 'Header deleted successfully' });
  } catch (error) {
    console.error('Delete Error:', error);
    res.status(500).json({ message: 'Error deleting header', error: error.message });
  }
};

module.exports = exports;
