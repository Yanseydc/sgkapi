import app from './app'
import './database'; 
import dotenv from 'dotenv';

dotenv.config();
app.listen(process.env.PORT);

console.log('server listen on ', process.env.PORT);