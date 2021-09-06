'use strict';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'
const User = require('../models/user')
const UserRegistration = async (req, res) => {
    const { username, password: plainTextPassword } = req.body
    if (!username || typeof username !== 'string') {
        return res.json({ status: 'error', error: 'Invalid username' })
    }

    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({ status: 'error', error: 'Invalid password' })
    }

    if (plainTextPassword.length < 5) {
        return res.json({
            status: 'error',
            error: 'Password too small. Should be atleast 6 characters'
        })
    }
    const password = await bcrypt.hash(plainTextPassword, 10)

    try {
        const response = await User.create({
            username,
            password
        })
    } catch (error) {
        if (error.code === 11000) {
            // duplicate key
            return res.json({ status: 'error', error: 'Username already in use' })
        }
        throw error
    }
    res.json({ status: 'Sucesss' })
}

const UserLogin = async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username }).lean()
    if (!user) {
        return res.json({ status: 'error', error: 'Invalid username/password' })
    }
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({
            id: user._id,
            username: user.username,
        }, JWT_SECRET
        )
        return res.json({ status: 'success', data: token })
    }
    res.json({
        status: "error",
        error: 'Invalid username/Password'
    })
}

module.exports = {
    UserRegistration,
    UserLogin
}