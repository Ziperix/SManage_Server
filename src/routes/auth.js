const router = require('express').Router();
const User = require('../model/user.js');
const validator = require('../tools/validation.js');
const crypto = require('../tools/cryptography.js');
const jwt = require('jsonwebtoken');
const verify = require('../tools/tokenVerification.js');


router.post('/register', async (req,res) => 
{
    const user = new User
    ({
        perm: req.body.perm,
        name: req.body.name,
        username: req.body.username,
        password: crypto.SHA512(req.body.password)
    });
    try
    {
        if(validator.ValidateUsername(req.body.username))
        {
            if(validator.ValidatePassword(req.body.password))
            {
                if(validator.ValidateSchoolCode(req.body.code))
                {
                    const savedUser = await user.save();
                    res.status(200).send({
                        code: "S1",
                        reason: "User created successfully"
                    });
                }
                else
                {
                    //Code Failed
                    res.status(400).send({
                        code: "E3",
                        reason: "Incorrect code used for registration" 
                   });
                }
            }
            else
            {
                //Password Failed
                res.status(400).send({
                    code: "E2",
                    reason: `Password needs to be between ${process.env.PASSWORD_MIN} and ${process.env.PASSWORD_MAX_PLAIN } characters long`
                });
            }
        }
        else
        {
            //Username Failed
            res.status(400).send({
                code: "E1",
                reason: `Username needs to be between ${process.env.USERNAME_MIN} and ${process.env.USERNAME_MAX } characters long`
            });
        }
    }
    catch(error)
    {
        if(error.code == 11000)
        {
            res.status(400).send({
                code: "E4",
                reason: "User already exists"
            });
        }
        else
        {
            res.status(400).send(error);
        }
    }
});

router.post('/login', async (req, res) =>
{
    try
    {
        if(validator.ValidateUsername(req.body.username))
        {
            if(validator.ValidatePassword(req.body.password))
            {
                const user = await User.findOne({username: req.body.username});
                if(!user || user.password != crypto.SHA512(req.body.password))
                {
                    res.status(400).send({
                        code: "E5",
                        reason: "Incorrect username or password during login"
                    });
                }
                else
                {
                    //JWT
                    const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN);
                    res.header("jwt-token", token).send({
                        code: "S2",
                        reason: "Login successful",
                        token: token,
                        _id: user.id
                    });
                }
            }
            else
            {
                //Password Failed
                res.status(400).send({
                    code: "E2",
                    reason: `Password needs to be between ${process.env.PASSWORD_MIN} and ${process.env.PASSWORD_MAX_PLAIN } characters long`
                });
            }
        }
        else
        {
            //Username Failed
            res.status(400).send({
                code: "E1",
                reason: `Username needs to be between ${process.env.USERNAME_MIN} and ${process.env.USERNAME_MAX } characters long`
            });
        }
    }
    catch(error)
    {
        res.status(400).send(error);
    };
});

module.exports = router;