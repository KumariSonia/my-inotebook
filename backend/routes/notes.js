const express = require('express')
const router = express.Router()
// const User = require('../models/user')

router.get('/', async (req, res) => {
    try {
        const aliens = await User.find()
        res.json(aliens)
    }
    catch (err) {
        res.send("Error " + err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const alien = await User.findById(req.params.id)
        res.json(alien)
    }
    catch (err) {
        res.send("Error " + err)
    }
})

router.post('/', async (req, res) => {
    console.log(req.body)
    const user = new User(
        {
            name: req.body.name,
            tech: req.body.tech,
            sub: req.body.sub
        }
    )
    try {
        const savedUser = await user.save()
        res.json(savedUser)
    }
    catch (err) {
        res.send("Error " + err)
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const alien = await User.findById(req.params.id)
        alien.sub = req.body.sub
        const updatedAlien = await alien.save()
        res.json(updatedAlien)
    }
    catch (err) {
        res.send("Error " + err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const alien = await User.findById(req.params.id)
        const deletedAlien = await alien.remove(alien)
        res.json(deletedAlien)
    }
    catch (err) {
        res.send("Error " + err)
    }
})



module.exports = router