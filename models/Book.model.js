const db = require('../config/config.db');
const Schema = db.Schema;

const BookSchema = new Schema({
    title       : { type: String, required: true },
    description : { type: String, required: true },
    author      : { type: String, required: true },
    inventory   : { type: Number, min: 0, required: true },
    price       : { type: Number, min: 5, required: true },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = db.model('Book', BookSchema);