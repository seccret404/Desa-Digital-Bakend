const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
     const Penduduk = sequelize.define("Penduduk", {
          nik: {
               type: DataTypes.INTEGER,
          },
          nama: {
               type: DataTypes.STRING
          },
          tanggal_lahir: {
               type: DataTypes.DATE
          },
          tempat_lahir: {
               type: DataTypes.STRING
          },
          agama: {
               type: DataTypes.STRING
          },
          jenis_kelamin: {
               type: DataTypes.STRING
          },
          alamat: {
               type: DataTypes.STRING
          },
          pekerjaan: {
               type: DataTypes.STRING
          },
          status_hidup: {
               type: DataTypes.STRING
          },
          kewarganegaraan: {
               type: DataTypes.STRING
          },
          status_perkawinan: {
               type: DataTypes.STRING
          },
          no_kk: {
               type: DataTypes.INTEGER
          },
          pendidikan_terakhir: {
               type: DataTypes.STRING
          },
          id_dusun:{
               type: DataTypes.INTEGER
          }
     });

     return Penduduk;
};
