const jwt = require('jsonwebtoken');
const { Pembeli } = require('../models');

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        // Tidak ada token, lanjutkan tanpa pembeliId
        return next();
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if (err) {
            console.error('JWT verification failed:', err);
            return res.sendStatus(403); // Forbidden jika token tidak valid
        }

        try {
            const pembeli = await Pembeli.findByPk(user.id);
            if (!pembeli) return res.sendStatus(403); // Forbidden jika pembeli tidak ditemukan

            req.pembeliId = pembeli.id; // Attach pembeliId to the request object
            next();
        } catch (error) {
            console.error('Error finding pembeli:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
};

module.exports = authenticateToken;
