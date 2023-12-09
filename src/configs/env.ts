import { configDotenv } from 'dotenv';
import { z } from 'zod';

let envSchema = z.object({
  BOT_TOKEN: z.string().min(1),
  CLIENT_ID: z.string().min(1),
  DEV_GUILD_ID: z.string().min(1),
});

configDotenv();

export const env = envSchema.parse(process.env);
