import Restaurant from "../models/Restaurant";
import Meal from "../models/Meal";
import Ratings from "../models/Ratings";

export async function getAllMeal(req, res) {
  const a = await Meal.findAll({});
  res.json({
    data: a,
  });
}

export async function getMealById(req, res) {
  Meal.belongsTo(Restaurant, {
    as: "restaurant",
    foreignKey: "restaurant_id",
  });
  const id = req.params.uid;
  const a = await Meal.findAll({
    where: {
      id: id,
    },
    include: [{ model: Restaurant, as: "restaurant" }],
  });
  res.json({
    data: a,
  });
}
