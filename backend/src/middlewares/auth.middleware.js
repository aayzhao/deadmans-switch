import jwt from "jsonwebtoken";

export async function requiresAuthentication(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new Error("Unauthorized");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    next(error);
  }
}
