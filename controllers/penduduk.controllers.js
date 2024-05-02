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

exports.findById = async (req, res) => {
    const id = req.params.id;

    try {
        const penduduk = await Penduduk.findById(id);
        res.send(penduduk);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Terjadi kesalahan saat mengambil data penduduk."
        });
    }
};
exports.update = async (req, res) => {
    const id = req.params.id;

    // Pastikan ada data yang dikirimkan untuk diperbarui
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    try {
        // Ambil data yang akan diperbarui berdasarkan ID
        const existingPenduduk = await Penduduk.findById(id);
        
        // Jika data tidak ditemukan
        if (!existingPenduduk) {
            res.status(404).send({
                message: `Penduduk with id ${id} not found`
            });
            return;
        }

        // Dapatkan data yang diterima dari body request
        const { nik, nama, agama, alamat, tanggal_lahir, tempat_lahir, jenis_kelamin, pekerjaan, kewarganegaraan, status_hidup, status_perkawinan, pendidikan_terakhir, no_kk, dusun, id_dusun } = req.body;

        // Buat objek yang berisi perubahan
        const updatedData = {
            nik,
            nama,
            agama,
            alamat,
            tanggal_lahir,
            tempat_lahir,
            jenis_kelamin,
            pekerjaan,
            kewarganegaraan,
            status_hidup,
            status_perkawinan,
            pendidikan_terakhir,
            no_kk,
            dusun,
            id_dusun
        };

        // Lakukan update dengan memanggil metode update dari model Penduduk
        const updatedPenduduk = await Penduduk.update(id, updatedData);

        res.send(updatedPenduduk);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while updating the Penduduk."
        });
    }
};
