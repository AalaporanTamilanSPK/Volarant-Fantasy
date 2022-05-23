var express=require('express')
var userinfo= express.Router()
var bodyparser=require('body-parser')
userinfo.use(bodyparser.json())
var usergame = require('../helper/user_custom');

const{uservalidator,uservalidatorsports}=require('../middleware/user_validator')
userinfo.post('/userreg',uservalidator,uservalidatorsports,usergame.fantasygameuserreg)

const{userlogvalidator,loginvalidsports}=require('../middleware/userloginValidator')
userinfo.post('/userlog',userlogvalidator,loginvalidsports,usergame.fantasygameuserlogin)

userinfo.post('/tokengen',usergame.login)
userinfo.post('/userverify',usergame.verify)

userinfo.post('/userpw',usergame.userchangepassword)//change password
userinfo.post('/userpwverify',usergame.userchangepasswordverify)//change password verify

// userinfo.post('/otp',usergame.nodemailer)//otp generator
userinfo.post('/usrestpassword',usergame.userotpRestpasssword)//rest passwprd user
userinfo.post('/usrestverify',usergame.userotpRestpasswordverify)//rest password verfiy

userinfo.post('/matchlist',usergame.contestlist)
userinfo.post('/teamview',usergame.teamlist)
userinfo.post('/playerteam',usergame.playerlist)
userinfo.post('/winrank',usergame.userwinlist)

//paypal
userinfo.get('/paymentstart',(req,res)=>res.render('index'));
userinfo.post('/paymentcreate',usergame.paypal)
userinfo.get('/paypalprocess',usergame.paypalimp)
userinfo.get('/cancel', (req, res) => res.send('Cancelled'));

// userinfo.post('/uppaypal',usergame.paypalupdate)

module.exports=userinfo