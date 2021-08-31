import dotenv from 'dotenv';
dotenv.config({
    path: '../.env'
});

export const SECRET = process.env.SECRET_KEY