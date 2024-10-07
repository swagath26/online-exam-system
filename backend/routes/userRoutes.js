const express = require('express');
const { getUsers } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', auth, getUsers); // Admin only

module.exports = router;