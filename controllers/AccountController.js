const bcrypt = require('bcrypt')
const User = require('../models/User')
const dbCommandModule = require('../utilities/dbCommands')
const addUser = dbCommandModule.addUserFunc
require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET

exports.postRegister = async function(req,res) {
    const {username, email, password, membershipLength} = req.body.state
    const securePassword = await bcrypt.hash(password, 10)
    const output = await addUser(username, email, securePassword, membershipLength)
    res.send(output)
}
exports.postLogin = async function(req,res) {
    const {username, email, password, loginMethod} = req.body.state
    let user = {}
    if(loginMethod === "email") {
        user = await User.findOne({email}).lean() // lean disables unnecessary functionality
    }
    else {
        user = await User.findOne({username}).lean() // lean disables unnecessary functionality
    }
        if(await bcrypt.compare(password, user.password)) {
            res.send('success')
        }
        else {
            res.send('fail')
        }
}


exports.postPassword = async function(req,res) {
    const token = req.body.token
    const username = req.body.username
    const newPass = req.body.state.newPass
    const currentPass = req.body.state.currentPass
    const userInfo = await User.findOne({username}).lean() // lean disables unnecessary functionality
    if(await bcrypt.compare(currentPass, userInfo.password)) {
        try { 
            const user = jwt.verify(token, JWT_SECRET)
            const _id = user.id 
                const hashedPassword = await bcrypt.hash(newPass, 10)
                await User.updateOne({_id}, {
                    $set: {password: hashedPassword}
            })
            res.send('success')
        }
        catch {
            res.send("again")
        }
    }
    else {
        res.send("wrong")
    }
}
