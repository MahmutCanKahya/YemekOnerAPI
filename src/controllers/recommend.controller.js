import Ratings from "../models/Ratings";
import User from "../models/User";

export async function saveRecommendation(req, res) {
  const { rates, user } = req.body;
  const { row_guid } = req.user;
  const keys = Object.keys(rates);
  for (let index = 0; index < keys.length; index++) {
    const rating = await Ratings.create(
      {
        meal_id: keys[index],
        rating: rates[keys[index]],
        user_id: row_guid,
        row_created_date: new Date(),
      },
      {
        fields: ["meal_id", "rating", "user_id", "row_created_date"],
      }
    );
    console.log(rating);
  }
  User.update(
    {
      is_first_login: false,
    },
    {
      where: {
        row_guid,
      },
    }
  ).then((resData) => {
    res.json({
      status: "Okey",
      code: 200,
      data: null,
      message: "",
    });
  });
}

export async function recommendMeal(req, res) {
  var spawn = require("child_process").spawn;
  var user_id = req.body.user_id;

  var process = spawn("python", ["hello.py", user_id]);
  console.log(process);
  process.stdout.on("data", function (data) {
    let myData = data.toString();
    console.log(data);
    res.json({
      data,
      myData,
    });
  });
}
