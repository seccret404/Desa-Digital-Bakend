const { DataTypes } = require("sequelize");
const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) =>{
     const Dusun = sequelize.define("Dusun",{
          id_dusun:{
               type: DataTypes.INTEGER
          },
          nama_ketua:{
               type: DataTypes.STRING
          },
          nama_dusun:{
               type: DataTypes.STRING
          },
     })

     return Dusun;
}