import { Router } from 'express'
import { handleRegister } from '../controllers/auth/register.js'

export const router = Router()

const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

router.post('/register', asyncHandler(handleRegister))