// routes/authRoutes.js
const express = require('express');
const AuthController = require('../controllers/authController');

const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login Pengguna
 *     description: Mengautentikasi pengguna dan mengembalikan token akses yang valid jika kredensial benar.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Alamat email pengguna
 *               password:
 *                 type: string
 *                 description: Kata sandi pengguna
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login berhasil, mengembalikan token akses yang valid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token akses JWT yang digunakan untuk autentikasi
 *       401:
 *         description: Kredensial yang diberikan tidak valid. Pastikan email dan kata sandi benar.
 *       500:
 *         description: Terjadi kesalahan server saat memproses permintaan.
 */
router.post('/auth/login', AuthController.login);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register Pengguna
 *     description: Mendaftar pengguna baru dan mengembalikan token akses jika pendaftaran berhasil.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama:
 *                 type: string
 *                 description: Nama lengkap pengguna
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Alamat email pengguna
 *               password:
 *                 type: string
 *                 description: Kata sandi pengguna
 *               telepon:
 *                 type: string
 *                 description: Nomor telepon pengguna
 *             required:
 *               - nama
 *               - email
 *               - password
 *               - telepon
 *     responses:
 *       201:
 *         description: Pendaftaran berhasil, mengembalikan token akses yang valid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token akses JWT yang digunakan untuk autentikasi
 *       400:
 *         description: Permintaan tidak valid, data input tidak sesuai.
 *       500:
 *         description: Terjadi kesalahan server saat memproses permintaan.
 */
router.post('/auth/register', AuthController.register);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout Pengguna
 *     description: Mengeluarkan pengguna dari sesi aktif.
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Logout berhasil.
 *       500:
 *         description: Terjadi kesalahan server saat memproses permintaan.
 */
router.post('/auth/logout', AuthController.logout);

module.exports = router;
