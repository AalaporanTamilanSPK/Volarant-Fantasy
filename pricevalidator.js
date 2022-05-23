// const {check,validationResult}=require('express-validator');
// exports.validatorprice=[

//     check('JoiningFee')
//     .not()
//     .isEmpty().withMessage('please file the JoiningFee field'),

//     check('WinningAmount')
//     .not()
//     .isEmpty().withMessage('please file the WinningAmount field'),

//     check('WinnersCount')
//     .not()
//     .isEmpty().withMessage('please file the WinnersCount field'),

//     check('EnterMaxTeams')
//     .not()
//     .isEmpty().withMessage('please file the EnterMaxTeams field'),

//     check('EntryType')
//     .not()
//     .isEmpty().withMessage('please file the EntryType field'),

//     check('Gamestatus')
//     .not()
//     .isEmpty().withMessage('please file the Gamestatus field'),
    
//     check('MinimumRank')
//     .not()
//     .isEmpty().withMessage('please file the MinimumRank field'),

//     check('MaximumRank')
//     .not()
//     .isEmpty().withMessage('please file the MaximumRank field'),

//     check('Amount')
//     .not()
//     .isEmpty().withMessage('please file the Amount field'),


// ];

// exports.Contest_Pricepool=(req,res,next)=>{
//     const result= validationResult(req).array();
//     if(!result.length)
//     return next();

//     const error=result[0].msg;
//     res.send({success:false,message:error})
// }
