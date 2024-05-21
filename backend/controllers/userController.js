const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, 'hcbkscsdcuosdcoopscind', {expiresIn: '3d'}) // {_id: _id, SECRET. options}
}

// login user
const loginUser = async (req, res) => {
    const {email, password} = req.body
    console.log(req.body)
    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.status(200).json({ email, token })
    } catch (error) { 
        res.status(400).json({ error: error.message })
    }
}

// signup user
const signupUser = async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body
    console.log(req.body)
    try {
        const user = await User.signup(email, password)
        const token = createToken(user._id)
        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { loginUser, signupUser }