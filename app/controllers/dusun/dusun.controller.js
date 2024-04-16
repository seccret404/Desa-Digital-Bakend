const db = require("../../models");
const Dusun = db.Dusun;

exports.create = (req, res)=>{
     const {nama_ketua,nama_dusun} = req.body;

     if(!nama_dusun){
          return res.status(400).json({message:"Nama Dusun cannot empty"});
     }

     const newDusun = {
          nama_ketua,
          nama_dusun
     };

     Dusun.create(newDusun)
     .then(data => {
          res.status(201).json(data);
     })
     .catch(err => {
          res.status(500).json({
               message: err.message || "Failed to create data"
          });
     })

}
