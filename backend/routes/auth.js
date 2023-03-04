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

    //If there are error, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //check weather the user with this email exists already
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ errors: 'Sorry a user with this email alre3ady exists' });
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
        res.json({ authToken })
        // res.json(user)
    }
    catch (error) {
        res.status(500).send("Ineternal server error " + error);
    }
    // .then(user => res.json(user)).catch(err => {
    //     console.log(err)
    //     res.json({ error: 'Please enter unique value for email', message: err.message })
    // });
})

//Route 2: Authenticate a User using: Post "/api/auth/login". No login require

router.post('/login', [body('email', 'Enter a valid email').isEmail(),
body('password', 'password cannot be blank').exists()], async (req, res) => {
    //If there are error, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Please try t login with correct credentials' });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: 'Please try t login with correct credentials' });
        }

        const data  = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, jwtSecretToken);
        res.json({ authToken })

    } catch (error) {
        res.status(500).send("Ineternal server error " + error);
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