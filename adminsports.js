var loginad= require('../helper/adminfantasy');//mainfile
var adcontest=require('../helper/contest_mansports')//contest
var adtour=require('../helper/tournaem_Ad')//tournament
var admatchm=require('../helper/match_Managsports')//matchmnage
var adgamemana=require('../helper/ManageG')//managegame
var adplayers=require('../helper/playersgame')//player
var express=require('express')
var gameadmin= express.Router()
var boodyparser=require('body-parser')
gameadmin.use(boodyparser.json())

//admin 

const{validator,adminsports}=require('../middleware/Fontasy_adminV')
gameadmin.post('/adregsiter',validator,adminsports,loginad.gamefantasy)//validator admin
gameadmin.post('/adlogin',loginad.login)
gameadmin.post('/adverfiy',loginad.verify)

//passwords
gameadmin.post('/adpassword',loginad.changepassword)
gameadmin.post('/adpasswordverify',loginad.Adchangepasswordverify)

//restpassword
gameadmin.post('/adrestpassword',loginad.adminotpRestpasssword)
gameadmin.post('/adrestverify',loginad.AdotpRestpasswordverify)

//amount transcation
gameadmin.post('/adwinplyer',loginad.adplayeramount)
gameadmin.post('/adwallet',loginad.addeposit)


//adminGameprogramsports//
    
//contest
const{validatorsports,Contest_Managsports}=require('../middleware/contest_manav')
gameadmin.post('/contestmanager',validatorsports,Contest_Managsports,adcontest.contest_manager)

//tournament
const{valid_tournament,tourn_sports}=require('../middleware/tournament_sport')
gameadmin.post('/tournament',valid_tournament,tourn_sports,adtour.MatchMan_fantasy)

//matchmanage
const{validatorsport,Match_Managsports}=require('../middleware/match_managv')
gameadmin.post('/matchmanager',validatorsport,Match_Managsports,admatchm.matchmanager)

//managegame
const{validators,game_manag}=require('../middleware/game_manavaild')
gameadmin.post('/manager',validators,game_manag,adgamemana.gamemanager)


//player & team
const{validatorplayer,player_sports}=require('../middleware/playersvaildator')
gameadmin.post('/player',validatorplayer,player_sports,adplayers.playergame_fantasy)

//team
const{validatorteam,Team_Managsports}=require('../middleware/team_vaildator')
gameadmin.post('/team',validatorteam,Team_Managsports,adplayers.teamgame_fantasy)
     
//adminwinnerlist
const{validatoradwin,winnervalidsports}=require('../middleware/win_advalid')
gameadmin.post('/winlist',adplayers.adwinannounce)


module.exports=gameadmin