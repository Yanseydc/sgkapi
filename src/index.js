import app from './app'
import './database'; 
import dotenv from 'dotenv';

dotenv.config();
app.listen(4000);

console.log('server listen on ', 4000);