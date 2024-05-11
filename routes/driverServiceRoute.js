const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const { createService, getAllServices, getServiceById, updateService, deleteService,displayAllServices,servicesDetails } = require('../controller/serviceController');

const router = express.Router();

router.get('/',authenticateToken,getAllServices);
router.get('/:id',authenticateToken,getServiceById);


module.exports = router;