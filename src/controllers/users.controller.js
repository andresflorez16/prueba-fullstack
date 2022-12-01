const User = require('../models/User')
const userController = {}

userController.signup = async (req, res) => {
    try {

        const { name, email, password } = req.body
        const errors = []
        if(name.length <= 0 || email.length <= 0) {
            errors.push( { text: 'Please verify fields' })
        }
        if(password.length < 4) {
            errors.push({ text: 'Password must be at least 4 characters!' })
        }
        const emailUser = await User.findOne({ email: email })
        if(emailUser) {
            errors.push( {text:'Email is already used'} )
        }
        if(errors.length > 0) {
            return res.json({ error_code: 500, msg: errors })
        }else {
            const user = new User({ name, email, password })
            user.password = await user.encryptPassword(password)
            await user.save()
            return res.json({ code: 201, msg: 'user created', user })
        }
    } catch (err) {
        console.log(err)
        return res.json({ error_code: 500, err })
    }
}

userController.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: email })

        if(!user) return res.json({ code: 401,  msg: 'user not found'})
        else {
            const match = await user.matchPassword(password)
            if(match) return res.json({ code: 200, msg: 'login', user })
            else return res.json({ code: 401, msg: 'incorrect password' })
        }
    } catch (err) {
        console.log(err)
        return res.json({ error_code: 500, err })
    }
}

userController.logout = async (req, res) => {
    try {
        return res.json({ code: 200, msg: 'user logout' })
    } catch (err) {
        console.log(err)
        return res.json({ error_code: 500, err })
    }
}

userController.users = async (req, res) => {
    try {
        const users = await User.find().sort({date: 'asc'}).lean()
        if (users) {
            return res.json({ 
                code: 200,
                users: users.map(user => ({ id: user._id, name: user.name, email: user.email })) 
            })
        }
        else return res.json({ code: 200, msg: 'not users' })
    } catch (err) {
        console.log(err)
        return res.json({ error_code: 500, err })
    }
}

module.exports = userController 
