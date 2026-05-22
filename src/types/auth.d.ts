export interface RegisterInput {
  email: string;
  password: string;
}
export interface LoginInput extends RegisterInput {}
export interface RegisterResult {
  success: boolean;
  message?: string;
}
