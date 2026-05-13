export interface RegisterInput {
  email: string;
  password: string;
}

export interface RegisterResult {
  success: boolean;
  message?: string;
}
