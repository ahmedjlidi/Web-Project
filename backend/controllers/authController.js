const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Username, email, and password are required"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            passwordHash
        });

        res.status(201).json({
            message: "Signup successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { loginIdentifier, password } = req.body;

        if (!loginIdentifier || !password) {
            return res.status(400).json({
                message: "Username/email and password are required"
            });
        }

        const user = await User.findOne({
            $or: [
                { username: loginIdentifier },
                { email: loginIdentifier.toLowerCase() }
            ]
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid username/email or password"
            });
        }

        const passwordMatches = await bcrypt.compare(
            password,
            user.passwordHash
        );

        if (!passwordMatches) {
            return res.status(400).json({
                message: "Invalid username/email or password"
            });
        }

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};