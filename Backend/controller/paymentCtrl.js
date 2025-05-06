const Razorpay = require("razorpay");
const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");

const instance = new Razorpay({
  key_id: "rzp_test_HSSeDI22muUrLR",
  key_secret: "sRO0YkBxvgMg0PvWHJN16Uf7",
});

const checkout = asyncHandler(async (req, res) => {
  const {
    shippingInfo,
    orderItems,
    totalPrice,
    totalPriceAfterDiscount,
  } = req.body;
  const { _id } = req.user;
  try {
    console.log("Checkout request received:", req.body); // Log request body

    // Provide default values for missing fields
    const defaultShippingInfo = {
      firstname: "Default",
      lastname: "User",
      address: "Default Address",
      city: "Default City",
      state: "Default State",
      pincode: 123456,
      ...shippingInfo,
    };

    const defaultPaymentInfo = {
      razorpayOrderId: "none",
      razorpayPaymentId: "none",
    };

    const order = await Order.create({
      shippingInfo: defaultShippingInfo,
      orderItems: orderItems || [],
      totalPrice: totalPrice || 0,
      totalPriceAfterDiscount: totalPriceAfterDiscount || 0,
      paymentInfo: defaultPaymentInfo,
      user: _id,
    });

    res.json({
      order,
      success: true,
    });
  } catch (error) {
    console.error("Error in checkout:", error); // Log error details
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

const paymentVerification = async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId } = req.body;
  res.json({
    razorpayOrderId,
    razorpayPaymentId,
  });
};

module.exports = {
  checkout,
  paymentVerification,
};
