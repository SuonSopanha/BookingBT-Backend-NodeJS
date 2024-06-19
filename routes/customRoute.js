const router = require("express").Router();

const authenticateToken = require('../middleware/authenticateToken');

const { getTopDrivers,checkDriverRole,getUnApprovedDrivers,getDriverDetails,approveDriver } = require("../controller/driverController");
const {getReciptById,getMyBooking,updateBookingStatus,getDriverBooking} = require("../controller/bookingController");
const {getMyServices,serviceSearch} = require("../controller/serviceController");
const {getAllUsers} = require("../controller/userController");
const {getStatistics} = require("../controller/adminController");

router.get("/top-drivers", getTopDrivers);
router.get("/recipt/:id",getReciptById);
router.get("/my-booking",authenticateToken,getMyBooking);
router.put("/booking-status/:id",authenticateToken,updateBookingStatus);
router.get("/ifDriver",authenticateToken,checkDriverRole);
router.get("/my-service",authenticateToken,getMyServices);
router.post("/service-search",serviceSearch);
router.get("/un-approve",getUnApprovedDrivers);
router.get("/all-users",getAllUsers);
router.get("/driver-details/:id",getDriverDetails);
router.get("/getStatistics",getStatistics);
router.get("/driver-booking/:id",authenticateToken,getDriverBooking);
router.put("/approve-driver/:id",approveDriver);



module.exports = router