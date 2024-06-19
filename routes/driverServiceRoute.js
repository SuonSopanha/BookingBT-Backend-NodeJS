const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const { createService, getAllServices, getServiceById, updateService, deleteService,displayAllServices,servicesDetails,getMyServices } = require('../controller/serviceController');

const router = express.Router();

router.get('/',authenticateToken,getMyServices);
router.get('/:id',authenticateToken,getServiceById);



module.exports = router;