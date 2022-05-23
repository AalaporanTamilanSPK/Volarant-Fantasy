const {check,validationResult}=require('express-validator');
exports.validators=[

    check('GameTitle')
    .not()
    .isEmpty().withMessage('please file the GameTitle field'),

    check('UploadImage')
    .not()
    .isEmpty().withMessage('please file the UploadImage field'),

    check('Game')
    .not()
    .isEmpty().withMessage('please file the Gameselect field')

];

exports.game_manag=(req,res,next)=>{
    const result= validationResult(req).array();
    if(!result.length)
    return next();

    const error=result[0].msg;
    res.send({success:false,message:error})
}
