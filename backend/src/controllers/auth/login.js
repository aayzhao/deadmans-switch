import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../schemas/user.js';

export async function handleLogin(req, res, next) {
    try {
        // Find the user with the email provided
        const user = await User.findOne({ email: req.body.email });

        // Compare the password provided with the user's password
        const match = await bcrypt.compare(req.body.password, user.password);

        // Create a JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
        });
        
        res.status(200).send({
            message: 'Login successful',
            email: user.email,
            token: token,
        });

    } catch (error) {
        next(error);
    }
}

export async function handleLogout(req, res, next) {
    try {
        res.clearCookie('token');
        res.status(200).send({ message: 'Logout successful' });
    } catch (error) {
        next(error);
    }
}