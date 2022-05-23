const {check,validationResult}=require('express-validator');
exports.userlogvalidator=[


    check('username')
    .trim() 
    .not()
    .isEmpty().withMessage('Please File The Username Field')
    .isAlpha().withMessage('plesse file the alaphbets only'),
 

    check('email')
       .trim()
       .not()
       .isEmpty()
       .withMessage('Email is required')
       .isEmail()
       .withMessage('It is not Email pattern'),

    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Password is required')
        .matches(/^(?=.*[!@#$%^&*])[a-zA-Z0-9 !@#$%^&*]{8,16}$/)
        .withMessage("password must be one special character")
        .isLength({ min: 5, max: 10})
        .withMessage('Password must be 6 to 10 characters'),
 
];

exports.loginvalidsports=(req,res,next)=>{
    const result= validationResult(req).array();
    if(!result.length)
    return next();

    const error=result[0].msg;
    res.send({success:false,message:error})
}
