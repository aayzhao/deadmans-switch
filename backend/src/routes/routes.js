import { Router } from 'express'
import { handleRegister } from '../controllers/auth/register.js'
import { handleLogin, handleLogout } from '../controllers/auth/login.js'

export const router = Router()

const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

router.post('/register', asyncHandler(handleRegister))
router.post('/login', asyncHandler(handleLogin))
router.post('/logout', asyncHandler(handleLogout))