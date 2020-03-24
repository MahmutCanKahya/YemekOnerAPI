import { getAll, create } from "../database/restaurant";
import { Router } from "express";
const router = Router();
import checkAuth from "../middleware/check-auth";
import { v4 } from "uuid";
import Restaurant from "../models/Restaurant";
import Menu from "../models/Menu";

router.get("/", async (req, res) => {
  var loGenericResponseModel;
  Restaurant.hasMany(Menu, { as: "menu", foreignKey: "id" });
  Menu.belongsTo(Restaurant, { as: "restaurant", foreignKey: "id" });

  const a = await Restaurant.findAll({
    include: [{ model: Menu, as: "menu" }]
  });

  res.json({
    data: a
  });
  /*getAll().then(restaurants => {
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
    });*/
});

router.post("/", checkAuth, (req, res) => {
  var loGenericResponseModel;
  var createRestaurant = {
    ...req.body,
    row_guid: v4()
  };
  console.log(createRestaurant);

  create(createRestaurant).then(createdRestaurant => {
    if (createdRestaurant) {
      loGenericResponseModel.status = "Ok";
      loGenericResponseModel.code = 200;
      loGenericResponseModel.data = createdRestaurant;
    } else {
      loGenericResponseModel.status = "Not Created";
      loGenericResponseModel.code = 404;
      loGenericResponseModel.message = "Restaurant not create";
    }
    res.json({
      data: loGenericResponseModel
    });
  });
});

export default router;
