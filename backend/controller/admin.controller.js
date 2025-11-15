import jwt from "jsonwebtoken";

export const adminlogin = (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password)
        return res.status(400).json({ message: "All fields are required" });
  
      if (
        email === process.env.ADMIN_USERNAME &&
        password === process.env.ADMIN_PASSWORD
      ) {
        const adminToken = jwt.sign(
          { username: process.env.ADMIN_USERNAME },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        res.cookie("adminToken", adminToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
          maxAge: 3600000,
        });
  
        return res.status(200).json({ message: "Admin login successful" });
      }
  
      return res.status(401).json({ message: "Invalid credentials" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
// check admin authe

export const checkAuth = async(req, res) => {
    try {
        res.send({ success: true, message: "Admin is authenticated" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export const adminlogout = (req, res) => {
    try {
        res.clearCookie("adminToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        });
        res.status(200).json({ message: "Admin logout successful" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}


