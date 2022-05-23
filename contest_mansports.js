var contestsprots=require('../model/contest_Manag')
var express=require('express')
var app=express()
var bodyparser=require('body-parser')
var moment=require('moment')
app.use(bodyparser.json())

exports.contest_manager=function(req,res){   

    const adconm =new contestsprots()
    
    adconm.ContestTitle = req.body.ContestTitle
    adconm.ContestSubTitle = req.body.ContestSubTitle
    adconm.UploadImage=req.body.UploadImage
    adconm.DiscountValue=req.body.DiscountValue
    adconm.SelectGame=req.body.SelectGame
    adconm.ContestType=req.body.ContestType
    adconm.ContestGamestatus=req.body.ContestGamestatus
    adconm.JoiningFee= req.body.JoiningFee
    adconm.WinningAmount = req.body.WinningAmount
    adconm.WinnersCount=req.body.WinnersCount
    adconm.EnterMaxTeams=req.body.EnterMaxTeams
    adconm.EntryType=req.body.EntryType
    adconm.Gamestatus=req.body.Gamestatus
    adconm.MinimumRank=req.body.MinimumRank
    adconm.MaximumRank=req.body.MaximumRank
    // adconm.Amount=req.body.Amount
    adconm.MatchTime = moment().format((req.body.MatchTime));
    adconm.save((err)=>{
        if(err){
            res.json({success:false,message:'Error'})
        }else{
            res.json({success:true,message:'Fixed The ContestManagemaent Success'})
            
        }
    })
}
