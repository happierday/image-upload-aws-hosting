const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
    secret: crypto,
    url : 'mongodb://localhost:27017/demo'
}