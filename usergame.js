var EsportsUser =require('../config/fantasy_dbcon')

const user_sports = EsportsUser.Schema({ 
   
    Email:{
        type:String,
          unique:true,
          require:true,
     },
    Password:{
        type: String,
        required: true,
    },
    ConfirmPassword:{
        type:String,
        require:true
    },
    Username:{
        type:String,
        require:true,
        unique:true
    },
    UserWallet:{
        type:Number,
        require:true
    }
},
{
    timestamps:true,
});
module.exports = EsportsUser.model('usergameEntry',user_sports);
