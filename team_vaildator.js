const {check,validationResult}=require('express-validator');
exports.validatorteam=[

    check('Gametitle')
    .not()
    .isEmpty().withMessage('please file the Gametitle field'),

    check('Teamname')
    .not()
    .isEmpty().withMessage('please file the Teamname field'),

    check('TournamentTitle')
    .not()
    .isEmpty().withMessage('please file the TournamentTitle field'),

    check('Teamcode')
    .not()
    .isEmpty().withMessage('please file the Teamcode field'),

    check('Gamestatus')
    .not()
    .isEmpty().withMessage('please file the Gamestatus field'),

    
];

exports.Team_Managsports=(req,res,next)=>{
    const result= validationResult(req).array();
    if(!result.length)
    return next();

    const error=result[0].msg;
    res.send({success:false,message:error})
}
