const bookModel = require('../models/Book.model');
const customerModel = require('../models/Customer.model');
const User = require('../models/User.model');
module.exports = {
    buy: function (req, res) {
        
    const book = req.body.id;
    const quantity = req.body.quantity;
       // console.log(User);  
    if (!book){
        return res.status(401).send({
            status: false,
            msg: "Invalid data"
        });
    } else {
        const user= req.session.id;
        User.updateOne({ "_id": req.session.id }, { $set: { "books": req.body.id } }).exec();
        let newCustomer = new customerModel({
            user,
            book,
            quantity
        });
        newCustomer
            .save()
            .then(customer => {
                res.json({
                    status: true,
                    msg: 'New Customer added to the list!',
                    data: customer
                });

                var _id = book;
                var id = user;            
        
               bookModel.updateOne({ _id }, { $inc: { inventory: -(parseInt(quantity)) } , $set:{users: id}})
                   .exec()
                   
            
                .catch(err => {
                   return res.status(500).send({
                   status: false,
                   msg: err
                   });
                    
                });
                
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
