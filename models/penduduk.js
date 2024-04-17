const db = require('../config/database');

class Penduduk{
     constructor(nik,nama,agama,alamat,tanggal_lahir,tempat_lahir,jenis_kelamin,pekerjaan,kewarganegaraan,status_hidup,status_perkawinan,pendidikan,no_kk,dusun,id_dusun,createdAt = new Date()){
          this.nik = nik,
          this.nama = nama,
          this.agama = agama,
          this.alamat = alamat,
          this.tanggal_lahir = tanggal_lahir,
          this.tempat_lahir = tempat_lahir,
          this.jenis_kelamin = jenis_kelamin,
          this.pekerjaan = pekerjaan,
          this.kewarganegaraan = kewarganegaraan,
          this.pendidikan = pendidikan,
          this.status_hidup = status_hidup,
          this.status_perkawinan = status_perkawinan,
          this.dusun = dusun,
          this.no_kk = no_kk,
          this.createdAt = createdAt,
          this.id_dusun = id_dusun
     }

     static findAll(result){
          db.query("SELECT * FROM penduduk", (err ,res) =>{
               if(err){
                    result(err,null);
                    return;
               }
               result(null,res);
          });
     }

     static create(newPenduduk,result){
          db.query("INSERT INTO penduduk SET ?", newPenduduk,(err,res) =>{
               if(err){
                    result(err, null);
                    return;
               }
               result(null, {id: res.insertId, ...newPenduduk});
          });
     }
}

module.exports = Penduduk;