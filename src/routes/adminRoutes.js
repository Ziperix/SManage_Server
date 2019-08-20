const router = require('express').Router();
const verify = require('../tools/tokenVerification.js');
const User = require('../model/user.js');

//test function 
router.get('/testPerm', verify, async (req,res) =>
{
    const currentUser = await User.findOne({_id: req.user});
    if(currentUser.perm < 3)
    {
        res.status(400).send({
            code: "E7",
            reason: "Access Denied"
        })
    }
    else
    {
        res.json({s: currentUser.name })
    }
});

module.exports = router;