import { hash as _hash, compareSync } from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { isValidEmailAndPassword, generateToken } from "../helper";
import User from "../models/User";
import Meal from "../models/Meal";
import Restaurant from "../models/Restaurant";
import sequelize from "../database/database";
import { getAllUsers, getUserById } from "../database/getData";

export async function getUsers(req, res) {
  const getUsers = await getAllUsers();
  res.json({
    status: "Ok",
    code: "200",
    message: "",
    data: getUsers,
  });
}
export async function signUpUser(req, res) {
  const {
    email,
    password,
    username,
    name,
    surname,
    birth_date,
    city,
  } = req.body;
  try {
    const loPassword = await _hash(password, 10);
    let newUser = await User.create(
      {
        name,
        surname,
        username,
        password: loPassword,
        email,
        birth_date,
        city,
        row_created_date: new Date(),
        row_guid: uuidv4(),
      },
      {
        fields: [
          "name",
          "surname",
          "username",
          "password",
          "email",
          "birth_date",
          "city",
          "row_created_date",
          "row_guid",
        ],
      }
    );
    if (newUser) {
      return res.status(201).json({
        status: "Ok",
        code: 201,
        message: "User create success !",
        data: newUser,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "error: " + e,
    });
  }

  console.log(req.body);
}
export async function updateUser(req, res) {
  const { id } = req.params;
  const { email, password, username, name, surname } = req.body;
  const [numberOfAffectedRows, affectedRows] = await User.update(
    {
      name,
      surname,
      username,
      password,
      email,
      row_updated_date: new Date(),
    },
    {
      where: { id },
    }
  );
  const user = await getUserById(id);
  return res.json({
    status: "Ok",
    code: "200",
    message: "",
    data: user,
  });
}
export async function validateUser(req, res) {
  const { email, password } = req.body;

  if (isValidEmailAndPassword(req.body)) {
    User.findOne({
      where: {
        email,
      },
    })
      .then((user) => {
        if (user) {
          Restaurant.belongsTo(Meal, {
            foreignKey: "id",
            as: "meal",
          });
          Meal.belongsTo(Restaurant, {
            as: "restaurant",
            foreignKey: "restaurant_id",
          });

          if (compareSync(password, user.password)) {
            const token = generateToken(user);
            let data = {
              ...user.dataValues,
              token,
            };
            if (data.is_first_login) {
              //eğer ilk giriş ise 10 tane yemek önerisi yapılacak
              Meal.findAll({
                order: sequelize.random(),
                limit: 10,
                include: [{ model: Restaurant, as: "restaurant" }],
              }).then((meals) => {
                data = {
                  ...data,
                  suggest_meals: meals
                };
            
                res.json({
                  status: "Ok",
                  code: "200",
                  message: "",
                  data,
                });
              });
            } else {
              res.json({
                status: "Ok",
                code: "200",
                message: "",
                data,
              });
            }
          } else {
            res.json({
              status: "Error",
              code: "-1",
              message: "Kullanıcı adı ve şifre eşleşmiyor1.",
              data: null,
            });
          }
        } else {
          res.json({
            status: "Error",
            code: "-1",
            message: "Kullanıcı adı ve şifre eşleşmiyor2.",
            data: null,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({
          status: "Error",
          code: "-1",
          message: "Kullanıcı adı ve şifre eşleşmiyor3.",
          data: null,
        });
      });
  } else {
  }
}
