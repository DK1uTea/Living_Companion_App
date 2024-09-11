import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();
const secret = process.env.JWT_SECRET;

export const loginUser = async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await User.findOne({username}); // corrected query
        if(!user){
            console.log('User not found!');
            return res.status(404).send('User not found!');
        }
        console.log(`User founded: ${user}`);
        const isPasswordValid = await bcrypt.compare(password, user.password); // Secure password comparision
        if(!isPasswordValid){
            console.log(`Invalid password!`);
            return res.status(401).send('Invalid username or password!');
        }
        const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' }); // Generate JWT Token
        res.status(200).send({ token, user, message: 'Login successful!' });
    } catch (error) {
        console.log('Error logging!');
        res.status(500).send('Error logging user');
    }
};

export const registerUser = async (req, res) => {
    const {username, email, password} = req.body;

    try {
        const existingUser = await User.findOne({email});
        if(existingUser){
            console.log(`Email: ${email} is exist`);
            return res.status(400).send(`Email already exist`);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            email,
            password: hashedPassword
        });
        console.log(`New user acc: ${user}`);
        await user.save();
        res.status(201).send('User registered successfully!');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Error registering user!');
    }
};