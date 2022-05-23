var manasprots=require('../model/game_manage')
var express=require('express')
var app=express()
var bodyparser=require('body-parser')
app.use(bodyparser.json())

exports.gamemanager=function(req,res){   

    const gamead =new manasprots()
    
    gamead.GameTitle = req.body.GameTitle
    gamead.UploadImage = req.body.UploadImage
    gamead.Game=req.body.Game 
    gamead.save((err)=>{
        if(err){
            res.json({success:false,message:'Error'})
        }else{
            res.json({success:true,message:'Fixed The game Manager Create Success...'})
            
        }
    })
}