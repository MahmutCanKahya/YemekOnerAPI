const User = require('../db/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const GenericResponseModel = require('../../GenericResponseModel');


function validateUser(user) {
    const validEmail = typeof user.email == 'string' &&
        user.email.trim() != '';
    const validPassword = typeof user.password == 'string' &&
        user.password.trim() != '' &&
        user.password.trim().length >= 6;
    return validEmail && validPassword;
}

exports.user_signup = (req, res, next) => {
    let loGenericResponse = new GenericResponseModel();
    if (validateUser(req.body)) {
        User
            .getOneByEmail(req.body.email)
            .then(user => {
                if (!user) {
                    //email in use
                    bcrypt.hash(req.body.password, 7)
                        .then(hash => {
                            const user = {
                                email: req.body.email,
                                password: hash,
                                username: req.body.username
                            }
                            User.create(user)
                                .then(createdUser => {
                                    loGenericResponse.code = 201;
                                    loGenericResponse.status = "Ok";
                                    loGenericResponse.data = createdUser
                                    return res.status(201).json({
                                        data: loGenericResponse
                                    })
                                });

                        })

                } else {

                    next(new Error('Email in use'));
                }

            })
    } else {
        next(new Error("Invalid user"))
    }

}

exports.user_validate = (req, res, next) => {
    let loGenericResponse = new GenericResponseModel();
    if (validateUser(req.body)) {
        User
            .getOneByEmail(req.body.email)
            .then(user => {
                if (user) {
                    bcrypt.compare(req.body.password, user.password)
                        .then(result => {
                            if (result) {
                                //console.log(process.env.NODE_ENV)

                                const token = jwt.sign(
                                    {
                                        email: user.email,
                                        userId: user.id
                                    },
                                    //process.env.JWT_KEY,
                                    "secret",
                                    {
                                        expiresIn: "30d",

                                    })
                                loGenericResponse.data = {
                                    ...user,
                                    token
                                }
                                loGenericResponse.status = "Ok";
                                loGenericResponse.code = 200;
                                loGenericResponse.message = "Login success!!"
                                //res.cookie('user_id',user.id)
                                res.json(loGenericResponse)
                            } else {
                                next(new Error('Invalid login'))
                            }

                        })
                } else {
                    next(new Error('Invalid login'))
                }



            });
    } else {
        next(new Error('Invalid login'))
    }
}