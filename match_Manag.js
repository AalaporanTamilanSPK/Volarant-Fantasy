var matchmanEsports=require('../config/fantasy_dbcon')

const gamematchM = matchmanEsports.Schema({ 
   
   SelectGame:{
       type:String,
       require:true
   },
   SelectTournament:{
       type:String,
       require:true
   },
   A_TeamTitle:{
       type:String,
       require:true
   },
   A_Team_Icon:{
       type:String,
       require:true
   },
   B_TeamTitle:{
       type:String,
       require:true
   },
   B_Team_Icon:{
       type:String,
       require:true
   },
   Gamestatus:{
        type:String,
        require:true,
   },
},
{
    timestamps:true,
});
module.exports = matchmanEsports.model('MatchManageEsport',gamematchM);
