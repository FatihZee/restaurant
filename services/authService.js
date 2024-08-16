// services/authService.js
const { Pembeli } = require('../models');
const { hashPassword, comparePassword } = require('../helpers/bcrypt'); // Pastikan helper ini ada
const jwt = require('jsonwebtoken');

class AuthService {
    async login({ email, password }) {
        try {
            const pembeli = await Pembeli.findOne({ where: { email } });
            if (!pembeli) {
                throw new Error('Invalid email or password');
            }

            const isPasswordValid = await comparePassword(password, pembeli.password);
            if (!isPasswordValid) {
                throw new Error('Invalid email or password');
            }

            const token = jwt.sign({ id: pembeli.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

            return { pembeli, token };
        } catch (error) {
            throw new Error('Login failed');
        }
    }

    async register({ nama, email, password, telepon }) {
        try {
            // Check if user already exists
            const existingUser = await Pembeli.findOne({ where: { email } });
            if (existingUser) {
                throw new Error('Email already in use');
            }

            // Hash the password
            const hashedPassword = await hashPassword(password);

            // Create a new user
            const pembeli = await Pembeli.create({
                nama,
                email,
                password: hashedPassword,
                telepon
            });

            const token = jwt.sign({ id: pembeli.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

            return { pembeli, token };
        } catch (error) {
            throw new Error('Registration failed');
        }
    }

    async logout() {
        // To be implemented: Invalidate JWT token
        return { message: 'Logout successful' };
    }
}

module.exports = new AuthService();
