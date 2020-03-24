import User from "../models/User";

export async function getAllUsers() {
  const users = await User.findAll();
  return users;
}

export async function getUserById(id) {
  const user = await User.findOne({
    limit: 1,
    where: {
      id
    }
  });

  console.log(user.dataValues);
  return user.dataValues;
}

export async function getUserByRowGuid(row_guid) {
  await User.findOne({
    limit: 1,
    where: {
      row_guid
    }
  });
}
