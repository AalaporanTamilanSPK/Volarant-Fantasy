const {check,validationResult}=require('express-validator');
exports.validatorplayer=[

    check('PlayerFirstName')
    .not()
    .isEmpty().withMessage('please file the PlayerFirstName field'),

    check('PlayerLastName')
    .not()
    .isEmpty().withMessage('please file the PlayerLastName field'),

    check('PlayerReviews')
    .not()
    .isEmpty().withMessage('please file the PlayerReviews field'),

    check('UploadImage')
    .not()
    .isEmpty().withMessage('please file the UploadImage field'),
    
    check('Brithday')
    .not()
    .isEmpty().withMessage('please file the Brithday field'),

    check('HomeTown')
    .not()
    .isEmpty().withMessage('please file the HomeTown field'),

    check('Name')
    .not()
    .isEmpty().withMessage('please file the Name field'),

    check('Credits')
    .not()
    .isEmpty().withMessage('please file the Credits field'),

   
    check('Nationality')
    .not()
    .isEmpty().withMessage('please file the Nationality field'),

   
    check('SelectGame')
    .not()
    .isEmpty().withMessage('please file the SelectGame field'),

    check('SelectRole')
    .not()
    .isEmpty().withMessage('please file the SelectRole field')
];

exports.player_sports=(req,res,next)=>{
    const result= validationResult(req).array();
    if(!result.length)
    return next();

    const error=result[0].msg;
    res.send({success:false,message:error})
}
