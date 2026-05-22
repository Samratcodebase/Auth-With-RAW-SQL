import dotenv from "dotenv";
dotenv.config();

import { z } from "zod";

const EnvSchema = z.object({
  JWT_SECRET_KEY: z.string().min(1),

  PORT: z.coerce.number().default(3000),

  DB_HOST: z.string().min(1),
  DB_USER: z.string().min(1),
  DB_PASS: z.string().min(1),
  DB_NAME: z.string().min(1),

  DB_PORT: z.coerce.number(),
});

const loadENV = () => {
  const parsed = EnvSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("❌ Invalid Environment Variables");

    process.exit(1);
  }

  return parsed.data;
};

export const ENV = loadENV();
