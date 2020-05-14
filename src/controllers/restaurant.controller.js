import Restaurant from "../models/Restaurant";
import Meal from "../models/Meal";

Restaurant.hasMany(Meal, { as: "meals", foreignKey: "restaurant_id" });

export async function getAllRestaurants(req, res) {
  const a = await Restaurant.findAll({
    include: [{ model: Meal, as: "meals" }],
  });
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
