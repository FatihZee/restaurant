const { MenuMakanan } = require('../models');

class MenuService {
    static async createMenu({ nama, harga, deskripsi, fotoPath, rating }) {
        try {
            const newMenu = await MenuMakanan.create({
                nama,
                harga,
                deskripsi,
                foto: fotoPath,
                rating
            });
            return newMenu.toJSON();
        } catch (error) {
            throw error;
        }
    }

    static async getMenuItems() {
        try {
            return await MenuMakanan.findAll();
        } catch (error) {
            throw error;
        }
    }

    static async getMenuItemById(id) {
        try {
            return await MenuMakanan.findByPk(id);
        } catch (error) {
            throw error;
        }
    }

    static async updateMenuItem(id, data) {
        try {
            const menuItem = await MenuMakanan.findByPk(id);
            if (!menuItem) {
                throw new Error('Menu item not found');
            }
            await menuItem.update(data);
            return menuItem.toJSON();
        } catch (error) {
            throw error;
        }
    }

    static async deleteMenuItem(id) {
        try {
            const menuItem = await MenuMakanan.findByPk(id);
            if (!menuItem) {
                throw new Error('Menu item not found');
            }
            await menuItem.destroy();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = MenuService;
