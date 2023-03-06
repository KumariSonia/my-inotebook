const express = require('express')
const router = express.Router()
const User = require('../models/Users')
const { body, validationResult } = require('express-validator');
const fetchUser = require('../middleware/fetchUser')
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var jwtSecretToken = "shhhhshhhshhsh";

//Route 1: Create a User using: Post "/api/auth/createuser". No login require
router.post('/createuser', [body('name', 'Enter a valid name').isLength({ min: 3 }),
body('email', 'Enter a valid email').isEmail(),
body('password', 'enter a valid password').isLength({ min: 5 })], async (req, res) => {

    let success = false

    //If there are error, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success = false;
        return res.status(400).json({ success, errors: errors.array() });
    }

    //check weather the user with this email exists already
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            success = false
            return res.status(400).json({ success, errors: 'Sorry a user with this email alre3ady exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(req.body.password, salt);
        //Create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePassword
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, jwtSecretToken);
        success = true;
        res.json({ success, authToken })
        // res.json(user)
    }
    catch (error) {
        success = false;
        res.status(500).send(success, "Ineternal server error " + error);
    }
})

//Route 2: Authenticate a User using: Post "/api/auth/login". No login require

router.post('/login', [body('email', 'Enter a valid email').isEmail(),
body('password', 'password cannot be blank').exists()], async (req, res) => {
    //If there are error, return Bad request and the errors
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success = false;
        return res.status(400).json({ success, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {

        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ success, error: 'Please try t login with correct credentials' });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: 'Please try t login with correct credentials' });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, jwtSecretToken);
        success = true;
        res.json({ success, authToken })

    } catch (error) {
        success = false;
        res.status(500).send(success, "Ineternal server error " + error);
    }
})

//Route 3: Get User detail using: POST "/api/auth/getuser". No login required

router.post('/getuser', fetchUser, async (req, res) => {

    try {
        let userId = req.user.id
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        res.status(500).send("Ineternal server error " + error);
    }
})

module.exports = router