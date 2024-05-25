const db = require('../config/database')

class Pengumuman {
     constructor(judul_pengumuman, deskripsi_pengumuman,file_pengumuman,cover_pengumuman,tgl_publikasi = new Date(), updatedAt = new Date()){
          this.judul_pengumuman = judul_pengumuman;
          this.deskripsi_pengumuman = deskripsi_pengumuman;
          this.file_pengumuman = file_pengumuman;
          this.cover_pengumuman = cover_pengumuman;
          this.updatedAt = updatedAt;this.tgl_publikasi = tgl_publikasi;
     }

     static findAll(result){
          db.query("SELECT * FROM pengumumans", (err, res)=>{
               if(err){
                    result(err,null);
                    return;
               }
               result(null,res);
          })
     }
     static findById(id,result){
          db.query("SELECT * FROM pengumumans WHERE id = ?", id, (err, res) =>{
               if(err){
                    result(err,null);
                    return;
               }
               if(res.length){
                    result(null,res[0]);
                    return;
               }
               result({kind: "note found"}, null)
          })
     }
     static create(newPengumuman, result){
          console.log("Data : ", newPengumuman);
          db.query("INSERT INTO pengumumans set ?", newPengumuman,(err, res) =>{
               if(err){
                    result(err,null);
                    return;
               }
               result(null,{id: res.insertId, ...newPengumuman});
          })
     }
     static update(id, pengumuman, result) {
          db.query(
               "UPDATE pengumumans SET judul_pengumuman = ?, deskripsi_pengumuman = ?, tgl_publikasi = ?, file_pengumuman = ?, cover_pengumuman = ? WHERE id = ?",
               [pengumuman.judul_pengumuman, pengumuman.deskripsi_pengumuman, pengumuman.tgl_publikasi, pengumuman.file_pengumuman, pengumuman.cover_pengumuman, id],
               (err, res) => {
                    if (err) {
                         result(err, null);
                         return;
                    }

                    if (res.affectedRows == 0) {
                         result({ kind: "not_found" }, null);
                         return;
                    }

                    console.log("Pengumuman updated: ", { id: id, ...pengumuman });
                    result(null, { id: id, ...pengumuman });
               }
          );
     }
     static remove(id, result) {
          db.query("DELETE FROM pengumumans WHERE id = ?", id, (err, res) => {
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
  
              console.log("pengumumans dusun with id: ", id);
              result(null, res);
          });
      }

}


module.exports = Pengumuman;