const Penduduk = require("../models/penduduk");

exports.findAll = async (req, res) => {
    try {
        const penduduk = await Penduduk.findAll();
        res.send(penduduk);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Terjadi kesalahan saat mengambil data penduduk."
        });
    }
};

exports.create = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const { nik, nama, agama, alamat, tanggal_lahir, tempat_lahir, jenis_kelamin, pekerjaan, kewarganegaraan, status_hidup, status_perkawinan, pendidikan_terakhir, no_kk, dusun, id_dusun } = req.body;

    const newPenduduk = new Penduduk(nik, nama, agama, alamat, tanggal_lahir, tempat_lahir, jenis_kelamin, pekerjaan, kewarganegaraan, status_hidup, status_perkawinan, pendidikan_terakhir, no_kk, dusun, id_dusun);

    try {
        const penduduk = await Penduduk.create(newPenduduk);
        res.send(penduduk);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while creating the Penduduk."
        });
    }
};
