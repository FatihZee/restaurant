const express = require('express');
const MenuController = require('../controllers/menuController');

const router = express.Router();

/**
 * @swagger
 * /menu:
 *   post:
 *     summary: Tambah item menu baru
 *     description: Menambahkan item menu baru ke dalam daftar menu. Mengharuskan file gambar untuk diupload.
 *     tags:
 *       - Menu
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nama:
 *                 type: string
 *                 description: Nama item menu
 *               harga:
 *                 type: number
 *                 format: float
 *                 description: Harga item menu
 *               deskripsi:
 *                 type: string
 *                 description: Deskripsi item menu
 *               rating:
 *                 type: number
 *                 format: float
 *                 description: Rating item menu
 *               foto:
 *                 type: string
 *                 format: binary
 *                 description: Gambar item menu (upload file gambar)
 *             required:
 *               - nama
 *               - harga
 *               - foto
 *     responses:
 *       201:
 *         description: Item menu berhasil ditambahkan.
 *       400:
 *         description: Permintaan tidak valid, data input tidak valid.
 */
router.post('/menu', MenuController.createMenu);

/**
 * @swagger
 * /menu:
 *   get:
 *     summary: Dapatkan semua item menu
 *     description: Mengambil daftar semua item menu.
 *     tags:
 *       - Menu
 *     responses:
 *       200:
 *         description: Daftar item menu.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID item menu
 *                   nama:
 *                     type: string
 *                     description: Nama item menu
 *                   harga:
 *                     type: number
 *                     format: float
 *                     description: Harga item menu
 *                   deskripsi:
 *                     type: string
 *                     description: Deskripsi item menu
 *                   rating:
 *                     type: number
 *                     format: float
 *                     description: Rating item menu
 *                   foto:
 *                     type: string
 *                     description: URL gambar item menu
 */
router.get('/menu', MenuController.getMenuItems);

/**
 * @swagger
 * /menu/{id}:
 *   get:
 *     summary: Dapatkan item menu berdasarkan ID
 *     description: Mengambil satu item menu berdasarkan ID-nya.
 *     tags:
 *       - Menu
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID item menu yang akan diambil.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Satu item menu.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID item menu
 *                 nama:
 *                   type: string
 *                   description: Nama item menu
 *                 harga:
 *                   type: number
 *                   format: float
 *                   description: Harga item menu
 *                 deskripsi:
 *                   type: string
 *                   description: Deskripsi item menu
 *                 rating:
 *                   type: number
 *                   format: float
 *                   description: Rating item menu
 *                 foto:
 *                   type: string
 *                   description: URL gambar item menu
 *       404:
 *         description: Item menu tidak ditemukan.
 */
router.get('/menu/:id', MenuController.getMenuItemById);

/**
 * @swagger
 * /menu/{id}:
 *   put:
 *     summary: Perbarui item menu
 *     description: Memperbarui item menu yang sudah ada. Mengharuskan file gambar untuk diupload jika ingin mengganti gambar.
 *     tags:
 *       - Menu
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID item menu yang akan diperbarui.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nama:
 *                 type: string
 *                 description: Nama item menu
 *               harga:
 *                 type: number
 *                 format: float
 *                 description: Harga item menu
 *               deskripsi:
 *                 type: string
 *                 description: Deskripsi item menu
 *               rating:
 *                 type: number
 *                 format: float
 *                 description: Rating item menu
 *               foto:
 *                 type: string
 *                 format: binary
 *                 description: Gambar item menu (upload file gambar)
 *     responses:
 *       200:
 *         description: Item menu berhasil diperbarui.
 *       400:
 *         description: Permintaan tidak valid, data input tidak valid.
 *       404:
 *         description: Item menu tidak ditemukan.
 */
router.put('/menu/:id', MenuController.updateMenuItem);

/**
 * @swagger
 * /menu/{id}:
 *   delete:
 *     summary: Hapus item menu
 *     description: Menghapus item menu dari daftar berdasarkan ID.
 *     tags:
 *       - Menu
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID item menu yang akan dihapus.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item menu berhasil dihapus.
 *       404:
 *         description: Item menu tidak ditemukan.
 */
router.delete('/menu/:id', MenuController.deleteMenuItem);

module.exports = router;
