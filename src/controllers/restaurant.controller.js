import Restaurant from "../models/Restaurant";
import Meal from "../models/Meal";
import Ratings from "../models/Ratings";
import { distance } from "../helper";

Restaurant.hasMany(Meal, { as: "meals", foreignKey: "restaurant_id" });

export async function getAllRestaurants(req, res) {
  const a = await Restaurant.findAll({});
  res.json({
    data: a,
  });
}

export async function getNearRestaurants(req, res) {
  const { long, lat } = req.body;
  const a = await Restaurant.findAll({});
  
  a.map(x=>{
    return {
      ...x,
      distance:distance(parseFloat(lat),parseFloat(long),x.lat,x.long)
    }
  })
  distance(lat,long);
  res.json({
    status: "Ok",
    code: 200,
    data: a.map(x=>{
      let data=x
      data["distance"]
      return data
    }),
    message: "",
  });
}

export async function getRestaurantById(req, res) {
  const id = req.params.uid;
  const a = await Restaurant.findAll({
    where: {
      id: id,
    },
    include: [{ model: Meal, as: "meals" }],
  });
  res.json({
    data: a,
  });
}

export async function getAllRating(req, res) {
  const a = await Ratings.findAll();
  res.json({
    data: a,
  });
}
