const express = require('express');
const router = express.Router();
const headerSettingController = require('../controllers/headerSettingsController'); // Ensure the correct controller path
const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
  destination: './uploads/', // Ensure the folder exists
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename based on timestamp
  }
});

const upload = multer({ storage: storage });

// Routes
router.post('/', upload.single('logo'), headerSettingController.createHeader); // Create header
router.get('/', headerSettingController.getAllHeaders); // Get all headers
router.get('/:id', headerSettingController.getHeader); // Get a single header by ID
router.put('/:id', upload.single('logo'), headerSettingController.updateHeader); // Update header
router.delete('/:id', headerSettingController.deleteHeader); // Delete header

module.exports = router;
