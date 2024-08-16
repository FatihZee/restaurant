const { Transaksi, MenuMakanan, Pembeli } = require('../models');
const midtransClient = require('midtrans-client');
const nodemailer = require('nodemailer');

// Create Snap instance
const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: 'SB-Mid-server-dZmgryP9BGzDYfrJYo6I_uBF',
    clientKey: 'SB-Mid-client-Nn0htVUW17Ebbeqz'
});

// Konfigurasi transporter untuk Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // Atau layanan email yang Anda pilih
    auth: {
        user: 'viananto1234@gmail.com', // Ganti dengan email pengirim Anda
        pass: 'ulxtxyqvdkfwgcgj' // Ganti dengan password email pengirim Anda
    }
});

class MidtransService {
    static async createTransaction({ transaksiId }) {
        try {
            const transaksi = await Transaksi.findByPk(transaksiId, {
                include: [MenuMakanan]
            });

            if (!transaksi) throw new Error('Transaction not found');

            const transactionDetails = {
                transaction_details: {
                    order_id: transaksi.id,
                    gross_amount: transaksi.totalHarga,
                },
                credit_card: {
                    secure: true
                }
            };

            const snapResponse = await snap.createTransaction(transactionDetails);
            return snapResponse.redirect_url;
        } catch (error) {
            throw new Error(`Midtrans Error: ${error.message}`);
        }
    }

    static async handleNotification(notification) {
        try {
            const { order_id, transaction_status } = notification;

            const transaksi = await Transaksi.findByPk(order_id);
            if (!transaksi) throw new Error('Transaction not found');

            let statusPembayaran;
            switch (transaction_status) {
                case 'capture':
                case 'settlement':
                    statusPembayaran = 'success';
                    break;
                case 'pending':
                    statusPembayaran = 'pending';
                    break;
                case 'deny':
                case 'expire':
                case 'cancel':
                    statusPembayaran = 'failed';
                    break;
                default:
                    statusPembayaran = 'unknown';
            }

            await transaksi.update({ statusPembayaran });

            // Jika pembayaran berhasil, kirim email notifikasi
            if (statusPembayaran === 'success') {
                await this.sendPaymentSuccessEmail(transaksi);
            }

            return transaksi;
        } catch (error) {
            throw error;
        }
    }

    static async sendPaymentSuccessEmail(transaksi) {
        try {
            // Ambil data pembeli
            const pembeli = await Pembeli.findByPk(transaksi.pembeliId);
            if (!pembeli) throw new Error('Buyer not found');

            const mailOptions = {
                from: 'viananto1234@gmail.com',
                to: pembeli.email, // Email penerima
                subject: `Pembayaran Berhasil untuk Pesanan ${transaksi.id}`,
                text: `Hello ${pembeli.nama},\n\nYour payment for order ${transaksi.id} has been successfully processed.\nTotal amount: ${transaksi.totalHarga}\n\nThank you for your purchase!\n\nBest regards,\nYour Company`
            };

            await transporter.sendMail(mailOptions);
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Failed to send email:', error);
        }
    }
}

module.exports = MidtransService;
