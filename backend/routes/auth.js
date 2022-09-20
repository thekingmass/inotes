const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { eventWrapper } = require('@testing-library/user-event/dist/utils');


// Create a User using: POST "/api/auth" . Doesnt require authentication
router.post('/',[
    body('name','Enter a valid Name').isLength({ min: 3 }),
    body('email', ' Enter a Valid email').isEmail(),
    body('password', 'password should be min of 5 chars').isLength({ min: 5 }),
], (req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      }).then(user => res.json({user, message: "message"}))
      res.json({error: 'The Email Value should be unique'});
})

module.exports = router;