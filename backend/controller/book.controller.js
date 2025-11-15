import Book from "../models/book.model.js";

export const addBook = async (req, res) => {
  try {
    const { title, author, description, price, offerPrice, category, rating } =
      req.body;

    if (
      !title ||
      !author ||
      !description ||
      !price ||
      !offerPrice ||
      !category ||
      !rating
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required in add book" });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ message: "Image is required" });
    }

    const image = req.file.path;   // Cloudinary public URL


    const newBook = new Book({
      title,
      author,
      description,
      price,
      offerPrice,
      category,
      rating,
      image,
      reviews: [],
    });

    await newBook.save();

    res
      .status(201)
      .json({ success: true, message: "Book added successfully", book: newBook });
  } catch {
    res
      .status(500)
      .json({ message: "Internal Server Error in add book" });
  }
};

// get all books

export const getAllBooks = async (req, res) => {
    try {
        const books =  await Book.find();
        res.status(200).json({ books });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error in get all books" });
    }
}