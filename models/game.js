const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    name:  { type : String, required:true,  unique:true},
    publisher: { type : String, required:true },
    path: {type: String, required:true}
});

module.exports = mongoose.model('game', gameSchema);