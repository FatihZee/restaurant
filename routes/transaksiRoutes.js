const express = require('express');
const router = express.Router();
const transaksiController = require('../controllers/transaksiController');
const authenticateToken = require('../middleware/authMiddleware');

/**
 * @swagger
 * /transaksi:
 *   post:
 *     summary: Buat transaksi baru
 *     tags: [Transaksi]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pembeliId:
 *                 type: integer
 *                 description: ID pembeli yang membuat transaksi
 *               menuId:
 *                 type: integer
 *                 description: ID menu yang dibeli
 *               jumlah:
 *                 type: integer
 *                 description: Jumlah item yang dibeli
 *             required:
 *               - menuId
 *               - jumlah
 *     responses:
 *       201:
 *         description: Transaksi berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 transaksi:
 *                   type: object
 *                 payment_url:
 *                   type: string
 *       400:
 *         description: Permintaan tidak valid
 */
router.post('/transaksi', authenticateToken, transaksiController.createTransaksi);

/**
 * @swagger
 * /transaksi/{id}:
 *   get:
 *     summary: Dapatkan transaksi berdasarkan ID
 *     tags: [Transaksi]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Transaksi ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 pembeliId:
 *                   type: integer
 *                 menuId:
 *                   type: integer
 *                 jumlah:
 *                   type: integer
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Transaksi tidak ditemukan
 */
router.get('/transaksi/:id', authenticateToken, transaksiController.getTransaksiById);

/**
 * @swagger
 * /transaksi:
 *   get:
 *     summary: Dapatkan semua transaksi
 *     tags: [Transaksi]
 *     responses:
 *       200:
 *         description: Daftar semua transaksi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   pembeliId:
 *                     type: integer
 *                   menuId:
 *                     type: integer
 *                   jumlah:
 *                     type: integer
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Kesalahan server
 */
router.get('/transaksi', authenticateToken, transaksiController.getAllTransaksi);

/**
 * @swagger
 * /transaksi/{id}:
 *   put:
 *     summary: Perbarui transaksi berdasarkan ID
 *     tags: [Transaksi]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pembeliId:
 *                 type: integer
 *                 description: ID pembeli yang membuat transaksi
 *               menuId:
 *                 type: integer
 *                 description: ID menu yang dibeli
 *               jumlah:
 *                 type: integer
 *                 description: Jumlah item yang dibeli
 *     responses:
 *       200:
 *         description: Transaksi berhasil diperbarui
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 pembeliId:
 *                   type: integer
 *                 menuId:
 *                   type: integer
 *                 jumlah:
 *                   type: integer
 *       400:
 *         description: Permintaan tidak valid
 *       404:
 *         description: Transaksi tidak ditemukan
 */
router.put('/transaksi/:id', authenticateToken, transaksiController.updateTransaksi);

/**
 * @swagger
 * /transaksi/{id}:
 *   delete:
 *     summary: Hapus transaksi berdasarkan ID
 *     tags: [Transaksi]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Transaksi berhasil dihapus
 *       404:
 *         description: Transaksi tidak ditemukan
 */
router.delete('/transaksi/:id', authenticateToken, transaksiController.deleteTransaksi);

module.exports = router;