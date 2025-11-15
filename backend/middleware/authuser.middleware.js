import jwt from "jsonwebtoken";

export const AuthUser = (req, res, next) => {
  const token = req.cookies.token;  // ✔ token read properly

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized: No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId;   // ✔ store only userId
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
  }
};
