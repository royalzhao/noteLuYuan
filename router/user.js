const express = require('express')
const mysql = require('../database/mysql');
const router = express.Router()

router.route('/login').post(function (req, res) {
    //console.log(req.body)
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
          // console.log(data[0].id)
          res.cookie('username',req.body.username);
          res.cookie('password',data[0].password);
          res.cookie('id',data[0].id);
          res.send({'message':'ok'});
         }else{
          res.send({'message':'error'});
         }
         
       })
     })
})

router.route('/isUsername').get(function (req, res) {
    if(req.cookies.username){
      res.send({'username':req.cookies.username})
    }
})
router.route('/delUsername').get(function (req, res) {
    if(req.cookies.username){
      res.clearCookie('username');
      res.send({'message':'ok'})
    }else{
      res.send({'message':'error'})
    }
})

router.route('/register').post(function (req, res) {
  //console.log(req.body)
  let sql =  `insert into user(account,password,email) values (?,?,?)`;
  param = [req.body.username,req.body.password,req.body.email]
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
        res.send({'message':'ok'});
     })
   })
})

router.route('/info_setting').get(function (req, res) {
  //console.log(req.cookies.username)
  let sql =  `select * from user where account=?`;
  param = [req.cookies.username]
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
        res.send(data);
       }
       
     })
   })
})

router.route('/update_info_setting').post(function (req, res) {
  console.log(req.cookies.id)
  let sql =  `update user set spaceName=?,spaceInfo=? where id=?`;
  param = [req.body.infoName,req.body.infoText,req.cookies.id]
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
       res.send({message:'ok'});
       
     })
   })
})
router.route('/update_password_setting').post(function (req, res) {
  console.log(req.body)
  let sql =  `update user set password=? where id=?`;
  param = [req.body.password,req.cookies.id]
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
       res.send({message:'ok'});
       
     })
   })
})

router.route('/isExist').post(function (req, res) {
  console.log(req.body)
  console.log(req.cookies.password)
  if(req.cookies.password == req.body.oldPassword){
      console.log('ok')
      res.send({'message':'ok'})
  }else{
      res.send({'message':'error'})
  }
 
})


module.exports = router