const userModel = require('../models/User.model');

module.exports = {
    updateInfo: function (req, res) {
        const { id } = req.params;
        //console.log(id)
        if (!id) {
            return res.status(401).send({
                status: false,
                msg: "Invalid data"
            });
        } else {
            userModel
            .findOneAndUpdate({ _id: id }, req.body)
                .then(user => {
                    if (!user) {
                        return res.json({
                            status: false,
                            msg: 'User not found',
                            data: {}
                        });
                    }
                    res.json({
                        status: true,
                        msg: 'profile updateded successfuly',
                        data: user
                    });
                })
                .catch(err => {
                    res.status(500).send({
                        status: false,
                        msg: err
                    });
                })
        }
  
    },
    userProfile: function (req, res) {
        const userId = req.session.id;
        userModel.findById(userId, 'name email books')
            .populate([
                {
                    path: 'book',
                    select: ['title', 'author', 'description', 'price'],
                }
            ])
            .then(user => {
                if (!user) {
                    res.json({
                        status: false,
                        msg: 'User does not exist',
                        data: {}
                    });
                } else {
                    res.json({
                        status: true,
                        msg: 'User founded successfuly!',
                        data: user
                    });
                }
            })
            .catch(err => {
                return res.status(500).send({
                    status: false,
                    msg: err
                });
            });
    }
};


