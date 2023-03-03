require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const logger = require('morgan');
var methodOverride =  require('method-override'); 
const { json, urlencoded } = require('body-parser');
const cookie = require('cookie-parser');
const cookieParser = require('cookie-parser');
var session = require('express-session');

const log = require('./middlewares/application/log.js')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookie());
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true
}));
//mis middlewares
app.use(log);


//Require routes
var indexRouter = require('./routes/main');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var cartRouter = require('./routes/carts');

//Settings
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/cart', cartRouter);


app.use((req, res, next) => {
    res.status(404).json({
        status: '404',
        description: 'page not found'
    })
});

module.exports = app;