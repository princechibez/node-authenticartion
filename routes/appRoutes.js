const express = require("express");

const isAuth = require("../middleware/authMiddleware");
const grantAccess = require("../middleware/authPermission");
const otherControllers = require("../controllers/otherControllers");

const router = express.Router()

router.get("/", isAuth, grantAccess(["user", "admin", "manager", "staff"]), otherControllers.getUsersController);

router.get("/managersRoute", isAuth, grantAccess(["admin"]), otherControllers.getManagersController);

router.get("/adminsRoute", isAuth, grantAccess(["admin"]), otherControllers.getAdminsController);

router.get("/staffsRoute", isAuth, grantAccess(["manager, staff"]), otherControllers.getStaffController);


module.exports = router;