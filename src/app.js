import express from 'express';
import morgan from 'morgan';
import cors from 'cors'
import pkg from './../package.json';
import path from 'path';
import { createRoles } from './libs/initialSetup'; 
import userRoutes from './routes/user.routes';
import clientRoutes from './routes/client.routes';
import authRoutes from './routes/auth.routes';
import planRoutes from './routes/plan.routes';

const app = express();

 //execute initial setup functions
createRoles();
// createPlans();

//initial config
app.set('pkg', pkg);
app.use(morgan('dev'));
app.use(express.json()); //this will parse the body to json to be able to destruct body
app.use(cors({origin: 'https://sgk-r8nwc.ondigitalocean.app'}));
app.use('/static', express.static(path.join(__dirname, '../public')));

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
app.use('/api/plans', planRoutes);

export default app;