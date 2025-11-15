import Address from "../models/address.model.js";

// Add Address
export const addaddress = async (req, res) => {
  try {
    const userId = req.user;  
    const { address } = req.body;

    if (!address) {
      return res.status(400).json({ success: false, message: "Address is required" });
    }

    await Address.create({
      ...address,
      userId,
    });

    res.status(200).json({ success: true, message: "Address added successfully" });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
// Get All Addresses For User
export const getaddress = async (req, res) => {
  try {
    const userId = req.user;

    const addresses = await Address.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      addresses,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch addresses",
      error: error.message,
    });
  }
};
