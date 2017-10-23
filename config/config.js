const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
    secret: crypto,
    url : 'mongodb://wu134679:wu134679@ec2-18-216-51-130.us-east-2.compute.amazonaws.com/dummyDB'
}