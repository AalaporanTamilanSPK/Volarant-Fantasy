var Esports =require('../config/fantasy_dbcon')

const win_announcemant = Esports.Schema({ 
   
    Userid:{
        type:Number,
        unique:true,
        require:true,
     },
    Firstname:{
        type: String,
        require: true,
    },
    Lastname:{
        type:String,
        require:true,
    },
    Points:{
        type:Number,
        require:true,
    },
    Victory:{
        type:Number,
        require:true,
     },
     Kill:{
         type:Number,
         require:true
     },

},
{
    timestamps:true,
})
module.exports = Esports.model('adwin_announ',win_announcemant);