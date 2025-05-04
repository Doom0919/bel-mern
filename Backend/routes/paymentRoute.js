const express = require("express");
const { checkout, paymentVerification } = require("../controller/paymentCtrl");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/checkout", authMiddleware, checkout);
router.post("/paymentVerification", authMiddleware, paymentVerification);

module.exports = router;