const express = require('express');
const router = express.Router();
const headerController = require('../controllers/headerController');
const multer = require('multer');
const path = require('path');

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: function (req, file, cb) {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        }
        cb(new Error('Only image files (jpeg, jpg, png, gif) are allowed!'));
    }
});

// Header Items Routes
router.get('/', headerController.getHeaderItems);
router.post('/', headerController.createHeaderItem);
router.put('/:id', headerController.updateHeaderItem);
router.delete('/:id', headerController.deleteHeaderItem);

// Logo Routes
router.get('/logo', headerController.getLogo);
router.put('/logo', upload.single('logo'), headerController.updateLogo);

module.exports = router;