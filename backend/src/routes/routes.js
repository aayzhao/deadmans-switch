import { Router } from "express";
import { handleRegister } from "../controllers/auth/register.js";
import { handleLogin, handleLogout } from "../controllers/auth/login.js";
import { refreshTimer } from "../controllers/expiry/refresh.js";
import { requiresAuthentication } from "../middlewares/auth.middleware.js";

export const router = Router();

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.post("/register", asyncHandler(handleRegister));
router.post("/login", asyncHandler(handleLogin));
router.post("/logout", asyncHandler(handleLogout));

router.post("/refresh", requiresAuthentication, asyncHandler(refreshTimer));
