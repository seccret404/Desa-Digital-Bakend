const Anggaran = require('../models/apbdes')

exports.findAll = async (req, res) => {
     try {
         const anggaran = await Anggaran.findAll();
         res.send(anggaran);
     } catch (error) {
         res.status(500).send({
             message: error.message || "Terjadi kesalahan saat mengambil data anggaran."
         });
     }
 };
 
 exports.create = async (req, res) => {
     try {
         if (!req.body) {
             return res.status(400).send({
                 message: "Konten tidak boleh kosong!"
             });
         }

         const tahun_anggaran = req.body.tahun_anggaran ? req.body.tahun_anggaran.substring(0, 4) : null;
 
         if (!tahun_anggaran || isNaN(tahun_anggaran)) {
             throw new Error('Format tahun anggaran tidak valid');
         }
 
         const newAnggaran = new Anggaran({
             ...req.body,
             tahun_anggaran: tahun_anggaran
         });
 
         const createdAnggaran = await Anggaran.create(newAnggaran);
         res.send(createdAnggaran);
     } catch (error) {
         res.status(500).send({
             message: error.message || "Terjadi kesalahan saat membuat anggaran."
         });
     }
 };

 exports.findById = async (req, res) => {
     const id = req.params.id;
 
     try {
         const anggaran = await Anggaran.findById(id);
         res.send(anggaran);
     } catch (error) {
         res.status(500).send({
             message: error.message || "Terjadi kesalahan saat mengambil data anggaran."
         });
     }
 };

 exports.update = async (req, res) => {
     try {
         const id = req.params.id;
         const updatedData = req.body;
 
         // Pastikan ada data yang diperbarui
         if (!updatedData || Object.keys(updatedData).length === 0) {
             return res.status(400).send({
                 message: "Data yang diperbarui tidak boleh kosong!"
             });
         }
 
         // Filter data yang diterima berdasarkan allowedFields
         const allowedFields = [
             'judul',
             'tahun_anggaran',
             'rencana_hasilusaha',
             'realisasi_hasilusaha',
             'rencana_hasilaset',
             'realisasi_hasilaset',
             'rencana_swadia',
             'realisasi_swadia',
             'rencana_danadesa',
             'realisasi_danadesa',
             'rencana_hasilpajak',
             'realisasi_hasilpajak',
             'rencana_alokasidana',
             'realisasi_alokasidana',
             'rencana_bantuankeuangankabupaten',
             'realisasi_bantuankeuangankabupaten',
             'rencana_bantuankeuanganprovinsi',
             'realisasi_bantuankeuanganprovinsi',
             'rencana_hibah',
             'realisasi_hibah',
             'rencana_sumbanganpihakketiga',
             'realisasi_sumbanganpihakketiga',
             'rencana_pendapatanlain',
             'realisasi_pendapatanlain',
             'rencana_penyelenggaraanpemerintah',
             'realisasi_penyelenggaraanpemerintah',
             'rencana_pembangunandesa',
             'realisasi_pembangunandesa',
             'rencana_pembinaanmasyarakat',
             'realisasi_pembinaanmasyarakat',
             'rencana_pemerdayaanmasyarakat',
             'realisasi_pemerdayaanmasyarakat',
             'rencana_belanjatakterduga',
             'realisasi_rencanatakterduga',
             'rencana_silpa',
             'realisasi_silpa',
             'rencana_pencairandanacadangan',
             'realisasi_pencairandanacadangan',
             'rencana_hasilpenjualan',
             'realisasi_hasilpenjualan',
             'rencana_pembentukandanacadangan',
             'realisasi_pembentukandanacadangan',
             'rencana_penyertaanmodaldesa',
             'realisasi_penyertaanmodaldesa',
             'createdAt',
             'updatedAt'
             
         ];
 
         const filteredData = Object.keys(updatedData)
             .filter(key => allowedFields.includes(key))
             .reduce((obj, key) => {
                 obj[key] = updatedData[key];
                 return obj;
             }, {});
             
             filteredData.updatedAt = new Date();
         // Panggil fungsi update dari model Anggaran
         const updatedAnggaran = await Anggaran.update(id, filteredData);
         
         res.send(updatedAnggaran);
     } catch (error) {
         res.status(500).send({
             message: error.message || "Terjadi kesalahan saat memperbarui anggaran."
         });
     }
 };
 
 