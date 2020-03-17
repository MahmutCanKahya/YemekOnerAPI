const routes = require('express').Router();
const auth = require('./auth');




routes.use("/", auth);


module.exports = routes;