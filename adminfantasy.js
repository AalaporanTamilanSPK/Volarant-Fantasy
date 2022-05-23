var adfantasy = require('../model/login_sport')
var adwinplayer = require('../model/usergame') //userwallet
// var adsendamount = require('../model/login_sport') //adminwallet
var contestsprots=require('../model/contest_Manag')
var express = require('express')   
var app = express()
var jsonwebtoken = require('jsonwebtoken')
var bodyparser = require('body-parser')

var Cryptr = require('cryptr')
const cryptr = new Cryptr('myTotallySecretKey');
var nodemailer = require('nodemailer');  
var moment=require('moment')
require("dotenv").config()
const otpGenerator = require('otp-generator')
var advalidotp2;

app.use(bodyparser.json())

//Register admin

exports.gamefantasy = function (req, res) {

    const gam = new adfantasy()
    gam.Email = req.body.Email
    gam.Password = cryptr.encrypt(req.body.Password);
    gam.Pattern = req.body.Pattern
    gam.Adminwallet = req.body.Adminwallet

    gam.save((err, data) => {
        if (err) {

            res.json({Success:false,Message:'Error Notvalid Mismatch'})
            console.log(err)

        } else {
             console.log(data)
            // res.send(data)
            res.json({Success:true,Message:'Admin Regsiter Success..'})

        }
    })
}

// Admin login

exports.login = function (req, res) {
    adfantasy.find({ email: req.body.email }, { id: 1 }, function (err, data) {
        if (data == 0) {
            res.json({Message:"wrong input!!"})
        } else {
            const adfantasy = {
                admin_id: data,
            }

            if (adfantasy.admin_id == data) {
                const token = jsonwebtoken.sign({ username: req.body.username },
                    "secretkey", { expiresIn: '10m' })
                res.json({ data: data, token: token })
            } else {

                res.json({Message:'You are not wrongadmin'})

            }
        }
    })
}

//Admin Login verify

exports.verify = function (req, res) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        jsonwebtoken.verify(req.token, "secretkey", (err, authData) => {
            if (err) {

                res.sendStatus(403);
            }
            else {
                res.json({

                    Message: " You Account Created",
                    Verify: "you are login user"

                });
            }
        })
    }
    else {
        res.sendStatus(403);
    }

}

//Admin Changepassword

exports.changepassword = (req, res) => {
    var Email = req.body.Email;
    var Password = req.body.Password;
    var Pattern = req.body.Pattern;
    var Newpassword = req.body.newPassword

    adfantasy.findOne({ Email: Email, Pattern: Pattern, NewPassword: Newpassword },
        function (err, data) {

            if (data == null) {

                res.json({Success:false,Message:"plase check your email & pattern"})
               console.log(err)
            }

            else {

                // console.log(data.Password);
                var oldpassword = cryptr.decrypt(data.Password)

                if (oldpassword == Password) {
                    // console.log('equal')
                    const user = {

                        useremail: Email,
                        userpattern: Pattern

                    };
                    jsonwebtoken.sign({ user: user }, 'secretkey', { expiresIn: "10m" }, (err, token) => {
                        if (err) {

                            res.json({Success:false,Message:'Error'})

                        } else {

                            res.json({ token });
                            var tokenverify = token

                        }
                    });

                }
            }
        });
}

//Admin Verify Changepassword

exports.Adchangepasswordverify = (req, res) => {
    var Email = req.body.Email;
    var Password = req.body.Password;
    var Pattern = req.body.Pattern;
    var NewPassword = cryptr.encrypt(req.body.newpassword)
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefined") {

        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;

        jsonwebtoken.verify(req.token, "secretkey", (err, authData) => {
            if (err) {
                res.send(err)
            }
            else {
                adfantasy.findOneAndUpdate({ Email: Email, Pattern: Pattern, Password: Password }, { $set: { Password: NewPassword } }, function (err) {
                    if (err) {
                        res.json({Message:'Password Not Changed'})

                    }
                    else {
                        res.json({Message:"password Change successfully"})

                    }
                })
            }
        })
    }
    else {
        res.status(403);
    }

}

