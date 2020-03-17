const Restaurant = require('../db/restaurant');
const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')
const { RestaurantModel } = require('../models/RestaurantModel')
const GenericResponseModel = require('../../GenericResponseModel');
const { v4 } = require('uuid');

router.get('/', checkAuth, (req, res) => {
    var loGenericResponseModel = new GenericResponseModel();
    var loRestaurantModel = RestaurantModel;
    Restaurant.getAll().then(restaurants => {
        if (restaurants) {
            loGenericResponseModel.status = "Ok"
            loGenericResponseModel.code = 200;
            loGenericResponseModel.data = restaurants
        } else {
            loGenericResponseModel.status = "Empty"
            loGenericResponseModel.code = 200;
            loGenericResponseModel.message = "Restaurant is a Empty"
        }
        res.json({
            data: loGenericResponseModel
        })
    });

})

router.post('/', checkAuth, (req, res) => {
    var loGenericResponseModel = new GenericResponseModel();
    var createRestaurant =
    {
        ...req.body,
        row_guid: v4()
    }
    console.log(createRestaurant)

    Restaurant.create(createRestaurant).then(createdRestaurant => {
        if (createdRestaurant) {
            loGenericResponseModel.status = "Ok"
            loGenericResponseModel.code = 200;
            loGenericResponseModel.data = createdRestaurant
        } else {
            loGenericResponseModel.status = "Not Created"
            loGenericResponseModel.code = 404;
            loGenericResponseModel.message = "Restaurant not create"
        }
        res.json({
            data: loGenericResponseModel
        })
    })




})





module.exports = router