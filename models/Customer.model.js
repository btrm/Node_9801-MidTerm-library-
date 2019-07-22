const db = require('../config/config.db');
const Schema = db.Schema;

const CustomerSchema = new Schema({
    user        : { type: Schema.Types.ObjectId, ref: 'User' },
    book        : { type: Schema.Types.ObjectId, ref: 'Book' },
    quantity    : { type: Number, min: 1 }
});

module.exports = db.model('Customer', CustomerSchema);