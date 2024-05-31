const db = require('../config/database');

class Penerima{
     constructor(id_penduduk,id_bantuan,nama_penerima,jenis_bantuan,nama_bantuan,tgl_terima,jumlah_terima,status_bantuan,bentuk_terima,createdAt, updatedAt){
          this.id_penduduk = id_penduduk,
          this.id_bantuan = id_bantuan,
          this.nama_penerima = nama_penerima,
          this.jenis_bantuan = jenis_bantuan,
          this.nama_bantuan = nama_bantuan,
          this.tgl_terima = tgl_terima,
          this.jumlah_terima = jumlah_terima,
          this.status_bantuan = status_bantuan,
          this.bentuk_terima = bentuk_terima,
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

     static async findById(id) {
          try {
              const query = "SELECT * FROM penerima_bantuans WHERE id = ?";
              const [rows] = await db.promise().query(query, [id]);
              if (rows.length === 0) {
                  throw new Error('Penduduk not found');
              }
              return rows[0];
          } catch (error) {
              throw new Error('Failed to retrieve penduduk: ' + error.message);
          }
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

     static update(id, penerima, result) {
          db.query(
              "UPDATE penerima_bantuans SET id_penduduk = ?, id_bantuan = ?, nama_penerima = ?, jenis_bantuan = ?, nama_bantuan = ?, tgl_terima = ?, jumlah_terima = ?, status_bantuan = ?, bentuk_terima = ? WHERE id = ?",
              [penerima.id_penduduk, penerima.id_bantuan, penerima.nama_penerima, penerima.jenis_bantuan, penerima.nama_bantuan, penerima.tgl_terima, penerima.jumlah_terima, penerima.status_bantuan, penerima.bentuk_terima, id],
              (err, res) => {
                  if (err) {
                      console.error('Error updating record:', err);
                      result(err, null);
                      return;
                  }
                  if (res.affectedRows == 0) {
                      result({ message: "Penerima Tidak Ditemukan" }, null);
                      return;
                  }
                  result(null, { id: id, ...penerima });
              }
          );
      }
      
}

module.exports = Penerima;