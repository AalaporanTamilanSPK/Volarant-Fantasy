const {check,validationResult}=require('express-validator');
exports.validatorsport=[

    check('SelectGame')
    .not()
    .isEmpty().withMessage('please file the SelectGame field'),

    check('SelectTournament')
    .not()
    .isEmpty().withMessage('please file the SelectTournament field'),

    check('A_TeamTitle')
    .not()
    .isEmpty().withMessage('please file the A_TeamTitle field'),

    check('A_Team_Icon')
    .not()
    .isEmpty().withMessage('please file the ATeamIcon field'),

    check('B_TeamTitle')
    .not()
    .isEmpty().withMessage('please file the B_TeamTitle field'),

    check('B_Team_Icon')
    .not()
    .isEmpty().withMessage('please file the BTeamIcon field'),
    
    check('Gamestatus')
    .not()
    .isEmpty().withMessage('please file the Gamestatus field'),

    check('MatchTime')
    .not()
    .isEmpty().withMessage('please file the MatchTime field')

];

exports.Match_Managsports=(req,res,next)=>{
    const result= validationResult(req).array();
    if(!result.length)
    return next();

    const error=result[0].msg;
    res.send({success:false,message:error})
}
