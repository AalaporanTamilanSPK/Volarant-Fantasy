var gamemEsports=require('../config/fantasy_dbcon')

const GameM = gamemEsports.Schema({ 
   
    GameTitle:{
        type:String,
        require:true,
    },
    
    UploadImage:{
        type: String,
        required: true,
    },

    Game:{
        type:String,
        require:true,
    },
},
{
    timestamps:true,
});
module.exports = gamemEsports.model('ManageEsport',GameM);