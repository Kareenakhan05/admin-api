// Function to generate token
const generate_token = (user_id) => {
    // Implementation for generating token
    const jwt = require('jsonwebtoken');
    const token = jwt.sign({ user_id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    return token;
};

// Function to hash password
const hash_password = async (password) => {
    const bcrypt = require('bcrypt');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

// Function to compare password
const compare_password = async (password, hashedPassword) => {
    const bcrypt = require('bcrypt');
    return await bcrypt.compare(password, hashedPassword);
};



// Exporting functions using module.exports
module.exports = {
    generate_token,
    hash_password,
    compare_password,
    send_response,
};
