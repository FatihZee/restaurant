const { Pembeli } = require('../models');
const { hashPassword } = require('../helpers/bcrypt');

class PembeliService {
    async createPembeli({ nama, email, password, telepon }) {
        try {
            const hashedPassword = await hashPassword(password);
            const pembeli = await Pembeli.create({ nama, email, password: hashedPassword, telepon });
            return pembeli;
        } catch (error) {
            throw new Error('Failed to create Pembeli');
        }
    }

    async getPembeliById(id) {
        try {
            const pembeli = await Pembeli.findByPk(id);
            if (!pembeli) {
                throw new Error('Pembeli not found');
            }
            return pembeli;
        } catch (error) {
            throw new Error('Failed to retrieve Pembeli');
        }
    }

    async getAllPembelis() {
        try {
            const pembelis = await Pembeli.findAll();
            return pembelis;
        } catch (error) {
            throw new Error('Failed to retrieve Pembelis');
        }
    }

    async updatePembeli(id, { nama, email, password, telepon }) {
        try {
            const pembeli = await Pembeli.findByPk(id);
            if (!pembeli) {
                throw new Error('Pembeli not found');
            }
            const hashedPassword = password ? await hashPassword(password) : pembeli.password;
            await pembeli.update({ nama, email, password: hashedPassword, telepon });
            return pembeli;
        } catch (error) {
            throw new Error('Failed to update Pembeli');
        }
    }

    async deletePembeli(id) {
        try {
            const pembeli = await Pembeli.findByPk(id);
            if (!pembeli) {
                throw new Error('Pembeli not found');
            }
            await pembeli.destroy();
            return { message: 'Pembeli deleted successfully' };
        } catch (error) {
            throw new Error('Failed to delete Pembeli');
        }
    }
}

module.exports = new PembeliService();
