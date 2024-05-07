const router = require('express').Router();

const authenticateToken = require('../middleware/authenticateToken');
const { addInfo, editUser } = require('../controllers/userController');

router.post('/addInfo', authenticateToken, addInfo);
router.put('/editUser', authenticateToken, editUser);

module.exports = router;