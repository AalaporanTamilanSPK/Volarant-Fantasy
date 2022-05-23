var express=require('express')
var app=express()
var mdbgame=require('mongoose')
var port = process.env.PORT || 9001;

//dbconnection
var mdbgame=require('./Esports/config/fantasy_dbcon')

//admin routermain
var sprotsadmin=require('../mainproject/Esports/controller/adminsports')

//cloudinary router
var sprotscloud=require('./Esports/helper/cloudgame')

//user 
var fantasyreg=require('./Esports/controller/usersports')

app.use('/admin',sprotsadmin)//admin,changpassword,reset

app.use('/cloud',sprotscloud)//cloudinary

const ejs=require('ejs')
app.set('view engine','ejs');//paypal

app.use('/regsiter',fantasyreg)//user regsiter

app.listen(port,()=>{
    console.log('server port running')
})