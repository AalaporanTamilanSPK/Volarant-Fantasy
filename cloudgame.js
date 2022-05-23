const express = require('express')
const app=express()
const fantasyimage = express.Router();
const cloudinary = require('../utils/cloudinary_game')
const upload = require('../utils/multera_game')
const bodyParser=require('body-parser')
const User = require('../model/colud_game');
const { json } = require('express/lib/response');
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
fantasyimage.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path)
        //create instance of user
        let user = new User({
            // player10name:req.body.player10name,
            name: req.body.name,
            avatar: result.secure_url,
            cloudinary_id: result.public_id
        })//save user
        user.save()
        res.json(user)
    } catch (err) {
        // console.log(err)
        res.json({message:'Error'})

    }
});
fantasyimage.post('/find', (req, res) => {
    User.find(function (err, data) {
        if (err) {
            // console.log(err);
            res.send({message:'Error'})
        }
        else {
            res.send(data);
        }
    });
});

fantasyimage.post("/remove", async (req, res) => {
    try {
        let user = await User.findById(req.body._id)
        await cloudinary.uploader.destroy(user.cloudinary_id)//delete cloude_id
        await user.remove()//remove database
        res.json(user)
    } catch (error) {
        // console.log(error)
        res.json({message:'Error'})
    }
})

module.exports = fantasyimage