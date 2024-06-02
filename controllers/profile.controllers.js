const Profil = require('../models/profildesa');

exports.findAllProfile = (req, res) => {
    Profil.findAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Terjadi kesalahan dalam mengambil data"
            });
        } else {
            res.send(data);
        }
    });
};

exports.createProfile = (req, res) => {
    const newProfile = new Profil(
        req.body.nama_desa,
        req.body.alamat_kantor,
        req.body.kecamatan,
        req.body.kabupaten,
        req.body.provinsi,
        req.body.profil_singkat,
        req.body.gambar_desa,
        req.body.batas_barat,
        req.body.batas_timur,
        req.body.batas_utara,
        req.body.batas_selatan,
        req.body.visi_desa,
        req.body.misi_desa,
        req.body.sejarah_desa
    );

    Profil.create(newProfile, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Gagal membuat data profil"
            });
        } else {
            res.send(data);
        }
    });
};

exports.findById = async (req, res) => {
    const id = req.params.id;

    try {
        const prpfil = await Profil.findById(id);
        res.send(prpfil);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Terjadi kesalahan saat mengambil data profil."
        });
    }
};

exports.editProfil = (req, res) => {
    const id = req.params.id;

    if (!req.body) {
        return res.status(400).send({
            message: "Data to update cannot be empty!"
        });
    }

    const profil = new Profil(
        req.body.nama_desa,
        req.body.alamat_kantor,
        req.body.kecamatan,
        req.body.kabupaten,
        req.body.provinsi,
        req.body.profil_singkat,
        req.body.gambar_desa,
        req.body.batas_barat,
        req.body.batas_timur,
        req.body.batas_utara,
        req.body.batas_selatan,
        req.body.visi_desa,
        req.body.misi_desa,
        req.body.sejarah_desa
    );

    Profil.update(id, profil, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Profile dengan id ${id} tidak ditemukan.`
                });
            } else {
                res.status(500).send({
                    message: `Error updating profile with id ${id}`
                });
            }
        } else {
            res.send(data);
        }
    });
};
