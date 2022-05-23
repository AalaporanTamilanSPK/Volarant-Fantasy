const {check,validationResult}=require('express-validator');
exports.valid_tournament=[

    check('TournamentTitle')
    .not()
    .isEmpty().withMessage('please file the TournamentTitle field'),

    check('UploadImage')
    .not()
    .isEmpty().withMessage('please file the UploadImage field'),

    check('Game')
    .not()
    .isEmpty().withMessage('please file the Gameselect field')

];

exports.tourn_sports=(req,res,next)=>{
    const result= validationResult(req).array();
    if(!result.length)
    return next();

    const error=result[0].msg;
    res.send({success:false,message:error})
}
