const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    obj = {
        a: 'this is me',
        number : 54,
    }
    res.json(obj)
})

module.exports = router;