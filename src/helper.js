import { sign } from "jsonwebtoken";

export function isValidEmailAndPassword(user) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const validEmail =
    typeof user.email == "string" &&
    user.email.trim() != "" &&
    user.email.match(mailformat);
  const validPassword =
    typeof user.password == "string" &&
    user.password.trim() != "" &&
    user.password.trim().length >= 6;
  return validEmail && validPassword;
}

export function generateToken(user) {
  return sign(
    {
      row_guid: user.row_guid,
      email: user.email,
      userId: user.id
    },
    //process.env.JWT_KEY,
    "secret",
    {
      expiresIn: "30d"
    }
  );
}

export function getUserIdFromToken() {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "secret");
  return decoded.id;
}

export function getUserRowGuidFromToken() {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "secret");
  return decoded.row_guid;
}
