const db = require('../config/database');

class Penerima{
     constructor(id_penduduk,id_bantuan,nama_penerima,jenis_bantuan,nama_bantuan,tgl_terima,jumlah_terima,status_bantuan,createdAt, updatedAt){
          this.id_penduduk = id_penduduk,
          this.id_bantuan = id_bantuan,
          this.nama_penerima = nama_penerima,
          this.jenis_bantuan = jenis_bantuan,
          this.nama_bantuan = nama_bantuan,
          this.tgl_terima = tgl_terima,
          this.jumlah_terima = jumlah_terima,
          this.status_bantuan = status_bantuan,
          this.createdAt = new Date(),
          this.updatedAt = new Date()
     }
     
     static findAll(result){
          db.query("SELECT * FROM penerima_bantuans ", (err,res)=>{
               if(err){
                    result(err,null);
                    return;
               }
               result(null,res)
          });
     }

     static findById(id,result){
          db.query(`SELECT * FROM penerima_bantuans WHERE id = ${id}`, (err, res) =>{
               if(err){
                    result(err,null);
                    return;
               }
               if(res.length){
                    result(null, res[0]);
                    return;
               }
               result({ message: "Penerima Tidak DItemukan"}, null);
          });
     }

     static create(newPenerima, result){
          db.query("INSERT INTO penerima_bantuans SET ?", newPenerima,(err,res) =>{
               if(err){
                    result(err,null);
                    return;
               }
               result(null, {id: res.insertId, ...newPenerima});
          })
     }

     static update(id, penerima, result){
          db.query(
               "UPDATE penerima_bantuans SET id_penerima = ? id_bantuan = ?, nama_penerima = ?, jenis_bantuan = ?, nama_bantuan = ?, tgl_terima = ?, jumlah_terima = ?, status_bantuan = ? WHERE id = ?",
               [penerima.id_penerima, penerima.id_bantuan, penerima.nama_penerima,penerima.jenis_bantuan, penerima.nama_bantuan,penerima.tgl_terima, penerima.jumlah_terima, id],
               (err, res) =>{
                    if(err){
                         result(err, null);
                         return;
                    }
                    if(res.affectedRows == 0){
                         result({message: "Penerima Tidak Ditemukan"}, null);
                         return;
                    }
                    result(null, {id: id, ...penerima});
               }
               
          
          )
          
     }
}

module.exports = Penerima;