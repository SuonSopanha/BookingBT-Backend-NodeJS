const router = require("express").Router();

const authenticateToken = require('../middleware/authenticateToken');

const { getTopDrivers,checkDriverRole } = require("../controller/driverController");
const {getReciptById,getMyBooking,updateBookingStatus} = require("../controller/bookingController");
const {getMyServices} = require("../controller/serviceController");

router.get("/top-drivers", getTopDrivers);
router.get("/recipt/:id",getReciptById);
router.get("/my-booking",authenticateToken,getMyBooking);
router.put("/booking-status/:id",authenticateToken,updateBookingStatus);
router.get("/ifDriver",authenticateToken,checkDriverRole);
router.get("/my-service",authenticateToken,getMyServices);



module.exports = router