import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },

    items: [
      {
        product: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],

    amount: { type: Number, required: true },

    // ✔ address string — fully fixed
    address: { type: String, required: true },

    status: { type: String, default: "Order Placed" },

    paymentType: { type: String, required: true },

    isPaid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
