const bookModel = require('../models/Book.model');

module.exports = {
    list: function (req, res) { 

        bookModel
            .find({})
            .then(books => {
                res.json({
                    status: true,
                    data: books
                });
            })
            .catch(err => {
                return res.status(500).send({
                    status: false,
                    msg: err
                });
            })
    },

    create:function (req,res) {
        const {
            title,
            description,
            author,
            inventory,
            price
        } = req.body;
    
        if (
            !title || 
            !description || 
            !author || 
            !inventory ||
            !price
        ){
            return res.status(401).send({
                status: false,
                msg: "Invalid data"
            });
        } else {
            const newBook = new bookModel(req.body);
            newBook
                .save()
                .then(newBook => {
                    if (newBook){
                        res.json({
                            status: true,
                            data: newBook,
                            msg: 'Created the book successfully'
                        });
                    } else {
                        return res.status(500).send({
                            status: false,
                            msg: (res, 'Can\'t create book')
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
    },
    getBook: function (req, res) {
        const { id } = req.params;
        if (!id) {
            return res.status(401).send({
                status: false,
                msg: "Invalid data"
            });
        } else {
            bookModel
                .findById(id)
                .then(book => {
                    if (!book) {
                        return res.json({
                            status: false,
                            msg: 'Book not found',
                            data: {}
                        });
                    }
                    res.json({
                        status: true,
                        msg: 'Book found successfuly',
                        data: book
                    });
                })
                .catch(err => {
                    return res.status(500).send({
                        status: false,
                        msg: err
                    });
                });
        }
    },
    deleteBook: function (req, res) {
        const { id } = req.params;
        if (!id) {
            return res.status(401).send({
                status: false,
                msg: "Invalid data"
            });
        } else {
            bookModel
                .findByIdAndRemove({ _id: id })
                .then(book => {
                    if (!book) {
                        return res.json({
                            status: false,
                            msg: 'Book not found',
                            data: {}
                        });
                    }
                    res.json({
                        status: true,
                        msg: 'Book deleted successfuly',
                        data: book
                    });
                })
                .catch(err => {
                    return res.status(500).send({
                        status: false,
                        msg: err
                    });
                });
        }
    },
    updateBook: function (req, res) {
        const { id } = req.params;
        if (!id) {
            return res.status(401).send({
                status: false,
                msg: "Invalid data"
            });
        } else {
            bookModel.findOneAndUpdate({ _id: id }, req.body)
                .then(book => {
                    if (!book) {
                        return res.json({
                            status: false,
                            msg: 'Book not found',
                            data: {}
                        });
                    }
                    res.json({
                        status: true,
                        msg: 'Book updateded successfuly',
                        data: book
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
