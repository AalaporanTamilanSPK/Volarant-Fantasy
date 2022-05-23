var Esports =require('../config/fantasy_dbcon')

const Fantasy_ad = Esports.Schema({ 
   
    Email:{
        type:String,
        unique:true,
        require:true,
     },
    Password:{
        type: String,
        required: true,
    },
    Pattern:{
        type:Number,
        require:true,
    },
    Adminwallet:{
        type:Number,
        require:true
    }
},
{
    timestamps:true,
});
module.exports = Esports.model('adsports',Fantasy_ad);
