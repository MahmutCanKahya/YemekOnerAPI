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
      userId: user.id,
    },
    //process.env.JWT_KEY,
    "secret",
    {
      expiresIn: "7d",
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
export function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295; // Math.PI / 180
  var c = Math.cos;
  var a =
    0.5 -
    c((lat2 - lat1) * p) / 2 +
    (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}
