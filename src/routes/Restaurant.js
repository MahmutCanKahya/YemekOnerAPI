import { getAll, create } from "../database/restaurant";
import { Router } from "express";
const router = Router();
import checkAuth from "../middleware/check-auth";
import { v4 } from "uuid";
import Restaurant from "../models/Restaurant";
import Menu from "../models/Menu";

router.get("/", async (req, res) => {
  var loGenericResponseModel;
  Menu.hasMany(Restaurant, { as: "restaurant", foreignKey: "menu_id" });
  Restaurant.belongsTo(Menu, { as: "menu", foreignKey: "menu_id" });

  const a = await Restaurant.findAll({
    include: [{ model: Menu, as: "menu" }]
  });

  res.json({
    data: a
  });
});

router.post("/", checkAuth, (req, res) => {
  var loGenericResponseModel;
  var createRestaurant = {
    ...req.body,
    row_guid: v4()
  };
  console.log(createRestaurant);
  Restaurant.create()
});

export default router;
