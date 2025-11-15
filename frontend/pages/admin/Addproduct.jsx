import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Addproduct = () => {
  const { navigate, axios } = useContext(AppContext);

  const [bookdata, setBookdata] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    offerPrice: "",
    rating: "",
    reviews: "",
    category: "",
    image: null,
  });

  const handleChange = (e) => {
    setBookdata({ ...bookdata, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setBookdata({ ...bookdata, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("image", bookdata.image);
      formData.append("title", bookdata.title);
      formData.append("author", bookdata.author);
      formData.append("price", bookdata.price);
      formData.append("offerPrice", bookdata.offerPrice);
      formData.append("rating", bookdata.rating);
      formData.append("reviews", bookdata.reviews);
      formData.append("description", bookdata.description);
      formData.append("category", bookdata.category);

      const { data } = await axios.post("/api/books/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        toast.success(data.message);
        navigate("/admin");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0b0c10] flex justify-center py-14 px-4">
      
      <form
        onSubmit={handleSubmit}
        className="
          w-full max-w-xl rounded-2xl 
          bg-white/5 backdrop-blur-xl 
          border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.4)] 
          p-8 space-y-6
        "
      >
        <h1 className="text-3xl font-semibold text-white mb-6 text-center">
          Add New Book
        </h1>

        {/* Upload Image */}
        <div>
          <p className="text-white/80 mb-2 font-medium">Book Cover</p>

          <label
            htmlFor="image"
            className="
              w-full h-40 flex items-center justify-center 
              border-2 border-dashed border-white/20 rounded-xl
              cursor-pointer hover:bg-white/5 transition
            "
          >
            <input
              type="file"
              id="image"
              accept="image/*"
              hidden
              onChange={handleImage}
            />

            {bookdata.image ? (
              <img
                src={URL.createObjectURL(bookdata.image)}
                alt="preview"
                className="w-32 h-32 object-cover rounded-xl shadow-md"
              />
            ) : (
              <p className="text-gray-400 text-sm">Click to upload image</p>
            )}
          </label>
        </div>

        {/* Inputs */}
        {[
          { label: "Book Title", name: "title", type: "text" },
          { label: "Author", name: "author", type: "text" },
        ].map((field, i) => (
          <div key={i}>
            <p className="text-white/80 mb-1 font-medium">{field.label}</p>
            <input
              name={field.name}
              type={field.type}
              value={bookdata[field.name]}
              onChange={handleChange}
              required
              className="
                w-full py-2.5 px-3 rounded-lg 
                bg-white/10 border border-white/20 
                text-white placeholder-gray-400
                outline-none focus:border-indigo-400
              "
            />
          </div>
        ))}

        {/* Description */}
        <div>
          <p className="text-white/80 mb-1 font-medium">Description</p>
          <textarea
            name="description"
            rows={3}
            value={bookdata.description}
            onChange={handleChange}
            className="
              w-full py-3 px-3 rounded-lg 
              bg-white/10 border border-white/20 
              text-white placeholder-gray-400
              outline-none focus:border-indigo-400
            "
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <p className="text-white/80 mb-1 font-medium">Category</p>
          <select
            name="category"
            value={bookdata.category}
            onChange={handleChange}
            required
            className="
              w-full py-2.5 px-3 rounded-lg 
              bg-white/10 border border-white/20 text-black
              outline-none focus:border-indigo-400
            "
          >
            <option value="">Select Category</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="History">History</option>
            <option value="Poetry">Poetry</option>
            <option value="Thrill">Thrill</option>
            <option value="Astronaut">Astronaut</option>
          </select>
        </div>

        {/* Pricing */}
        <div className="flex gap-4">
          <div className="flex-1">
            <p className="text-white/80 mb-1 font-medium">Price</p>
            <input
              name="price"
              type="number"
              value={bookdata.price}
              onChange={handleChange}
              className="
                w-full py-2.5 px-3 rounded-lg bg-white/10 border border-white/20 
                text-white outline-none focus:border-indigo-400
              "
            />
          </div>

          <div className="flex-1">
            <p className="text-white/80 mb-1 font-medium">Offer Price</p>
            <input
              name="offerPrice"
              type="number"
              value={bookdata.offerPrice}
              onChange={handleChange}
              className="
                w-full py-2.5 px-3 rounded-lg bg-white/10 border border-white/20 
                text-white outline-none focus:border-indigo-400
              "
            />
          </div>
        </div>

        {/* Rating & Reviews */}
        <div className="flex gap-4">
          <div className="flex-1">
            <p className="text-white/80 mb-1 font-medium">Rating</p>
            <input
              name="rating"
              type="number"
              step="0.1"
              value={bookdata.rating}
              onChange={handleChange}
              className="
                w-full py-2.5 px-3 rounded-lg bg-white/10 border border-white/20 
                text-white outline-none focus:border-indigo-400
              "
            />
          </div>

          <div className="flex-1">
            <p className="text-white/80 mb-1 font-medium">Reviews</p>
            <input
              name="reviews"
              type="number"
              value={bookdata.reviews}
              onChange={handleChange}
              className="
                w-full py-2.5 px-3 rounded-lg bg-white/10 border border-white/20 
                text-white outline-none focus:border-indigo-400
              "
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="
            w-full py-3 bg-gradient-to-r from-indigo-600 to-blue-600 
            text-white rounded-lg text-lg font-semibold 
            shadow-[0_10px_30px_rgba(79,70,229,0.6)]
            hover:scale-[1.02] transition
          "
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default Addproduct;
