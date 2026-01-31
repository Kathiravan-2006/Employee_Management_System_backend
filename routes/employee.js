const express = require("express");
const router = express.Router();
const {
	addEmployees,
	getEmployees,
	getEmployeeDetails,
	updateEmployee,
	deleteEmployee,
} = require("../controllers/employeeController");
const authMiddlewares = require("../middlewares/authMiddlewares");
const adminMiddlewares = require("../middlewares/adminMiddlewares");

router.post("/", addEmployees);
router.get("/", getEmployees);
router.get("/:id", authMiddlewares, adminMiddlewares, getEmployeeDetails);
router.put("/:id", authMiddlewares, adminMiddlewares, updateEmployee);
router.delete("/:id", authMiddlewares, adminMiddlewares, deleteEmployee);

module.exports = router;
