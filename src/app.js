import express from 'express';
import morgan from 'morgan';
import cors from 'cors'
import pkg from './../package.json';
import { createRoles } from './libs/initialSetup'; 
import userRoutes from './routes/user.routes';
import clientRoutes from './routes/client.routes';
import authRoutes from './routes/auth.routes';
const app = express();

createRoles(); //execute create roles function

app.set('pkg', pkg);
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());


//apis
app.get('/', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    })
});

app.use('/api/clients', clientRoutes);
app.use('/api/users', userRoutes); //to avoid type users on every router from users.routes
app.use('/api/auth', authRoutes);

export default app;