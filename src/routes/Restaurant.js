import { Router } from "express";
const router = Router();
import checkAuth from "../middleware/check-auth";
import { v4 } from "uuid";
import Restaurant from "../models/Restaurant";
import Menu from "../models/Menu";
import Ratings from "../models/Ratings";

router.get("/", async );

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
    let myData=data.toString()
  
    res.json({
      data,
      myData
    });
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