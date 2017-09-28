const express = require('express')
const mysql = require('../database/mysql');
const multiparty = require('multiparty');

const fs = require('fs');

const router = express.Router()

router.route('/imgList').post(function (req, res) {
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


router.post('/uploadImg', function (req, res,next) {

  //生成multiparty对象，并配置上传目标路径
  var form = new multiparty.Form({
  uploadDir: './public/uploads/',
  /*设置文件保存路径 */
  encoding: 'utf-8',
  /*编码设置 */
  maxFilesSize: 20000 * 1024 * 1024,
  /*设置文件最大值 20MB */
  keepExtensions: true,
  /*保留后缀*/
  });
  
  //上传处理
  form.parse(req, function(err, fields, files) {
    var filesTmp = JSON.stringify(files, null, 2);
    console.log(files);
    
    function isType(str) {
      if (str.indexOf('.') == -1) {
        return '-1';
      } else {
        var arr = str.split('.');
        return arr.pop();
      }
    }
    
    if (err) {
      console.log('parse error: ' + err);
    } else {
    var inputFile = files.image[0];
    var uploadedPath = inputFile.path;
    var type = isType(inputFile.originalFilename);
    /*var dstPath = './public/files/' + inputFile.originalFilename;//真实文件名*/
    var name = new Date().getTime() + '.' + type; /*以上传的时间戳命名*/
    var dstPath = './public/uploads/' + name
    console.log("type---------" + type);
    
    if (type == "jpg" || type == "png" || type == "exe") {
      console.log('可以上传');
      //重命名为真实文件名
      fs.rename(uploadedPath, dstPath, function(err) {
        if (err) {
          console.log('rename error: ' + err);
        } else {
          console.log('上传成功');
        }
      });
      res.writeHead(200, { 'content-type': 'text/plain;charset=utf-8' });
      var data = { "code": "1",'result_code':'SUCCESS', "msg": "上传成功", "results": [{ "name": name, "path": "uploads/" + name }] };
      console.log(JSON.stringify(data))
      res.end(JSON.stringify(data));
      
      } else {
        fs.unlink(uploadedPath, function(err) {
        if (err) {
        return console.error(err);
        }
        console.log("文件删除成功！");
        });
        
        console.log('不能上传' + inputFile.originalFilename);
        res.writeHead(200, { 'content-type': 'text/plain;charset=utf-8' });
        var data = { "code": 0, "msg": "上传失败" };
        res.end(JSON.stringify(data));
      
      }
    }
    
  });

});
router.route('/insertImg').post(function (req, res) {
  console.log(req.body)
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