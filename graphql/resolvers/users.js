const bcypt = require('bcryptjs')
const bcrypt = require('bcryptjs/dist/bcrypt')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../../config')
const User = require('../../models/User')

module.exports = {
    Mutation: {
        async register(
            _, //-> parents before
            {
                registerInput: { username, email, password, confirmPassword }
            },
            context,
            info
        ){
            //Validate user input
            //User already exist
            //Hash password and create auth token
            password = await bcrypt.hash(password, 12)
            
            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            })

            const res = await newUser.save()

            const token = jwt.sign({
                id: res.id,
                email: res.email,
                username: res.username
            }, SECRET_KEY, {expiresIn: '1h'})

            return {
                ...res._doc,
                id:res._id,
                token
            }
        } 
    }
}