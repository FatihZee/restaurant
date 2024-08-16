const express = require('express');
const router = express.Router();
const midtransController = require('../controllers/midtransController');

/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Buat transaksi pembayaran
 *     description: Membuat transaksi pembayaran untuk ID transaksi tertentu.
 *     tags:
 *       - Pembayaran
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               transaksiId:
 *                 type: integer
 *                 example: 1
 *                 description: ID transaksi yang akan diproses
 *     responses:
 *       201:
 *         description: URL pembayaran berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 paymentUrl:
 *                   type: string
 *                   description: URL untuk melakukan pembayaran
 *       400:
 *         description: Permintaan tidak valid
 */
router.post('/payments', midtransController.createPayment);

/**
 * @swagger
 * /payments/notification:
 *   post:
 *     summary: Tangani notifikasi pembayaran Midtrans
 *     description: Menerima notifikasi status pembayaran dari Midtrans.
 *     tags:
 *       - Pembayaran
 *     responses:
 *       200:
 *         description: Notifikasi diterima dan diproses dengan sukses
 *       400:
 *         description: Permintaan tidak valid
 */
router.post('/payments/notification', midtransController.handleNotification);

module.exports = router;
