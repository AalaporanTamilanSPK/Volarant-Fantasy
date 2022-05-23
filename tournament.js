var EsportsTournament=require('../config/fantasy_dbcon')

const Gametournam = EsportsTournament.Schema({ 
   
    TournamentTitle:{
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
module.exports = EsportsTournament.model('tournamentesport',Gametournam);
