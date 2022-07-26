import dotenv from 'dotenv';

dotenv.config();

export const private_key = Buffer.from(process.env.PRIVATE_KEY, "base64").toString('ascii');
export const public_key = Buffer.from(process.env.PUBLIC_KEY, "base64").toString('ascii');