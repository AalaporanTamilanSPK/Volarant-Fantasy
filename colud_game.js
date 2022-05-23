const mongoose = require('mongoose')

const coludesports = new mongoose.Schema({

    player10name:{
        type: String,
        require:true
    },
    name: {
        type: String,
        require:true
    },
    avatar: {
        type: String,
        require:true
    },
    cloudinary_id: {
        type: String,
        require:true
    },
},
{
    timestamps:true,
})
module.exports = mongoose.model('gameimage', coludesports)