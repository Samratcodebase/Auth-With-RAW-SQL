import type { LoginInput, RegisterInput } from "../types/auth.types.js";
import { AuthRepositories } from "../Repositories/auth.repositories.js";
import type { User } from "../types/db.types.js";
const Auth = new AuthRepositories();
const register = async ({ email, password }: RegisterInput) => {
  const user = await Auth.create({ email, password });

  return user;
};
const login = async ({ email, password }: LoginInput) => {
  try {
    const user = await Auth.login({ email, password });

    return user;
  } catch (error) {}
};

export default {
  register,
  login,
};
