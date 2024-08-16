const { Transaksi, MenuMakanan, Pembeli } = require('../models');
const midtransClient = require('midtrans-client');
const nodemailer = require('nodemailer');

class TransaksiService {
    // Create a new transaksi
    static async createTransaksi({ pembeliId, menuId, jumlah }) {
        try {
            const menu = await MenuMakanan.findByPk(menuId);
            if (!menu) throw new Error('Menu item not found');
            
            const pembeli = await Pembeli.findByPk(pembeliId);
            if (!pembeli) throw new Error('Pembeli not found');

            const totalHarga = menu.harga * jumlah;
            const transaksi = await Transaksi.create({
                pembeliId,
                menuId,
                jumlah,
                totalHarga,
                statusPembayaran: 'pending'
            });

            // Konfigurasi Midtrans Client
            const snap = new midtransClient.Snap({
                isProduction: false,
                serverKey: 'SB-Mid-server-dZmgryP9BGzDYfrJYo6I_uBF', // Replace with your server key
                clientKey: 'SB-Mid-client-Nn0htVUW17Ebbeqz'  // Replace with your client key
            });

            // Buat transaksi pembayaran di Midtrans
            const paymentParams = {
                transaction_details: {
                    order_id: transaksi.id, // Gunakan ID transaksi sebagai order_id
                    gross_amount: totalHarga
                },
                customer_details: {
                    first_name: pembeli.nama, // Mengambil nama dari database
                    email: pembeli.email      // Mengambil email dari database
                },
                item_details: [{
                    id: menuId,
                    price: menu.harga,
                    quantity: jumlah,
                    name: menu.nama
                }]
            };

            const snapResponse = await snap.createTransaction(paymentParams);

            // Panggil fungsi untuk mengirim email setelah transaksi dibuat
            await this.sendPaymentEmail({
                pembeliEmail: pembeli.email,
                pembeliNama: pembeli.nama,
                orderId: transaksi.id,
                menuNama: menu.nama,
                totalHarga: transaksi.totalHarga,
                redirect_url: snapResponse.redirect_url
            });

            // Kembalikan transaksi dan Snap URL
            return {
                transaksi: transaksi.toJSON(),
                redirect_url: snapResponse.redirect_url
            };
        } catch (error) {
            throw error;
        }
    }

    // Fungsi untuk mengirim email pembayaran
    static async sendPaymentEmail({ pembeliEmail, pembeliNama, orderId, menuNama, totalHarga, redirect_url }) {
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Gunakan provider email yang kamu gunakan
            auth: {
                user: 'viananto1234@gmail.com', // Ganti dengan emailmu
                pass: 'ulxtxyqvdkfwgcgj'   // Ganti dengan password emailmu
            }
        });

        const mailOptions = {
            from: 'viananto1234@gmail.com',
            to: pembeliEmail,
            subject: 'Pembayaran Pesanan Anda',
            html: `
                <h1>Halo, ${pembeliNama}</h1>
                <p>Terima kasih telah melakukan pemesanan. Berikut adalah detail pesanan Anda:</p>
                <ul>
                    <li><strong>Order ID:</strong> ${orderId}</li>
                    <li><strong>Nama Menu:</strong> ${menuNama}</li>
                    <li><strong>Total Harga:</strong> Rp ${totalHarga}</li>
                </ul>
                <p>Silakan lakukan pembayaran melalui link berikut:</p>
                <a href="${redirect_url}">Bayar Sekarang</a>
            `
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log('Email berhasil dikirim ke ' + pembeliEmail);
        } catch (error) {
            console.error('Gagal mengirim email:', error);
        }
    }

    // Get all transactions
    static async getAllTransaksi() {
        try {
            return await Transaksi.findAll();
        } catch (error) {
            throw error;
        }
    }

    // Get transactions by Pembeli ID
    static async getAllTransaksiByPembeliId(pembeliId) {
        try {
            return await Transaksi.findAll({ where: { pembeliId } });
        } catch (error) {
            throw error;
        }
    }

    // Get transaction by ID
    static async getTransaksiById(id) {
        try {
            return await Transaksi.findByPk(id);
        } catch (error) {
            throw error;
        }
    }

    // Update transaction
    static async updateTransaksi(id, data) {
        try {
            const transaksi = await Transaksi.findByPk(id);
            if (!transaksi) {
                throw new Error('Transaction not found');
            }
            const menu = await MenuMakanan.findByPk(data.menuId);
            const totalHarga = menu ? menu.harga * data.jumlah : transaksi.totalHarga;
            await transaksi.update({ ...data, totalHarga });
            return transaksi.toJSON();
        } catch (error) {
            throw error;
        }
    }

    // Delete transaction
    static async deleteTransaksi(id) {
        try {
            const transaksi = await Transaksi.findByPk(id);
            if (!transaksi) {
                throw new Error('Transaction not found');
            }
            await transaksi.destroy();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = TransaksiService;
