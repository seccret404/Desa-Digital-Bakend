const db = require('../config/database');

class Dusun {
     constructor(nama_ketua, nama_dusun, createdAt = new Date(), updatedAt = new Date()) {
          this.nama_ketua = nama_ketua;
          this.nama_dusun = nama_dusun;
          this.createdAt = createdAt;
          this.updatedAt = updatedAt;

     }

     static findAll(result) {
          db.query("SELECT * FROM dusuns", (err, res) => {
               if (err) {
                    result(err, null);
                    return;
               }
               result(null, res);
          });
     }

     static create(newDusun, result) {
          db.query("INSERT INTO dusuns SET ?", newDusun, (err, res) => {
               if (err) {
                    result(err, null);
                    return;
               }
               result(null, { id: res.insertId, ...newDusun });
          });
     }
     static updateById(id, dusun, result) {
          db.query(
               "UPDATE dusuns SET nama_ketua = ?, nama_dusun = ? WHERE id = ?",
               [dusun.nama_ketua, dusun.nama_dusun, id],
               (err, res) => {
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

                    console.log("updated dusun: ", { id: id, ...dusun });
                    result(null, { id: id, ...dusun });
               }
          );
     }

     static findById(id, result) {
          db.query(`SELECT * FROM dusuns WHERE id = ${id}`, (err, res) => {
               if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
               }

               if (res.length) {
                    console.log("found dusun: ", res[0]);
                    result(null, res[0]);
                    return;
               }

               // Tidak ditemukan Dusun dengan ID tersebut
               result({ kind: "not_found" }, null);
          });
     }
     static remove(id, result) {
          db.query("DELETE FROM dusuns WHERE id = ?", id, (err, res) => {
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
  
              console.log("deleted dusun with id: ", id);
              result(null, res);
          });
      }
}

module.exports = Dusun;
