// controllers/authController.js
const AuthService = require('../services/authService');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await AuthService.login({ email, password });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
};

exports.register = async (req, res) => {
    try {
        const { nama, email, password, telepon } = req.body;
        const result = await AuthService.register({ nama, email, password, telepon });
        return res.status(201).json(result);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

exports.logout = async (req, res) => {
    try {
        const result = await AuthService.logout();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
