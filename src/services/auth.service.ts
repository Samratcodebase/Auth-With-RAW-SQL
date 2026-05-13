import type { RegisterInput } from "../types/auth.types.js";
import { AuthRepositories } from "../Repositories/auth.repositories.js";

const Auth = new AuthRepositories();
const register = async ({ email, password }: RegisterInput) => {
  const res = await Auth.create({ email, password });

  return res;
};
const login = async ({ email, password }: RegisterInput) => {};

export default {
  register,
  login,
};
