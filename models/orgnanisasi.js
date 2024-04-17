const db = require('../config/database');

class Organisasi{
     constructor(nama_lembaga,singkatan,alamat_organisasi,tahun_berdiri,ketua,wakil_ketua,sekretaris,bendahara,logo,jumlah_anggota, createdAt = new Date()){
          this.nama_lembaga = nama_lembaga,
          this.singkatan = singkatan,
          this.alamat_organisasi = alamat_organisasi,
          this.tahun_berdiri = tahun_berdiri,
          this.ketua =ketua,
          this. wakil_ketua =wakil_ketua,
          this.sekretaris = sekretaris,
          this.bendahara = bendahara,
          this.logo =logo,
          this.jumlah_anggota = jumlah_anggota,
          this.createdAt = createdAt
     }

     static findAll(result) {
          db.query("SELECT * FROM organisasi", (err, res) => {
               if (err) {
                    result(err, null);
                    return;
               }
               result(null, res);
          });
     }

     static create(newOrganisasi, result) {
          db.query("INSERT INTO organisasi SET ?", newOrganisasi, (err, res) => {
               if (err) {
                    result(err, null);
                    return;
               }
               result(null, { id: res.insertId, ...newOrganisasi });
          });
     }
}

module.exports = Organisasi;