var express = require('express');
var path = require('path')

var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var autoIncrement = require('mongoose-auto-increment');

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    console.log('mongodb connect');
})

var connect = mongoose.connect('mongodb://127.0.0.1:27017/shopping', {useMongoClient:true});
autoIncrement.initialize(connect);

var admin = require('./routes/admin');

var app = express();
var port = 3000;

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/uploads', express.static('uploads'));

app.get('/', function(req,res){
    res.send('first app');
});

app.use('/admin', admin);

app.listen( port, function(){
    console.log('Express listening on port', port);
});