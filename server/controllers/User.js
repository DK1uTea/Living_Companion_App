import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();
const secret = process.env.JWT_SECRET;

// Traditional login
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

// Traditional register
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
            password: hashedPassword,
            provider: 'local',
        });
        console.log(`New user acc: ${user}`);
        await user.save();
        res.status(201).send('User registered successfully!');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Error registering user!');
    }
};

// Social login
export const socialLogin = async (req, res) => {
    const {username, email, uid, provider} = req.body;

    // Check if essential fields are missing
    if(!email || !uid || !provider){
        return res.status(400).send('Missing required fields for social login');
    }

    // Proceed with finding or creating user based on social login data
    try {
        let user = await User.findOne({ uid, provider });

        if (!user) {
            // Check for existing email registration in another provider to prevent conflicts
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).send('Email already used by another account!');
            }

            // Register new user
            user = new User({ username, email, uid, provider });
            console.log(user);
            await user.save();
            console.log(`Save user: ${user} to DB!`);
        }

        const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
        res.status(200).send({ token, user, message: 'Social login successful!' });
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).send('Error login user!');
    }
};