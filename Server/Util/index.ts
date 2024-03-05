import jwt from 'jsonwebtoken';
import db from '../Config/db';

/**
 * Convenience function to generate a JWT token
 *
 * @export
 * @param {UserDocument} user
 * @returns {string}
 */
export function GenerateToken(user: UserDocument): string
{
    const payload =
    {
        id: user._id,
        DisplayName: user.displayName,
        username: user.username,
        EmailAddress: user.emailAddress
    }
    
    const jwtOptions =
    {
        expiresIn: 604800 // 1 week
        // Note: this may be made considerably shorter for security purposes
    }

    return jwt.sign(payload, db.sessionSecret, jwtOptions);
}