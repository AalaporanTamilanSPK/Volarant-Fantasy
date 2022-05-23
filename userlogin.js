var sportsUser =require('../config/fantasy_dbcon')

const user_sportslogin = sportsUser.Schema({ 

    Username:{
        type:String,
        require:true,
        unique:true
    },
   
    Email:{
        type:String,
          unique:true,
          require:true,
     },
    Password:{
        type: String,
        required: true,
    },
},
{
    timestamps:true

});
module.exports = sportsUser.model('userlogingame',user_sportslogin);
