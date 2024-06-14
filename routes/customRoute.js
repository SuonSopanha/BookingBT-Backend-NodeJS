const router = require("express").Router();

const { getTopDrivers } = require("../controller/driverController");
const {getReciptById} = require("../controller/bookingController");

router.get("/top-drivers", getTopDrivers);
router.get("/recipt/:id",getReciptById);


module.exports = router