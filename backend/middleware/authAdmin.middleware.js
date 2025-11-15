import jwt from "jsonwebtoken";

export const AuthAdmin = (req, res, next) => {
  const { adminToken } = req.cookies;

  if (!adminToken)
    return res.status(401).json({ message: "Unauthorized: No token" });

  try {
    const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);

    if (decoded.username === process.env.ADMIN_USERNAME) {
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
