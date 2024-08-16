const PembeliService = require('../services/pembeliService');

exports.createPembeli = async (req, res) => {
    try {
        const pembeli = await PembeliService.createPembeli(req.body);
        return res.status(201).json(pembeli);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.getPembeliById = async (req, res) => {
    try {
        const pembeli = await PembeliService.getPembeliById(req.params.id);
        return res.status(200).json(pembeli);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

exports.getAllPembelis = async (req, res) => {
    try {
        const pembelis = await PembeliService.getAllPembelis();
        return res.status(200).json(pembelis);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.updatePembeli = async (req, res) => {
    try {
        const pembeli = await PembeliService.updatePembeli(req.params.id, req.body);
        return res.status(200).json(pembeli);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.deletePembeli = async (req, res) => {
    try {
        const result = await PembeliService.deletePembeli(req.params.id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
