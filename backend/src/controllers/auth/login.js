import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../schemas/user.js";

export async function handleLogin(req, res, next) {
  try {
    // Find the user with the email provided
    const user = await User.findOne({ email: req.body.email });

    // Compare the password provided with the user's password
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      throw new Error("Invalid password");
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours,
      sameSite: "Lax",
    });

    res.status(200).send({
      message: "Login successful",
      user: {
        email: user.email,
        lastRefresh: user.lastRefresh,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
}

export async function handleLogout(req, res, next) {
  try {
    res.clearCookie("token");
    res.status(200).send({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
}
