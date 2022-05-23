var userfantasy = require('../model/usergame')
var usersportslogin=require('../model/userlogin')
var Usercontests=require('../model/contest_Manag')
var playeruser=require('../model/palyers_game')//players
var userteam=require('../model/team')//team
var adviewwinlist=require('../model/adminwinner')

var depositad=require('../model/addeposit')

var express = require('express')
var app = express()
var jsonwebtoken = require('jsonwebtoken')
var bodyparser = require('body-parser')
var nodemailer = require('nodemailer');
var moment=require('moment')
require("dotenv").config()
const otpGenerator = require('otp-generator')
var vaildotp1;
var Cryptr = require('cryptr')

//paypal
const ejs = require('ejs')
const paypal = require('paypal-rest-sdk');
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id':"AYFHPq6iRpKLUR9crhFZBh97QWd3_GtgOKWLwLAO-4KOdYM4CArqd5wsjyT3_5WTU123Z4btoCWild48"
    // "AWCsU8bbK1WNn9XDa8Vd8hQfSJWyq5VsW_Wlu8InEKIlfK_9YDcg-7rewuONXfyT2nCofSrs_AX10RUp"
    ,'client_secret':"EL9L8zszbZyzV5Z3k38rhmVTeoSadpyJuyHWMPsS4LuHogCFaw8dK25gp-EISaBVG-Joo5ZzV0xyhHU4"
    // "EEfDpykhVxisFenPeWZQ0sKIO8QaLnzeDJ6JtZhvuN7eOkBZFbbJYEYLDjcVAHKpwf1ofulN1GCfXIAv"
});

const res = require('express/lib/response')
const read = require('body-parser/lib/read')
const { Result } = require('express-validator')
const { Admin } = require('mongodb')
const cryptr = new Cryptr('myTotallySecretKey');
app.use(bodyparser.json())

//user regsiter

exports.fantasygameuserreg = function (req, res) {

    const sport = new userfantasy()
    sport.Username=req.body.Username
    sport.Email = req.body.Email
    sport.Password = cryptr.encrypt(req.body.Password)
    sport.ConfirmPassword = req.body.ConfirmPassword
    sport.UserWallet=req.body.UserWallet
    sport.save((err) => {
        if (err) {
            res.json({Success:false,Message:'Allready exist is a name please Enter change name'})
        } else {
            res.json({Success:true,Message:'Regsiter User Success..'})

        }
    })
}

//user login 

exports.fantasygameuserlogin = function (req, res) {

    const sport = new usersportslogin()
    sport.Email = req.body.email
    sport.Username=req.body.username
    sport.Password = cryptr.encrypt(req.body.password)
    sport.save((err) => {
        if (err) {
            res.json({Success:false,Message:'Login Falied Not Match Email Username Password '})
        } else {
            res.json({Success:true,Message:'Login Success'})

        }
    })
}

exports.login = function (req, res) {
    usersportslogin.find({ Email: req.body.email}, { id: 1 }, function (err, data) {
        if (data == 0) {
            res.send("wrong input!!")
        } else {
            const usersportslogin = {
                user_id: data,
            }

            if (usersportslogin.user_id == data) {
                const token = jsonwebtoken.sign({Email: req.body.email},
                    "secretkey", { expiresIn: '60s' })
                res.json({ data: data, token: token })
            } else {
                res.json({Message:'You are not wrongadmin'})
            }
        }
    })
}
 
//user Login verify

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

//user Changepassword

exports.userchangepassword = (req, res) => {
    var Email = req.body.Email;
    var Password = req.body.Password;
    var Changepassword= req.body.Changepassword;
    var Newpassword = req.body.newPassword

    userfantasy.findOne({ Email: Email, Changepassword: Changepassword ,NewPassword:Newpassword},
         function (err, data) {
        if (data == null) {
            res.json({succes:false,Message:"Please check your email & pattern"})
        }

        else {
            // console.log(data.Password);
            var oldpassword = cryptr.decrypt(data.Password)

            if (oldpassword == Password) {
                // console.log('equal')
                const user = {
                    useremail: Email,
                    userChangepassword: Changepassword
                };
                jsonwebtoken.sign({ user: user }, 'secretkey', { expiresIn: "60s" }, (err, token) => {
                    if (err) {

                        res.json({Success:false,Message:'Token Error'})
                    } else {

                        res.json({ token });
                        var tokenverify = token
                    }
                });
            }
        }
    });
}

