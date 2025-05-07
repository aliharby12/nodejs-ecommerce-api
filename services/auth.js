const { generateToken, generateRefreshToken } = require('../auth/jwt');
const asyncHandler = require('express-async-handler');

const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.registerUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newUser = await User.create({
        email,
        password: hashedPassword,
    });

    // Generate a JWT token
    const token = generateToken({ id: newUser._id });
    const refreshToken = generateRefreshToken({ id: newUser._id });

    // Respond with the token
    res.status(201).json({
        status: 'success',
        data: { token: token, refresh: refreshToken },
        message: 'User created successfully',
    });
});

exports.loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check if the password is correct
    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    // Generate a JWT token
    const token = generateToken({ id: user._id });
    const refreshToken = generateRefreshToken({ id: user._id });

    // Respond with the token
    res.status(200).json({ token: token, refresh: refreshToken });
}
);