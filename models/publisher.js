const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const publisherSchema = new Schema({
    name:  { type : String, required:true,  unique:true}
});

module.exports = mongoose.model('publisher', publisherSchema);