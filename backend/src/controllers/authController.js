import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );
}

export const register = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken'});
        }

        // Create new user
        const newUser = new User({ username, password, role });
        await newUser.save();

        // Generate token
        const token = generateToken(newUser);

        res.status(201).json({ message: "User created", token });

    } catch (error) {
        console.error('Error registering user:', error);
        res.status(400).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // find the user by username
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(400).json({ message: 'Username not find!' });
        }

        if (existingUser.password !== password) {
            return res.status(401).json({ message: 'Incorrect credentials!' });
        }

        const token = generateToken(existingUser);
        
        res.status(200).json({ message: 'Login successful', token });

    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Server error' });
    }
};