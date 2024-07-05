const router = require("express").Router();

const authenticateToken = require('../middleware/authenticateToken');

const { getTopDrivers,checkDriverRole,getUnApprovedDrivers,getDriverDetails,approveDriver,getHighestBookingDrivers, } = require("../controller/driverController");
const {getReciptById,getMyBooking,updateBookingStatus,getDriverBooking,getEveryBookingService} = require("../controller/bookingController");
const {getMyServices,serviceSearch} = require("../controller/serviceController");
const {getAllUsers} = require("../controller/userController");
const {getStatistics} = require("../controller/adminController");
const {getRatingByDriver} = require("../controller/ratingController");
const {suspendUser,suspendDriver,deleteSuspension,unsuspendDriver} = require("../controller/suspensionController");

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
router.get("/driver-rating/:id",getRatingByDriver);
router.post("/suspend-driver/:id",suspendDriver);
router.post("/suspend-user/:id",suspendUser);
router.post("/delete-suspension/:id",deleteSuspension);
router.get("/everyBooking",getEveryBookingService);
router.get("/highest-booking",getHighestBookingDrivers);
router.put("/unsuspend-driver/:id",unsuspendDriver);


module.exports = router