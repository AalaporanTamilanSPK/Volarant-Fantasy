var matchsprots=require('../model/match_Manag')
var express=require('express')
var app=express()
var bodyparser=require('body-parser')
var moment=require('moment')
app.use(bodyparser.json())

exports.matchmanager=function(req,res){   

    const admatchM =new matchsprots()
    
    admatchM.SelectGame = req.body.SelectGame
    admatchM.SelectTournament = req.body.SelectTournament
    admatchM.A_TeamTitle=req.body.A_TeamTitle
    admatchM.A_Team_Icon=req.body.A_Team_Icon
    admatchM.B_TeamTitle=req.body.B_TeamTitle
    admatchM.B_Team_Icon=req.body.B_Team_Icon
    admatchM.Gamestatus=req.body.Gamestatus
    admatchM.MatchTime=moment().format((req.body.MatchTime))
    admatchM.save((err)=>{
        if(err){
            res.json({success:false,message:'Error'})
        }else{
            res.json({success:true,message:'Fixed The MatchManagemaent Success'})
        }
    })
}