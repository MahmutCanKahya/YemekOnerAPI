"use strict";
import express from "express";
import morgan from "morgan";
import { urlencoded, json } from "body-parser";

import auth from "./routes/User";
import restaurant from "./routes/Restaurant";
import recommend from "./routes/Recommend";
import meal from "./routes/Meal";

const PATH = "/api/v1/";

require("./database/database");

const app = express();
//middleware
app.use(morgan("dev"));
app.use(urlencoded({ extended: false }));
app.use(json());

//router
app.use(PATH + "account", auth);
app.use(PATH + "restaurant", restaurant);
app.use(PATH + "meal", meal);
app.use(PATH + "recommend", recommend);

// for cors policy
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,Content-Type,Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE"
    );
    return res.status(200).json({});
  }
  next();
});

//Handeling Error
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  var loGenericResponseModel = {};

  loGenericResponseModel.code = error.status || 500;
  loGenericResponseModel.status = "Fail";
  loGenericResponseModel.message = error.message;
  res.status(error.status || 500).json({ data: loGenericResponseModel });
});

export default app;
