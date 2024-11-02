import bcrypt from 'bcrypt'
import User from '../../schemas/user.js'

export async function handleRegister(
    req,
    res,
    next
) {
    try {
        // Hash the password
        const hash = await bcrypt.hash(req.body.password, 10);

        // Create a new user with hashed password
        const newUser = await User.create({
            email: req.body.email,
            password: hash,
        });

        // Send response with the created user (omit sensitive info like password)
        res.status(201).json({
            message: 'User registered successfully',
            user: { email: newUser.email }, // Only return non-sensitive data
        });
    } catch (error) {
        // Pass any errors to the error handler middleware
        next(error);
    }
}