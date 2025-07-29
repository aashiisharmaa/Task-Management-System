const express = require('express');
const { register, login } = require('../controllers/authController');
//const { register, login } = require('c:/Users/ASUS/task-management-system/backend/controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;