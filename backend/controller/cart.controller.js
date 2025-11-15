import User from "../models/user.model.js";


export const UpdateCart = async (req, res) => {
    try {
        const userId = req.user;
        const {cart} = req.body;

        const updateCart = await User.findOneAndUpdate(userId,{cartItems:cart});
        res.status(200).json({ sucess: true, massage :"cart Updated" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};