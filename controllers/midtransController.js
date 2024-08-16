const MidtransService = require('../services/midtransService');

exports.createPayment = async (req, res) => {
    try {
        const { transaksiId } = req.body;

        const paymentUrl = await MidtransService.createTransaction({ transaksiId });
        res.status(201).json({ paymentUrl });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.handleNotification = async (req, res) => {
    try {
        const notification = req.body;
        const transaksi = await MidtransService.handleNotification(notification);
        res.status(200).json(transaksi);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
