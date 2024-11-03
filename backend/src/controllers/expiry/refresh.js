import User from '../../schemas/user.js';

export async function refreshTimer(req, res, next) {
    try {
        const userId = req.userId;
        if (!userId) {
            throw new Error('Unauthorized');
        }

        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        user.lastRefresh = new Date();
        await user.save();

        res.status(200).json({
            message: 'Refreshed expiry time'
        });
        
    } catch (error) {
        next(error);
    }
}