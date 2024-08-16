const MenuService = require('../services/menuService');
const path = require('path');
const fs = require('fs');

exports.createMenu = async (req, res) => {
    try {
        const { nama, harga, deskripsi, rating } = req.body;
        const foto = req.files ? req.files.foto : null; // Get uploaded file

        if (!foto) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const fotoName = `${nama.replace(/ /g, "_")}.jpg`;
        const fotoPath = path.join(__dirname, '../uploads', fotoName);
        await foto.mv(fotoPath); // Save the file to the 'uploads' directory

        const newMenu = await MenuService.createMenu({ nama, harga, deskripsi, fotoPath: `/uploads/${fotoName}`, rating });
        return res.status(201).json(newMenu);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

exports.getMenuItems = async (req, res) => {
    try {
        const menuItems = await MenuService.getMenuItems();
        return res.status(200).json(menuItems);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.getMenuItemById = async (req, res) => {
    try {
        const menuItem = await MenuService.getMenuItemById(req.params.id);
        if (menuItem) {
            return res.status(200).json(menuItem);
        } else {
            return res.status(404).json({ error: 'Menu item not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.updateMenuItem = async (req, res) => {
    const { id } = req.params;
    const { nama, harga, deskripsi, rating } = req.body;
    const foto = req.files ? req.files.foto : null; // Get uploaded file

    try {
        const menu = await MenuService.getMenuItemById(id);

        if (!menu) {
            return res.status(404).json({ error: 'Menu item not found' });
        }

        menu.nama = nama;
        menu.harga = harga;
        menu.deskripsi = deskripsi;
        menu.rating = rating;

        if (foto) {
            const oldFotoPath = path.join(__dirname, '../uploads', menu.foto.split('/').pop());

            // Remove old image if exists
            if (fs.existsSync(oldFotoPath)) {
                fs.unlinkSync(oldFotoPath);
            }

            // Save new image
            const fotoName = `${nama.replace(/ /g, "_")}.jpg`;
            const fotoPath = path.join(__dirname, '../uploads', fotoName);
            await foto.mv(fotoPath);

            // Update menu with new image path
            menu.foto = `/uploads/${fotoName}`;

            await menu.save();

            return res.status(200).json(menu);
        }

        const updatedMenu = await MenuService.updateMenuItem(id, menu);
        return res.status(200).json(updatedMenu);
    } catch (error) {
        console.error("Error updating menu item:", error);
        return res.status(400).json({ error: error.message });
    }
};


exports.deleteMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const menu = await MenuService.getMenuItemById(id);

        if (!menu) {
            return res.status(404).json({ error: 'Menu item not found' });
        }

        // Simpan nama menu sebelum menghapus
        const menuName = menu.nama;

        const fotoPath = path.join(__dirname, '../uploads', menu.foto.split('/').pop());

        // Remove image file if exists
        if (fs.existsSync(fotoPath)) {
            fs.unlinkSync(fotoPath);
        }

        await MenuService.deleteMenuItem(id);

        // Kirim respons dengan pesan yang mencantumkan nama menu
        return res.status(200).json({ message: `Menu dengan nama "${menuName}" berhasil dihapus` });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

