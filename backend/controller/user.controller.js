import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const Signup = async (req, res) => {
    
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return  res.status(400).json({ message: "All fields are required" });
        }
        const existinguser = await User.findOne({ email });
        if (existinguser) {
            return res.status(409).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign(
            { userId: newUser._id, email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 3600000,
        });

        await newUser.save();
        res.status(201).json({ message: "User created successfully," , user: newUser });


    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }



}

export const Login = async (req, res) => {  
        try {
                const { email, password } = req.body;
                if (!email || !password) {
                    return res.status(400).json({ message: "All fields are required" });
                }
                const user = await User.findOne({ email });
                if (!user) {
                    return res.status(401).json({ message: "Invalid credentials" });
                }
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                    return res.status(401).json({ message: "Invalid credentials" });
                }
                const token = jwt.sign(
                    { userId: user._id, email: user.email },
                    process.env.JWT_SECRET,
                    { expiresIn: "1h" }
                );
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                    maxAge: 3600000,
                });

                res.status(200).json({ message: "Login successful", user });


        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }

}

export const Logout = (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        });
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        
    }
}

export const checkAuth = async(req, res) => {
    try {
        const userId = req.user;
        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

