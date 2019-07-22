const userModel = require('../models/User.model');
const jwt = require('jsonwebtoken');

module.exports = {
    login: function (req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).send({
                status: false,
                msg: "Invalid data"
            });
        } else {
            userModel
                .findOne({ email })
                .then(user => {
                    if (!user) {
                        res.status(404).send({
                            status: false,
                            msg: 'User not found!'
                        });
                    } else {
                        user.comparePassword(password, function (err, isMatch) {
                            if (!err && isMatch) {
                                let claims = {
                                    expiresIn: '6h'
                                };
                                let payload = {
                                    id: user._id,
                                    name: user.name,
                                    email: user.email,
                                    isAdmin: user.isAdmin
                                };
                                jwt.sign(payload, req.app.get('secretKey'), claims, function (err, token) {
                                    if (err) throw new Error(err);
                                    res.json({
                                        status: true,
                                        data: token,
                                        msg: 'logged in successfuly!!'
                                    });
                                });
                            } else {
                                res.json({
                                    status: false,
                                    msg: 'Wrong email or password'
                                });
                            }
                        });
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        status: false,
                        msg: 'Authentication Failed!!!, Try again later...'
                    });
                });
        }

    },
    register: function (req , res) {
        const { email, password, name } = req.body;

    if (!email || !password || !name){
        return res.status(401).send({
            status: false,
            msg: "Invalid data"
        });
    } else { 

        userModel
            .findOne({email})
            .then(user => {
                if (!user){
                    const newUser = new userModel(req.body);
                    newUser
                        .save()
                        .then(user => {
                            res.json({
                                status: true,
                                msg: 'Congrats, New User created successfully ',
                                data: user
                            });
                        })
                        .catch(err => {
                            res.json({
                                status: false,
                                msg: 'Failed to create new user!!!',
                                data: err
                            });
                        });
                } else {
                    res.json({
                        status: false,
                        msg: 'User already exist!!!',
                        data: user
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    status: false,
                    msg: 'Registering User Failed!!!'
                });
            });
    }
    }
};
