const express = require('express');
const handle  = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const confidDB = require('./config/config');
const session = require('express-session')
//require controller
const publisher = require('./controllers/publisher');
const game = require('./controllers/game');
const home = require('./controllers/home');

//db connection
mongoose.Promise = global.Promise;
mongoose.connect(confidDB.url,(err)=>{
    if(err){
        console.log('cant connect' + err);
    }else{
        console.log('connected to demo');
    }
})

const app = express();
const sess = {
    secret: 'keyboard cat',
    cookie: {}
}
app.use(session(sess))
//add middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('image'));

app.engine('handlebars', handle({
    layoutsDir: './views/layout',
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views/`);

app.use('/',home);
app.use('/publisher',publisher);
app.use('/game',game);

app.listen(8000,() => {
    console.log('listening to 8000');
});