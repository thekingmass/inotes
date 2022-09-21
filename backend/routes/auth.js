const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'iamthekingm@$$';

// Create a User using: POST "/api/auth/createuser" . No login Required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid Name").isLength({ min: 3 }),
    body("email", " Enter a Valid email").isEmail(),
    body("password", "password should be min of 5 chars").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // If there are errors return bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // check wheather the user with this email already exist
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }

      const salt =await bcrypt.genSalt(10); // it will create a password salt and assign into salt variable
      secPass = await bcrypt.hash(req.body.password, salt) // it will create the hash code for our password+salt and assign to secPass variable

      // creating a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user:{
          id:user.id
        }
      }

      const authtoken = jwt.sign(data, JWT_SECRET);
      
      res.json({ authtoken });
      
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error occured");
    }
  }
);

module.exports = router;