//Admin restpassword 

var advalidotp2;
var otp=otpGenerator.generate(6);

exports.adminotpRestpasssword=(req,res)=>{

   const otptime=moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    // vaildotp1=otptime

    var Email=req.body.email
    adfantasy.findOne({Email:Email},function(err,data){
        if(data==null){
            res.json({Success:false,Message:"Email not vaild"})
        }
        else{
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: process.env.EMAIL_USER,
                  pass: process.env.EMAIL_PASS
                  
                }
              });
              
              var mailOptions = {
                from: process.env.EMAIL_USER,
                to: 'taskmk1@gmail.com',
                subject: otptime,
                text: otp,
              };
              
              transporter.sendMail(mailOptions, function(error, data){
                if (error) {
                  res.json({Success:false,Message:"Email Not send Check...."});
                } else {
                  res.send(data)
                //   res.send({message:"verfication Code  send to your otp"});
                }
            });    
        }
    });
}

//Admin Reset Password

exports.AdotpRestpasswordverify=(req,res)=>{

    var Otpverify=req.body.otp
    var otpGenerator=moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
    var calc =moment(otpGenerator).diff(advalidotp2,'minutes'); 
   
if(Otpverify == otp){

    if(calc <= 10){

        if(req.body.confirmPassword == req.body.newPassword){

       const encryptpasswordstr1=cryptr.encrypt(req.body.newPassword)
       adfantasy.findByIdAndUpdate({_id:req.body.id},{Password:encryptpasswordstr1},function(err,data){
          if(err){
              res.json({Success:false,Message:'Not vaild Process'})
              console.log(err)
          }else{
              res.json({Success:true,Message:'Admin Reset Password changed'})
          }
        })
    }
      else{
        res.json({message:"Time out otp"})
        
       }
    }   
      else
      {
        res.json({message:'Invaild otp'})
      }
    }
}

//admin user send wallet transaction

exports.adplayeramount = function (req, res) {
    
    var _id = req.body._id
    var Email = req.body.Email
    var UserWallet = req.body.UserWallet

    adwinplayer.findByIdAndUpdate({ _id: _id, Email: Email }, { $set: { UserWallet: UserWallet } }, function (err, data) {
        if (data == null) {
            res.send('Invalid Email Id MisMatch')
        } else {
            if (UserWallet == 350) {

                res.json({Success:true,Message: '1st..Prices.. 6500 Valorant Points ' })

            }
            else{
                if (UserWallet == 200) {

                    res.json({ Success:true,Message: '2st..Prices.. 6000 Valorant Points' })

                }
                else {
                    if (UserWallet == 150) {

                        res.json({ Success:true,Message: '3st..Prices..  5800 Valorant Points' })

                    }
                    else{
                        if(UserWallet == 100){

                          res.json({Success:true,Message: 'Allbest Next time 4st..Prices.. 5500 Valorant Points'})
                        } 
                      else{
                           if(UserWallet == 50){

                            res.json({Success:true,Message: 'Allbest Next time 5st..Prices.. 5000 Valorant Points'})

                        }else{

                            res.json({Success:false,Message: 'Not valid amount transaction wallet'})

                        }
                      } 
                    }

                }
            }
        }
    })
}

//contest winningamount send amount

exports.addeposit = function (req, res) {

    var _id = req.body._id
    var WinningAmount = req.body.WinningAmount

    contestsprots.findByIdAndUpdate({_id: _id}, { $set: { WinningAmount: WinningAmount } }, function (err, data) {
        if (data == null) {
            res.json({Success:false,Message:'Invalid Id db MisMatch'})
        }
        else {
            if (WinningAmount == 150) {

                res.json({Success:true,Message: 'Win in the match... 15% Admin Send WinningAmount' })

            }
            else {
                if (WinningAmount == 1000) {

                    res.json({Success:true,Message: 'Contest start VolarantFantasy..WinningAmount' })

                }
                else{

                    res.json({Success:false,Message:'Not valid error WinningAmount'})
                    // res.sendStatus(403)

                }
            }
        }
    })
}

