// Function to generate token
const generate_token = (user_id) => {
    const jwt = require('jsonwebtoken');
    return jwt.sign({ user_id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
};

// Function to hash password
const hash_password = async (password) => {
    const bcrypt = require('bcrypt');
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Function to compare password
const compare_password = async (password, hashedPassword) => {
    const bcrypt = require('bcrypt');
    return await bcrypt.compare(password, hashedPassword);
};

// ✅ Remove send_response from here
module.exports = {
    generate_token,
    hash_password,
    compare_password
};
