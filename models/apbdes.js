const db = require('../config/database');

class Anggaran {
    constructor(
        {
            tahun_anggaran = new Date().getFullYear(),
            judul,
            rencana_hasilusaha,
            realisasi_hasilusaha,
            rencana_hasilaset,
            realisasi_hasilaset,
            rencana_swadia,
            realisasi_swadia,
            rencana_danadesa,
            realisasi_danadesa,
            rencana_hasilpajak,
            realisasi_hasilpajak,
            rencana_alokasidana,
            realisasi_alokasidana,
            rencana_bantuankeuangankabupaten,
            realisasi_bantuankeuangankabupaten,
            rencana_bantuankeuanganprovinsi,
            realisasi_bantuankeuanganprovinsi,
            rencana_hibah,
            realisasi_hibah,
            rencana_sumbanganpihakketiga,
            realisasi_sumbanganpihakketiga,
            rencana_pendapatanlain,
            realisasi_pendapatanlain,
            rencana_penyelenggaraanpemerintah,
            realisasi_penyelenggaraanpemerintah,
            rencana_pembangunandesa,
            realisasi_pembangunandesa,
            rencana_pembinaanmasyarakat,
            realisasi_pembinaanmasyarakat,
            rencana_pemerdayaanmasyarakat,
            realisasi_pemerdayaanmasyarakat,
            rencana_belanjatakterduga,
            realisasi_rencanatakterduga,
            rencana_silpa,
            realisasi_silpa,
            rencana_pencairandanacadangan,
            realisasi_pencairandanacadangan,
            rencana_hasilpenjualan,
            realisasi_hasilpenjualan,
            rencana_pembentukandanacadangan,
            realisasi_pembentukandanacadangan,
            rencana_penyertaanmodaldesa,
            realisasi_penyertaanmodaldesa,
            createdAt = new Date(),
            updatedAt= new Date()
        }
    ) {
        this.tahun_anggaran = tahun_anggaran;
        this.judul = judul;
        this.rencana_hasilusaha = rencana_hasilusaha;
        this.realisasi_hasilusaha = realisasi_hasilusaha;
        this.rencana_hasilaset = rencana_hasilaset;
        this.realisasi_hasilaset = realisasi_hasilaset;
        this.rencana_swadia = rencana_swadia;
        this.realisasi_swadia = realisasi_swadia;
        this.rencana_danadesa = rencana_danadesa;
        this.realisasi_danadesa = realisasi_danadesa;
        this.rencana_hasilpajak = rencana_hasilpajak;
        this.realisasi_hasilpajak = realisasi_hasilpajak;
        this.rencana_alokasidana = rencana_alokasidana;
        this.realisasi_alokasidana = realisasi_alokasidana;
        this.rencana_bantuankeuangankabupaten = rencana_bantuankeuangankabupaten;
        this.realisasi_bantuankeuangankabupaten = realisasi_bantuankeuangankabupaten;
        this.rencana_bantuankeuanganprovinsi = rencana_bantuankeuanganprovinsi;
        this.realisasi_bantuankeuanganprovinsi = realisasi_bantuankeuanganprovinsi;
        this.rencana_hibah = rencana_hibah;
        this.realisasi_hibah = realisasi_hibah;
        this.rencana_sumbanganpihakketiga = rencana_sumbanganpihakketiga;
        this.realisasi_sumbanganpihakketiga = realisasi_sumbanganpihakketiga;
        this.rencana_pendapatanlain = rencana_pendapatanlain;
        this.realisasi_pendapatanlain = realisasi_pendapatanlain;
        this.rencana_penyelenggaraanpemerintah = rencana_penyelenggaraanpemerintah;
        this.realisasi_penyelenggaraanpemerintah = realisasi_penyelenggaraanpemerintah;
        this.rencana_pembangunandesa = rencana_pembangunandesa;
        this.realisasi_pembangunandesa = realisasi_pembangunandesa;
        this.rencana_pembinaanmasyarakat = rencana_pembinaanmasyarakat;
        this.realisasi_pembinaanmasyarakat = realisasi_pembinaanmasyarakat;
        this.rencana_pemerdayaanmasyarakat = rencana_pemerdayaanmasyarakat;
        this.realisasi_pemerdayaanmasyarakat = realisasi_pemerdayaanmasyarakat;
        this.rencana_belanjatakterduga = rencana_belanjatakterduga;
        this.realisasi_rencanatakterduga = realisasi_rencanatakterduga;
        this.rencana_silpa = rencana_silpa;
        this.realisasi_silpa = realisasi_silpa;
        this.rencana_pencairandanacadangan = rencana_pencairandanacadangan;
        this.realisasi_pencairandanacadangan = realisasi_pencairandanacadangan;
        this.rencana_hasilpenjualan = rencana_hasilpenjualan;
        this.realisasi_hasilpenjualan = realisasi_hasilpenjualan;
        this.rencana_pembentukandanacadangan = rencana_pembentukandanacadangan;
        this.realisasi_pembentukandanacadangan = realisasi_pembentukandanacadangan;
        this.rencana_penyertaanmodaldesa = rencana_penyertaanmodaldesa;
        this.realisasi_penyertaanmodaldesa = realisasi_penyertaanmodaldesa;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static async findAll() {
        try {
            const query = "SELECT * FROM anggaran_desa";
            const [rows] = await db.promise().query(query);
            return rows;
        } catch (error) {
            throw new Error('Gagal mengambil anggaran: ' + error.message);
          }
      }
  
      static async create(newAnggaran) {
        
          try {
              const query = "INSERT INTO anggaran_desa SET ?";
              const [result] = await db.promise().query(query, newAnggaran);
              return { id: result.insertId, ...newAnggaran };
          } catch (error) {
              throw new Error('Gagal membuat anggaran baru: ' + error.message);
          }
      }
      static async findById(id) {
          try {
              const query = "SELECT * FROM anggaran_desa WHERE id = ?";
              const [rows] = await db.promise().query(query, [id]);
              if (rows.length === 0) {
                  throw new Error('Anggaran not found');
              }
              return rows[0];
          } catch (error) {
              throw new Error('Failed to retrieve anggaran: ' + error.message);
          }
      }

      static async update(id, updatedData) {
          try {
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
                //   'createdAt',
                  'updatedAt'
              ];
      
              // Filter data yang diterima berdasarkan allowedFields
              const filteredData = Object.keys(updatedData)
                  .filter(key => allowedFields.includes(key))
                  .reduce((obj, key) => {
                      obj[key] = updatedData[key];
                      return obj;
                  }, {});
      
              const query = "UPDATE anggaran_desa SET ? WHERE id = ?";
              const [result] = await db.promise().query(query, [filteredData, id]);
              
              if (result.affectedRows === 0) {
                  throw new Error('Anggaran not found or no changes were made');
              }
              
              return { id: id, ...filteredData };
          } catch (error) {
              throw new Error('Failed to update anggaran: ' + error.message);
          }
      }
      
  }
  
  module.exports = Anggaran;
  
