const customerModel = require('../models/Customer.model');


module.exports = {

    list: function (re,res) {
        customerModel
        .find({})
        .populate([
            {
                path: 'user',
                select: ['name', 'email']
            }, 
            {
                path: 'book',
                select: ['title', 'author', 'description', 'price'],
                
            }
        ])
        .then(customers => {
            res.json({
                status: true,
                msg: 'Customers Listed successfuly!',
                data: customers
            });
        })
        .catch(err => {
            return res.status(500).send({
                status: false,
                msg: err
            });
        }); 
    },
    getCustomerById: function (req,res) {
        const { id } = req.params;

        if (!id){
            return res.status(401).send({
                status: false,
                msg: "Invalid data"
            });
        } else {
            customerModel
                .findById(id)
                .populate([
                    {
                        path: 'user',
                        select: ['name', 'email']
                    }, 
                    {
                        path: 'book',
                        select: ['title', 'author', 'description', 'price'],
                    
                    }
                ])
                .then(customer => {
                    if (!customer){
                        res.json({
                            status: false,
                            msg: 'Customer does not exist',
                            data: {}
                        });
                    } else {
                        res.json({
                            status: true,
                            msg: 'Customer founded successfuly!',
                            data: customer
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
    }

};
