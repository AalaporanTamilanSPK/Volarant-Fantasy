var contestEsports=require('../config/fantasy_dbcon')

const contest_Manag = contestEsports.Schema({ 
   
   ContestTitle:{
       type:String,
       require:true
   },
   ContestSubTitle:{
       type:String,
       require:true
   },
   UploadImage:{
       type:String,
       require:true
   },
   DiscountValue:{
       type:String,
       require:true
   },
   SelectGame:{
       type:String,
       require:true
   },
   ContestType:{
       type:String,
       require:true
   },

   ContestGamestatus:{
        type:String,
        require:true,
   },
   JoiningFee:{
      type:String,
      require:true
    },
   WinningAmount:{
      type:String,
      require:true
   },
   WinnersCount:{
      type:String,
      require:true
   },
   EnterMaxTeams:{
      type:String,
      require:true
   },
   EntryType:{
      type:String,
      require:true
   },
   Gamestatus:{
      type:String,
      require:true,
    },
   MinimumRank:{
      type:String,
      require:true
    },
   MaximumRank:{
      type:String,
      require:true
   },
// Amount:{
//      type:String,
//      require:true
// },
},

{
    timestamps:true,
});
module.exports = contestEsports.model('ContestManageEsport',contest_Manag);
