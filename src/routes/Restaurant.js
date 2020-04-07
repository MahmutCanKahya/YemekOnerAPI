import { Router } from "express";
const router = Router();
import checkAuth from "../middleware/check-auth";
import { v4 } from "uuid";
import Restaurant from "../models/Restaurant";
import Menu from "../models/Menu";
import Ratings from "../models/Ratings";

router.get("/", async (req, res) => {
  var loGenericResponseModel;
  Menu.hasMany(Restaurant, { as: "restaurant", foreignKey: "menu_id" });
  Restaurant.belongsTo(Menu, { as: "menu", foreignKey: "menu_id" });

  const a = await Restaurant.findAll({
    include: [{ model: Menu, as: "menu" }],
  });

  res.json({
    data: a,
  });
});

router.get("/ratings", async (req, res) => {
  var loGenericResponseModel;

  const a = await Ratings.findAll();

  res.json({
    data: a,
  });
});
router.get("/recommender", (req, res) => {
  var spawn = require("child_process").spawn;
  var user_id = req.body.user_id;

  var process = spawn("python", ["hello.py",user_id]);

  process.stdout.on("data", function (data) {
    let myData=data.toString().split(" ");
    res.send(myData);
  });
});
/*
router.post("/", checkAuth, (req, res) => {
  var loGenericResponseModel;
  var createRestaurant = {
    ...req.body,
    row_guid: v4(),
  };
  console.log(createRestaurant);
  Restaurant.create();
});*/

export default router;
