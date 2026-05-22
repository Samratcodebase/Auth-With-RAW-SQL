import User from "../Repositories/user.respositories.js";
const profile = async (userID: number) => {
  const user = await User.getProfile(userID!);
  return user;
};

export default { profile };
