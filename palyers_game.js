var playersEsports=require('../config/fantasy_dbcon')

const Players_Manag = playersEsports.Schema({ 

   PlayerFirstName:{
       type:String,
       require:true
   },
   PlayerLastName:{
       type:String,
       require:true
   },
   
   PlayerReviews:{
       type:Number,
       require:true
   },
   UploadImage:{
       type:String,
       require:true
   },
   Brithday:{
        type:String,
        require:true,
   },
   HomeTown:{
    type:String,
    require:true,
   },
   Name:{
    type:String,
    require:true,
    },
   Credits:{
    type:Number,
    require:true,
   },
   Nationality:{
    type:String,
    require:true,
   },
   SelectGame:{
    type:String,
    require:true,
   },
   SelectRole:{
    type:String,
    require:true,
   },
   Teamname:{
       type:String,
       require:true
   }
},
{
    timestamps:true,
});

module.exports = playersEsports.model('PlayerEsport',Players_Manag);