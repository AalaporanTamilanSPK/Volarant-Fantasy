const {check,validationResult}=require('express-validator');
exports.validator=[

    check('Email')
       .trim()
       .not()
       .isEmpty()
       .withMessage('Email is required')
       .isEmail()
       .withMessage('It is not Email pattern'),

    check('Password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Password is required')
        .matches(/^(?=.*[!@#$%^&*])[a-zA-Z0-9 !@#$%^&*]{8,16}$/)
        .withMessage("password must be one special character")
        .isLength({ min: 5, max: 10})
        .withMessage('Password must be 6 to 10 characters'),

    check('Pattern')
     .trim() 
     .not()
     .isEmpty().withMessage('Please File The Pattern Field')
     .isNumeric().withMessage('plesse file the id only'),

    check('Adminwallet')
    .trim() 
    .not()
    .isEmpty().withMessage('Please File The Pattern Field'),
    
];

exports.adminsports=(req,res,next)=>{
    const result= validationResult(req).array();
    if(!result.length)
    return next();

    const error=result[0].msg;
    res.send({success:false,message:error})
}
// exports.conpass2obj=function(Email,Pattern){
//     return{Email,Pattern}
// }

