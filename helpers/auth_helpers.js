import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Generate JWT Token
export function generate_token(user_id) {
    if (!process.env.JWT_SECRET) {
        throw new Error("Missing JWT_SECRET in environment variables");
    }
    return jwt.sign({ id: user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

// Hash Password
export async function hash_password(password) {
    if (!password) {
        throw new Error("Password cannot be empty");
    }
    return await bcrypt.hash(password, 10);
}

// Compare Passwords
export async function compare_password(password, hashed_password) {
    if (!password || !hashed_password) {
        throw new Error("Password and hashed password cannot be empty");
    }
    return await bcrypt.compare(password, hashed_password);
}
