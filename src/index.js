import app from './app'
import './database'; 
import dotenv from 'dotenv';

dotenv.config({
    path: '../.env'
});
app.listen(process.env.PORT);

