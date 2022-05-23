const {check,validationResult}=require('express-validator');
exports.validatoradwin=[

    check('Userid')
    .trim() 
    .not()
    .isEmpty()
    .withMessage('Please File The userid Field')
    .isNumeric()
    .withMessage('plesse file the Number only'),
    
    check('Firstname')
    .trim() 
    .not()
    .isEmpty()
    .withMessage('Please File The firstname Field'),
 
    check('Lastname')
    .trim() 
    .not()
    .isEmpty()
    .withMessage('Please File The lastname Field'),

    check('Ponits')
    .trim() 
    .not()
    .isEmpty()
    .withMessage('Please File The points Field')
    .isLength({ min: 5})
    .isNumeric()
    .withMessage('plesse file the Number only'),

    check('Victory')
    .trim() 
    .not()
    .isEmpty()
    .withMessage('Please File The victory Field')
    .isNumeric()
    .withMessage('plesse file the Number only'),

    check('Kill')
    .trim() 
    .not()
    .isEmpty()
    .withMessage('Please File The kill Field')
    .isNumeric()
    .withMessage('plesse file the Number only'),

];

exports.winnervalidsports=(req,res,next)=>{
    const result= validationResult(req).array();
    if(!result.length)
    return next();

    const error=result[0].msg;
    res.send({success:false,message:error})
}
