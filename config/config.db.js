const mongoose = require('mongoose');

const uri = `mongodb://127.0.0.1:27017/library-db`;

mongoose.connect(uri, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to mongo server successfully! :) \n');
    })
    .catch(err => {
        console.log('Failed to connect to mongo server :( \n ')
        console.log(err);
    });


module.exports = mongoose;