const router = require('express').Router();

//test function 
router.get('/', async (req,res) =>
{
    res.json
    ({
        test: "test"     
    })
});

module.exports = router;