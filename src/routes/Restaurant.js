import { getAll, create } from '../database/restaurant';
import { Router } from 'express';
const router = Router();
import checkAuth from '../middleware/check-auth';
import { v4 } from 'uuid';

router.get('/', checkAuth, (req, res) => {
    var loGenericResponseModel ;
    getAll().then(restaurants => {
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
    var loGenericResponseModel;
    var createRestaurant =
    {
        ...req.body,
        row_guid: v4()
    }
    console.log(createRestaurant)

    create(createRestaurant).then(createdRestaurant => {
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





export default router