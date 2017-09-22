const express = require('express')
const mysql = require('../database/mysql');
const router = express.Router()

router.route('/youjiList').post(function (req, res) {
    let sql =  `select * from youji`;
    
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
         res.send(data);
       })
     })
})
router.route('/youjiContent/:id').get(function (req, res) {
    //console.log(req.params)
    let id = req.params.id;
    let sql =  `select * from youji where id = ?`;
    param = [id];
    mysql.pool.getConnection(function (error, connection) {
       if (error) {
         console.log({message: '连接数据库失败'})
         return
       }
       connection.query({
         sql: sql,
         values: param
       }, function (error, data) {
         connection.release()
         if (error) {
           console.log({messsage: 'ERROR'})
           return
         }
         //console.log(data)
         res.send(data);
       })
     })
})



module.exports = router