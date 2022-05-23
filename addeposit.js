var Esports = require('../config/fantasy_dbcon')

const depositadmin = Esports.Schema({ 
   
   
    amount:{
        type: Number,
        require: true,
    },
    paymentid:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        unique:true,
        require:true,
     },
    recipient_name:{
        type:String,
        require:true,
    },
   
},
{
    timestamps:true,
})
module.exports = Esports.model('adsports_depsoit',depositadmin);