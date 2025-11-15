import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import Book from "../models/book.model.js";

export const placedorderCOD = async (req, res) => {
  try {
    const userId = req.user;
    const { items, address } = req.body;

    if (!userId || !address || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid order details",
      });
    }

    // Calculate amount
    let amount = 0;
    for (const i of items) {
      const book = await Book.findById(i.product);
      if (!book) {
        return res.status(400).json({
          success: false,
          message: "Invalid book in order",
        });
      }
      amount += (book.offerPrice || 0) * i.quantity;
    }

    // Save order
    const orderDoc = await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
      isPaid: false,
    });

    // 🔥 IMPORTANT — ONLY ONE RESPONSE EVER
    return res.status(200).json({
      success: true,
      message: "Order placed successfully",
      orderId: orderDoc._id,
    });

  } catch (error) {
    console.log("Order error:", error);

    // 🔥 THIS RETURNS ONLY ONE RESPONSE
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


export const getUserOrder = async (req, res) => {
  try {
    const userId = req.user; // middleware should set req.user = userId

    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 })   // latest order first
      .populate("items.product"); // optional: include book details

    res.status(200).json({
      success: true,
      orders,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user orders",
      error: error.message,
    });
  }
};
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })               // latest orders first
      .populate("userId", "name email")      // show user details
      .populate("items.product");            // show book details

    res.status(200).json({
      success: true,
      orders,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

