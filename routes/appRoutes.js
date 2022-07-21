const express = require("express");

const isAuth = require("../middleware/authMiddleware");
const otherControllers = require("../controllers/otherControllers");

const router = express.Router()

router.get("/", isAuth, otherControllers.getUsersController);

router.get("/managersRoute", otherControllers.getManagersController);

router.get("/adminsRoute", otherControllers.getAdminsController);

router.get("/staffsRoute", otherControllers.getStaffController);


module.exports = router;