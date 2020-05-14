import Ratings from "../models/Ratings";

export async function saveRecommendation(req, res) {
  const { rates, user } = req.body;
  const { row_guid } = req.user;
  console.log(rates, row_guid);
  for (let index = 0; index < rates.length; index++) {
    const x = await Ratings.create(
      {
        meal_id: rates[index].id,
        rating: rates[index].rating,
        user_id: row_guid,
        row_created_date: new Date(),
      },
      {
        fields: ["meal_id", "rating", "user_id", "row_created_date"],
      }
    );
    console.log(x);
  }

  res.json({});
}

export async function recommendMeal(req, res) {
  var spawn = require("child_process").spawn;
  var user_id = req.body.user_id;

  var process = spawn("python", ["hello.py", user_id]);

  process.stdout.on("data", function (data) {
    let myData = data.toString();

    res.json({
      data,
      myData,
    });
  });
}
