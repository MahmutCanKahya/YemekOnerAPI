const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser')

const auth = require('./api/routes/user')
const restaurant = require('./api/routes/restaurant')

const PATH = "/api/v1/"

const GenericResponseModel = require('./GenericResponseModel')

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(PATH + "account", auth)
app.use(PATH + "restaurant", restaurant)
/*
app.use('/api/v1/', (req, res, next) => {
    next(require('./api/routes/index'));
});*/
// for cors policy

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers'
        , 'X-Requested-With,Content-Type,Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
})

//Handeling Error
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    var loGenericResponseModel = new GenericResponseModel();
    
    loGenericResponseModel.code = error.status || 500;
    loGenericResponseModel.status = "Fail"
    loGenericResponseModel.message = error.message;
    res.status(error.status || 500).json({ data: loGenericResponseModel })
});

module.exports = app;