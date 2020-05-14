import Restaurant from "../models/Restaurant";
import Meal from "../models/Meal";
import Ratings from "../models/Ratings";

Restaurant.hasMany(Meal, { as: "meals", foreignKey: "restaurant_id" });

export async function getAllRestaurants(req, res) {
  const a = await Restaurant.findAll({});
  res.json({
    data: a,
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
