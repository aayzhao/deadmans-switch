import bcrypt from "bcrypt";
import User from "../../schemas/user.js";

export async function handleRegister(req, res, next) {
  try {
    // Hash the password
    const hash = await bcrypt.hash(req.body.password, 10);

    // Create a new user with hashed password
    const newUser = await User.create({
      email: req.body.email,
      password: hash,
    });

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

    res.status(201).send({
      message: "Registration successful",
      user: {
        email: newUser.email,
        lastRefresh: newUser.lastRefresh,
      },
      token,
    });
  } catch (error) {
    // Pass any errors to the error handler middleware
    next(error);
  }
}
