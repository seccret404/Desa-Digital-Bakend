const Berita = require('../models/berita');

exports.findAllBerita = (req, res) => {
    Berita.findAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Terjadi kesalahan saat mengambil data berita."
            });
        } else {
            res.send(data);
        }
    });
};
exports.createBerita = (req, res) => {
    console.log("Data yang diterima:", req.body);
    console.log("Data yang dikirim:", req.files);

    if (!req.body.judul_berita || !req.body.isi_berita || !req.files['cover'] || !req.files['file']) {
        res.status(400).send({
            message: "Judul berita, isi berita, cover, dan file diperlukan."
        });
        return;
    }

    const newBerita = new Berita(
        req.body.judul_berita,
        req.body.isi_berita,
        req.files['cover'][0].filename,
        req.files['file'][0].filename
    );

    Berita.create(newBerita, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Berita."
            });
        } else {
            res.send(data);
        }
    });
};
exports.findBeritaById = (req, res) => {
    Berita.findById(req.params.id, (err, data) => { 
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Berita dengan id ${req.params.id} tidak ditemukan.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving Berita with id ${req.params.id}`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.editBerita = (req, res) => {
    console.log("Data yang diterima untuk diedit:", req.body);
    console.log("Data yang dikirim:", req.files);

    if (!req.body.judul_berita || !req.body.isi_berita) {
        res.status(400).send({
            message: "Judul berita dan isi berita diperlukan."
        });
        return;
    }
    const { cover, file } = req.files || {};

    const updatedBerita = new Berita(
        req.body.judul_berita,
        req.body.isi_berita,
        req.files && req.files['cover'] ? req.files['cover'][0].filename : null,
        req.files && req.files['file'] ? req.files['file'][0].filename : null
    );

    Berita.update(req.params.id, updatedBerita, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Berita dengan id ${req.params.id} tidak ditemukan.`
                });
            } else {
                res.status(500).send({
                    message: `Error updating Berita with id ${req.params.id}`
                });
            }
        } else {
            res.send(data);
        }
    });
};

