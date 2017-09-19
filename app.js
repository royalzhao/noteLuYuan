const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(express.static('public'))

app.use('/lib', express.static(path.join(__dirname, 'node_modules')))

app.use(bodyParser.urlencoded({extended: true}))




const catelogRouter = require('./router/catelog')
app.use('/', catelogRouter)






let _port = 80
app.listen(_port)

console.log('http://127.0.0.1:' + _port)
