var mongoose = require('mongoose')
// const path = require('path')
// require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const dotenv = require('dotenv')
dotenv.config()

//connectdb
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}) 
.then(()=>console.log('db connected'))
.catch((err)=>console.log(err))



module.exports = mongoose