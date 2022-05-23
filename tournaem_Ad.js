var tournam_sprots=require('../model/tournament')
var express=require('express')
var app=express()
var bodyparser=require('body-parser')
app.use(bodyparser.json())

exports.MatchMan_fantasy=function(req,res){   

    const adtour =new tournam_sprots()
    
    adtour.TournamentTitle= req.body.TournamentTitle
    adtour.UploadImage = req.body.UploadImage
    adtour.Game=req.body.Game 
    adtour.save((err)=>{
        if(err){
            res.json({success:false,message:'Tournament Error'})
        }else{
            res.send({success:true,message:'Fixed The Tournament Esports..'})
            
        }
    })
}