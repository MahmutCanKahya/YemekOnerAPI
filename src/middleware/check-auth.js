const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  let responseData = {
    code: -1,
    status: "",
    message: "",
    data: null,
  };
  const token = req.headers.authorization;
  responseData.code = 401;
  responseData.status = "Fail";
  responseData.message = "Access denied. No token provided.";
  if (!token) return res.status(401).json(responseData);

  try {
    const decoded = jwt.verify(token.split(" ")[1], "secret");
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    responseData.code = 400;
    responseData.status = "Fail";
    responseData.message = "Invalid token.";
    res.status(400).json(responseData);
  }
};
