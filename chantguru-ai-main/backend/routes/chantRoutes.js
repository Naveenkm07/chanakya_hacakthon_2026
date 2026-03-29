const express = require('express')
const router = express.Router()

const { generateChant, getAllChants, compareChant } = require('../controllers/chantController');
const authMiddleware = require('../middleware/authMiddleware')

router.post('/generate', authMiddleware, generateChant)
router.get('/all', authMiddleware, getAllChants)
router.post('/compare', authMiddleware, compareChant);

module.exports = router;