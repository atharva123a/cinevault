import { config } from 'dotenv';

config();

export const { PORT, JWT_SECRET, NODE_DEV } = process.env;
