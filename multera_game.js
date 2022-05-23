var multer = require ('multer')
var path = require ('path')
//multer_config
module.exports=multer({
    //image upload
    storage:multer.diskStorage({}),
    fileFilter:(req,file,cb)=>{

        let excl=path.extname(file.originalname)
        if(excl!==".jpg"&&excl!==".jpeg"&&excl!==".png"&&excl!==".pdf"){
            cb(new Error('file type not support'),false)
            return
        }
        cb (null,true)
    }
})