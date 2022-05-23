var EsportsTeam=require('../config/fantasy_dbcon')

const Gameteam = EsportsTeam.Schema({ 
   
    Gametitle:{
        type:String,
        require:true
    },
    Teamname:{
        type:String,
        require:true
    },
    TournamentTitle:{
        type:String,
        require:true,
    },
    Teamcode:{
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
module.exports = EsportsTeam.model('teamesport',Gameteam);
