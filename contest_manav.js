const {check,validationResult}=require('express-validator');
exports.validatorsports=[

    check('ContestTitle')
    .not()
    .isEmpty().withMessage('please file the ContestTitle field'),

    check('ContestSubTitle')
    .not()
    .isEmpty().withMessage('please file the ContestSubTitle field'),

    check('UploadImage')
    .not()
    .isEmpty().withMessage('please file the UploadImage field'),

    check('DiscountValue')
    .not()
    .isEmpty().withMessage('please file the DiscountValue field'),

    check('SelectGame')
    .not()
    .isEmpty().withMessage('please file the SelectGame field'),

    check('ContestType')
    .not()
    .isEmpty().withMessage('please file the ContestType field'),
    
    check('ContestGamestatus')
    .not()
    .isEmpty().withMessage('please file the ContestGamestatus field'),

    check('JoiningFee')
    .not()
    .isEmpty().withMessage('please file the JoiningFee field'),

    check('WinningAmount')
    .not()
    .isEmpty().withMessage('please file the WinningAmount field'),

    check('WinnersCount')
    .not()
    .isEmpty().withMessage('please file the WinnersCount field'),

    check('EnterMaxTeams')
    .not()
    .isEmpty().withMessage('please file the EnterMaxTeams field'),

    check('EntryType')
    .not()
    .isEmpty().withMessage('please file the EntryType field'),

    check('Gamestatus')
    .not()
    .isEmpty().withMessage('please file the Gamestatus field'),

    check('MinimumRank')
    .not()
    .isEmpty().withMessage('please file the MinimumRank field'),

    check('MaximumRank')
    .not()
    .isEmpty().withMessage('please file the MaximumRank field'),

    // check('Amount')
    // .not()
    // .isEmpty().withMessage('please file the Amount field'),
];

exports.Contest_Managsports=(req,res,next)=>{
    const result= validationResult(req).array();
    if(!result.length)
    return next();

    const error=result[0].msg;
    res.send({success:false,message:error})
}
