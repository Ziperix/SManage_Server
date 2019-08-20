const jwt = require('jsonwebtoken');

module.exports = function (req, res, next)
{
    const token = req.header('jwt-token');
    if(!token)
    {
        return res.status(401).send({
            code: "E7",
            reasion: "Access Denied"
        });
    }
    try
    {
        const getVerified = jwt.verify(token, process.env.JWT_TOKEN);
        req.user = getVerified;
        next();
    }
    catch(error)
    {
        res.status(400).send({
            code: "E6",
            reason: "Invalid Token"
        });
    }
}