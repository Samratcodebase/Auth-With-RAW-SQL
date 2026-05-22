import type { LoginInput, RegisterInput } from "../types/auth.js";
import { Auth } from "../Repositories/auth.repositories.js";


const register = async ({ email, password }: RegisterInput) => {
  const user = await Auth.create({ email, password });

  return user;
};
const login = async ({ email, password }: LoginInput) => {
  try {
    const user = await Auth.login({ email, password });
    console.log(user);
    return user[0];
  } catch (error) {}
};

const setRefreshToken = async (id: number, token: string) => {
  try {
    const user = await Auth.setRefreshToken(id, token);

    return user;
  } catch (error) {}
};
export default {
  register,
  login,
  setRefreshToken,
};
