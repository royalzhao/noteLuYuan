const express = require('express')
const mysql = require('../database/mysql');
const router = express.Router()

router.route('/login').post(function (req, res) {
    console.log(req.body)
    let sql =  `select * from user where account=? and password =?`;
    param = [req.body.username,req.body.password]
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
         if(data.length>0){
          res.send({'message':'ok'});
         }else{
          res.send({'message':'error'});
         }
         
       })
     })
})



module.exports = router