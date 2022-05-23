var player_sprots=require('../model/palyers_game')
var teamsports=require('../model/team')
var windetails=require('../model/adminwinner')
const cloudinary = require('../utils/cloudinary_game')
const upload = require('../utils/multera_game')
var express=require('express')
var app=express()
var bodyParser=require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//playerinfo list details

exports.playergame_fantasy=function(req,res){   

    const adplayers =new player_sprots()
    
    adplayers.PlayerFirstName= req.body.PlayerFirstName
    adplayers.PlayerLastName = req.body.PlayerLastName
    adplayers.PlayerReviews=req.body.PlayerReviews
    adplayers.UploadImage=req.body.UploadImage
    adplayers.Brithday=req.body.Brithday
    adplayers.HomeTown=req.body.HomeTown
    adplayers.Name=req.body.Name
    adplayers.Credits=req.body.Credits
    adplayers.Nationality=req.body.Nationality
    adplayers.SelectGame=req.body.SelectGame
    adplayers.SelectRole=req.body.SelectRole
    adplayers.save((err,data)=>{
        if(err){
            res.json({success:false,message:'Error Allready entry player mismatch'})
        }else{
            res.json({success:true,message:'player Entry volarantfantasy'})
            
        }
    })
}

//admin tournament list

exports.teamgame_fantasy=function(req,res){   
    const adteam =new teamsports()
    
    adteam.Gametitle= req.body.Gametitle
    adteam.Teamname = req.body.Teamname
    adteam.TournamentTitle=req.body.TournamentTitle
    adteam.Teamcode=req.body.Teamcode
    adteam.Gamestatus=req.body.Gamestatus
    adteam.save((err)=>{
        if(err){
            res.json({success:false,message:'Error'})
        }else{
            res.json({success:true,message:'Team entry sportsgame'})
            
        }
    })
}

//admin winnerlist table

exports.adwinannounce = function(req,res){

    const adminwin = new windetails()

    adminwin.Userid = req.body.userid
    adminwin.Firstname=req.body.firstname
    adminwin.Lastname=req.body.lastname
    adminwin.Points = req.body.points
    adminwin.Victory = req.body.victory
    adminwin.Kill= req.body.kill
    adminwin.save((err) => {
        if(err) {
            res.json({success:false,message:'Error'})
        }else{
            res.json({success:true,message:'player winnerlist announcement inset success..'})
        }
    })
}