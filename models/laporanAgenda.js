const db = require('../config/database');

class LaporanAgenda {
     constructor(id_agenda, jumlah_peserta, lokasi_kegiatan, donasi, tgl_realisasi, anggaran_desa, status_kegiatan, dokumentasi, koordinator,createdAt = new Date(),updatedAt = new Date()) {
         this.id_agenda = id_agenda;
         this.jumlah_peserta = jumlah_peserta;
         this.lokasi_kegiatan = lokasi_kegiatan;
         this.donasi = donasi;
         this.tgl_realisasi = tgl_realisasi;
         this.anggaran_desa = anggaran_desa;
         this.status_kegiatan = status_kegiatan;
         this.dokumentasi = dokumentasi;
         this.koordinator = koordinator;
         this.createdAt = createdAt;
         this.updatedAt = updatedAt;
     }
 
     static create(newLaporan, result) {
          const dokumentasiString = Array.isArray(newLaporan.dokumentasi) ? newLaporan.dokumentasi.join(", ") : newLaporan.dokumentasi;
          const laporanData = { ...newLaporan, dokumentasi: dokumentasiString };
           
          db.query("INSERT INTO laporan_agendas SET ?", laporanData, (err, res) => {
              if (err) {
                  result(err, null);
                  return;
              }
              result(null, { id: res.insertId, ...newLaporan });
          });
      }
      
     
     static findAll(result){
          db.query("SELECT * FROM laporan_agendas", (err, res) =>{
               if(err){
                    result(err,null);
                    return;
               }
               result(null, res)
          })
     }
     
     static findById(id_agenda, result) {
          db.query("SELECT * FROM laporan_agendas WHERE id = ?", id_agenda, (err, res) => {
              if (err) {
                  result(err, null);
                  return;
              }
              if (res.length) {
                  result(null, res[0]);
                  return;
              }
             
              result({ kind: "not_found" }, null);
          });
      }
 }
 
 module.exports = LaporanAgenda;
 