import { hash as _hash, compareSync } from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { isValidEmailAndPassword, generateToken } from "../helper";
import User from "../models/User";
import { getAllUsers, getUserById } from "../database/getData";


export async function getUsers(req, res) {
  const getUsers = await getAllUsers();
  res.json({
    status: "Ok",
    code: "200",
    message: "",
    data: getUsers
  });
}
export async function signUpUser(req, res) {
  const { email, password, username, name, surname,birth_date,city } = req.body;
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
        row_guid: uuidv4()
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
          "row_guid"
        ]
      }
    );
    if (newUser) {
      return res.status(201).json({
        status: "Ok",
        code: 201,
        message: "User create success !",
        data: newUser
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "error: " + e
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
      row_updated_date: new Date()
    },
    {
      where: { id }
    }
  );
  const user = await getUserById(id);
  return res.json({
    status: "Ok",
    code: "200",
    message: "",
    data: user
  });
}
export async function validateUser(req, res) {
  const { email, password } = req.body;
  if (isValidEmailAndPassword(req.body)) {
    User.findOne({
      where: {
        email
      }
    })
      .then(user => {
        if (user) {
          if (compareSync(password, user.password)) {
            const token = generateToken(user);
            const data = {
              ...user.dataValues,
              token
            };
            res.json({
              status:"Ok",
              code:"200",
              message:"",
              data,
            });
          } else {
            res.send("Kullanıcı bilgileri hatalı.");
          }
        } else {
          res.send("Kullanıcı bilgileri hatalı.");
        }
      })
      .catch(err => {
        res.send("error: " + err);
      });
  }

  /*let loGenericResponse = new GenericResponseModel();
  if (isUserValid(req.body)) {
    getOneByEmail(req.body.email).then(user => {
      if (user) {
        compare(req.body.password, user.password).then(result => {
          if (result) {
            //console.log(process.env.NODE_ENV)

            const token = sign(
              {
                email: user.email,
                userId: user.id
              },
              //process.env.JWT_KEY,
              "secret",
              {
                expiresIn: "30d"
              }
            );
            loGenericResponse.data = {
              ...user,
              token
            };
            loGenericResponse.status = "Ok";
            loGenericResponse.code = 200;
            loGenericResponse.message = "Login success!!";
            //res.cookie('user_id',user.id)
            res.json(loGenericResponse);
          } else {
            next(new Error("Invalid login"));
          }
        });
      } else {
        next(new Error("Invalid login"));
      }
    });
  } else {
    next(new Error("Invalid login"));
  }*/
}
