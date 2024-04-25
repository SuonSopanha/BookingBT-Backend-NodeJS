require('dotenv').config();

const User = require('../db/models/user');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
    try {
        const { fullname, email, password, confirm_password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email: email } });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        // Check if password and confirm_password match
        if (password !== confirm_password) {
            return res.status(400).json({
                success: false,
                message: 'Password and confirm password do not match'
            });
        }

        // Create user
        const user = await User.create({
            fullName: fullname,
            email: email,
            password: bcrypt.hashSync(password, 10),
            confirm_password: confirm_password,
            role: 'user'
        });

        // Generate JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({
            success: true,
            message: 'User created successfully',
            token
        });
    } catch (error) {
        // Handle any errors
        console.error('Signup failed:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};


module.exports = {signup}

