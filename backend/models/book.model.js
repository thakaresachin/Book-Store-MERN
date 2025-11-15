import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    offerPrice: { type: Number, required: true },
    category: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    reviews: { type: Array, default: [] },
    image: { type: String, required: true }, // ← FIXED
  },
  { timestamps: true }
);

const book= mongoose.model("Book", bookSchema);
export default book;