//user Verify Changepassword

exports.userchangepasswordverify=(req,res)=>{
    var Email=req.body.Email;
    var Password=req.body.password;
    var Changepassword=req.body.Changepassword;
    var NewPassword=cryptr.encrypt(req.body.newpassword)
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
      const bearerToken = bearerHeader.split(" ")[1];
      req.token = bearerToken;
      jsonwebtoken.verify(req.token,"secretkey",(err,authData)=>{
        if(err){
            res.json({Success:false,Message:'Error'})
        }
        else{
            userfantasy.findOneAndUpdate({ Email:Email,Changepassword:Changepassword,Password:Password},{$set: {Password: NewPassword} },function(err){
                if(err){
                    res.json({Success:false,Message:'Password Not Changed'})
                    }
                    else{
                        res.json({Success:true,Message:"password Change successfully"})  
                }
            })
            
        }
        
    })
}
   else{
       res.status(403);
   }

}


//user restpassword 

var validotp1;
var otp=otpGenerator.generate(4);

exports.userotpRestpasssword=(req,res)=>{

   
   const otptime=moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    // vaildotp1=otptime

    var Email=req.body.email
    userfantasy.findOne({Email:Email},function(err,data){
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


//user Reset Password

exports.userotpRestpasswordverify=(req,res)=>{

    var Otpverify=req.body.otp
    var otpGenerator=moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
    var calc =moment(otpGenerator).diff(validotp1,'seconds'); 
   
if(Otpverify == otp){

    if(calc <= 60){

        if(req.body.confirmPassword == req.body.newPassword){

       const encryptpasswordstr1=cryptr.encrypt(req.body.newPassword)
      userfantasy.findByIdAndUpdate({_id:req.body._id},{Password:encryptpasswordstr1},function(err,data){
          if(err){
              res.json({Success:false,Message:'Not vaild Email'})
            //   console.log(err)
          }else{
              res.json({Success:true,Message:'User Reset Password changed'})
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

//user viewe contestlist

exports.contestlist=function (req, res) {

   var _id=req.body._id
   var ContestTitle=req.body.ContestTitle

    Usercontests.find(({_id: _id ,ContestTitle: ContestTitle}),function (err, data) {
        if (data==null) {
             res.json({Success:false,Message:'Not a invalid Check your id contesttitle'})
        }
        else {
            res.send(data);
        }
    });
    
};

// user team select 

exports.teamlist=function(req,res){
    var _id=req.body.id
    var Teamcode=req.body.teamcode

    userteam.find(({id: _id,teamcode: Teamcode}),function (err, data) {
        if (data==null) {
            res.json({Success:false,Message:"Not a invalid check your teamcode"})
        }
        else {
            res.send(data);
        }
    });
};

//user playerlist view

exports.playerlist= function (req, res) {

    var _id=req.body.id
    var Name=req.body.name
    var Credits=req.body.credits

    //findall

    playeruser.findOne(({id:_id,name:Name,credits:Credits}),function(err,docs){
        if(err){
           res.send(err)
        }
        else{
           res.send(docs)
        }
    })

    //single player

    playeruser.find({Name:'Yoru_8',Credits:'8'}, function(err, data){
        if(err){
            res.send(err);
        }
        else{
           res.send(data);
        }
    })


}

//winner list admin

exports.userwinlist=function(req,res){

    var Points=req.body.Points
    var Kill=req.body.Kill

    adviewwinlist.count({},function(err,count){
        if(err){
            console.log(err)
        }else{
            console.log("Winner Count",count)
        }

        adviewwinlist.find({}).sort({ kill: -1,}).exec(function(err, docs) {
          if(err){
           res.json({Success:false,Message:'Error'})
          }
          else{
           res.send(docs)
          }
        });

    })
}

//paypal transaction method

exports.paypal=function(req,res){

    const create_payment_json = {
          "intent": "sale",
          "payer": {
              "payment_method": "paypal"
          },
          "redirect_urls": {
              "return_url": "http://localhost:9000/regsiter/paypalprocess",
              "cancel_url": "http://localhost:9000/regsiter/cancel"
          },
          "transactions": [{
              "item_list": {
                  "items": [{
                      "name": "Red Sox Hat",
                      "sku": "001",
                      "price": "100.00",
                      "currency": "USD",
                      "quantity": 1
                  }]
              },
              "amount": {
                  "currency": "USD",
                  "total": "100.00"
              },
              "description": "Hat for the best team ever"
          }]
      };
      
      paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for(let i = 0;i < payment.links.length;i++){
              if(payment.links[i].rel === 'approval_url'){
                res.redirect(payment.links[i].href);
              }
            }
        }
    });
}

//paypal router db store

exports.paypalimp=function(req,res){

        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;
      
        const execute_payment_json = {
          "payer_id": payerId,
          "transactions": [{
              "amount": {
                  "currency": "USD",
                  "total": "100.00"
              }
          }]
        };
      
        paypal.payment.execute(paymentId, execute_payment_json, 
            function (error, payment) {
          if (error) {
              console.log(error.response);
              console.log('err')
              throw error;
          } else {
            var amount=payment.transactions[0].amount.total
            var paymentid=payment.id
            var recipient_name=payment.payer.payer_info.shipping_address.recipient_name
            depositad.insertMany({
                amount:amount,paymentid:paymentid,recipient_name:recipient_name
            })
            //  console.log(JSON.stringify(payment));
            //  console.log('success' )
              res.send('Success');
          }
      });

}



// exports.paypalupdate=function(req,res){

//     var _id=req.body._id
//     var recipient_name=req.body.recipient_name

//     depositad.findByIdAndUpdate({_id:_id},{$set:{recipient_name:recipient_name}},function(err,data){
//         if(err){
//             res.send(err)
//         }
//         else{
//             res.send(data)
//         }
//     })
// }

// Email ID:
// sb-blgl478597960@business.example.com
// System Generated Password:
// Task@123

// Email ID:
// sb-lkt1m14682189@business.example.com
// System Generated Password:
// H{[=%q?1

//project1 Admin
// Client ID=>AVsAqC4fYaIa86aVwvu4bG1-Hg1AwvxKg_kmTFqxp3_ZlTr4bzu2JoQ9XP2tVOvsdyYE6-OWJa7ZjGXc
// secretid=>ENGhbUpQ03mKforrrytV5_wG4x3E5F7_CbcD3b2u2k-8vLOcGnEOyn_ulhXF8IpHu3gX3GayYsRs-zFW
// email=>sb-xdsep14719670@business.example.com
// password=>eW<1SZ0e

// //project2 Admin
// Client ID=>AQXQL9jmUNkiwXk_Fxrz2PsCK6P710wvq3R5Eqgw5-LcDhOnVx7cUJIzGnhLhjv6w396rNSgYlwjKeVt
// secretid=>EEpv1emh716nOOIPDT05esCY3gMQVsDciJ-rlzhxT-fMgMDb7Giityb_giYGXXve9HvgUdNDP07iFe6-
// email=>sb-owmxs14722775@business.example.com
// password=>IMe1Vlv-
    
// //project3 Admin
// Client ID=>AdzISGgK6kqjmTLwh6pWVXB6LqnHN4yLVQBGwXu6RKC2IKAp-T0QhVdS4r5NcIjzRjDTDLXKMGG_TfyV
// secretid=>EN2Ri4ARDP9q9dFLJQcO9YdfzTBinFmRAuJYefb0kjNPn6r5PAp7GjzStiu0Kb0a8dDwrM5ZRw3xPXjD 
// email=>sb-cmubm14722898@business.example.com
// password=>3a(o'E%Y
             
// //project1 user 
// email=>sb-4ygkp15216549@personal.example.com
// password=>i&Nbi'1S
             
// //project2 user
// email=> sb-9cwa515216495@personal.example.com
// password=>Q-Ty/wE6
             
// //project3 user
// email=>sb-ao2my15216574@personal.example.com
// password=>   ><M'3*v$