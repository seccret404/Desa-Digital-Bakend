const db = require('../config/database');

class Berita {
     constructor(judul_berita, isi_berita, cover, file, tgl_publikasi = new Date()) {
          this.judul_berita = judul_berita;
          this.isi_berita = isi_berita;
          this.cover = cover;
          this.file = file;
          this.tgl_publikasi = tgl_publikasi;
     }

     static findAll(result) {
          db.query("SELECT * FROM berita", (err, res) => {
               if (err) {
                    result(err, null);
                    return;
               }
               result(null, res);
          });
     }

     static findById(id, result) {
          db.query("SELECT * FROM berita WHERE id = ?", id, (err, res) => {
              if (err) {
                  result(err, null);
                  return;
              }
              if (res.length) {
                  result(null, res[0]);
                  return;
              }
              // Not found Berita with the id
              result({ kind: "not_found" }, null);
          });
      }

     static create(newBerita, result) {
          console.log("Data yang dikirim:", newBerita);
          db.query("INSERT INTO berita SET ?", newBerita, (err, res) => {
               if (err) {
                    result(err, null);
                    return;
               }
               result(null, { id: res.insertId, ...newBerita });
          });
     }

     static update(id, berita, result) {
          db.query(
               "UPDATE berita SET judul_berita = ?, isi_berita = ?, cover = ?, file = ?, tgl_publikasi = ? WHERE id = ?",
               [berita.judul_berita, berita.isi_berita, berita.cover, berita.file, berita.tgl_publikasi, id],
               (err, res) => {
                    if (err) {
                         result(err, null);
                         return;
                    }

                    if (res.affectedRows == 0) {
                         // Berita tidak ditemukan dengan id yang diberikan
                         result({ kind: "not_found" }, null);
                         return;
                    }

                    console.log("Berita updated: ", { id: id, ...berita });
                    result(null, { id: id, ...berita });
               }
          );
     }

     static remove(id, result) {
          db.query("DELETE FROM berita WHERE id = ?", id, (err, res) => {
              if (err) {
                  console.log("error: ", err);
                  result(null, err);
                  return;
              }
  
              if (res.affectedRows == 0) {
                  // Tidak ada dusun dengan ID tersebut ditemukan
                  result({ kind: "not_found" }, null);
                  return;
              }
  
              console.log("berita dusun with id: ", id);
              result(null, res);
          });
      }
}

module.exports = Berita;
