const router = require('express').Router();

const authenticateToken = require('../middleware/authenticateToken');
const { addInfo, editUser ,getUser} = require('../controller/userController');

router.get('/userInfo',authenticateToken,getUser);
router.post('/addInfo', authenticateToken, addInfo);
router.put('/editUser', authenticateToken, editUser);

module.exports = router;