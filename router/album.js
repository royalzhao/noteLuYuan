const express = require('express')
const mysql = require('../database/mysql');
const router = express.Router()

router.route('/imgShow').post(function (req, res) {
    let sql =  `select * from images`;
     
    mysql.pool.getConnection(function (error, connection) {
       if (error) {
         console.log({message: '连接数据库失败'})
         return
       }
       connection.query({
         sql: sql,
       }, function (error, data) {
         connection.release()
         if (error) {
           console.log({messsage: 'ERROR'})
           return
         }
         //console.log(data);
         res.send(data);
       })
     })
})



module.exports = router