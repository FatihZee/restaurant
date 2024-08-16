const express = require('express');
const router = express.Router();
const PembeliController = require('../controllers/pembeliController');

/**
 * @swagger
 * /pembeli:
 *   post:
 *     summary: Buat pembeli baru
 *     description: Menambahkan pembeli baru ke dalam database.
 *     tags:
 *       - Pembeli
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama:
 *                 type: string
 *                 description: Nama lengkap pembeli
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Alamat email pembeli
 *               password:
 *                 type: string
 *                 description: Kata sandi pembeli
 *               telepon:
 *                 type: string
 *                 description: Nomor telepon pembeli
 *             required:
 *               - nama
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: Pembeli berhasil dibuat.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nama:
 *                   type: string
 *                 email:
 *                   type: string
 *                   format: email
 *                 telepon:
 *                   type: string
 *       400:
 *         description: Permintaan tidak valid, data input tidak sesuai.
 */
router.post('/pembeli', PembeliController.createPembeli);

/**
 * @swagger
 * /pembeli:
 *   get:
 *     summary: Dapatkan semua pembeli
 *     description: Mengambil daftar semua pembeli.
 *     tags:
 *       - Pembeli
 *     responses:
 *       200:
 *         description: Daftar pembeli.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nama:
 *                     type: string
 *                   email:
 *                     type: string
 *                     format: email
 *                   telepon:
 *                     type: string
 */
router.get('/pembeli', PembeliController.getAllPembelis);

/**
 * @swagger
 * /pembeli/{id}:
 *   get:
 *     summary: Dapatkan pembeli berdasarkan ID
 *     description: Mengambil satu pembeli berdasarkan ID-nya.
 *     tags:
 *       - Pembeli
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID pembeli yang akan diambil.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Satu pembeli.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nama:
 *                   type: string
 *                 email:
 *                   type: string
 *                   format: email
 *                 telepon:
 *                   type: string
 *       404:
 *         description: Pembeli tidak ditemukan.
 */
router.get('/pembeli/:id', PembeliController.getPembeliById);

/**
 * @swagger
 * /pembeli/{id}:
 *   put:
 *     summary: Perbarui pembeli
 *     description: Memperbarui pembeli yang sudah ada.
 *     tags:
 *       - Pembeli
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID pembeli yang akan diperbarui.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama:
 *                 type: string
 *                 description: Nama lengkap pembeli
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Alamat email pembeli
 *               telepon:
 *                 type: string
 *                 description: Nomor telepon pembeli
 *     responses:
 *       200:
 *         description: Pembeli berhasil diperbarui.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nama:
 *                   type: string
 *                 email:
 *                   type: string
 *                   format: email
 *                 telepon:
 *                   type: string
 *       400:
 *         description: Permintaan tidak valid, data input tidak sesuai.
 *       404:
 *         description: Pembeli tidak ditemukan.
 */
router.put('/pembeli/:id', PembeliController.updatePembeli);

/**
 * @swagger
 * /pembeli/{id}:
 *   delete:
 *     summary: Hapus pembeli
 *     description: Menghapus pembeli dari database berdasarkan ID-nya.
 *     tags:
 *       - Pembeli
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID pembeli yang akan dihapus.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pembeli berhasil dihapus.
 *       404:
 *         description: Pembeli tidak ditemukan.
 */
router.delete('/pembeli/:id', PembeliController.deletePembeli);

module.exports = router;
