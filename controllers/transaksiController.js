const TransaksiService = require('../services/transaksiService');

exports.createTransaksi = async (req, res) => {
    try {
        const { menuId, jumlah } = req.body;
        const pembeliId = req.pembeliId; // Use pembeliId from the middleware

        const result = await TransaksiService.createTransaksi({ pembeliId, menuId, jumlah });

        res.status(201).json({
            message: "Transaksi berhasil dibuat, silakan lakukan pembayaran melalui URL yang disediakan.",
            transaksi: result.transaksi,
            payment_url: result.redirect_url
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllTransaksi = async (req, res) => {
    try {
        let transaksi;
        if (req.pembeliId) {
            // If pembeliId exists, filter transactions by this pembeliId
            transaksi = await TransaksiService.getAllTransaksiByPembeliId(req.pembeliId);
        } else {
            // If no token is provided, return all transactions
            transaksi = await TransaksiService.getAllTransaksi();
        }
        res.status(200).json(transaksi);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getTransaksiById = async (req, res) => {
    try {
        const { id } = req.params;
        const transaksi = await TransaksiService.getTransaksiById(id);
        if (!transaksi) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.status(200).json(transaksi);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateTransaksi = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const transaksi = await TransaksiService.updateTransaksi(id, updatedData);
        res.status(200).json(transaksi);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteTransaksi = async (req, res) => {
    try {
        const { id } = req.params;
        await TransaksiService.deleteTransaksi(id);
        res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
