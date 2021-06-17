import * as userController from './../controllers/users.controller';
import { authJWT, verifySignup } from './../middlewares/index';
import { Router } from 'express';
const router = Router();

//routes
router.post('/', [
        authJWT.verifyToken, 
        authJWT.isAdmin, 
        verifySignup.checkRolesExist,
        verifySignup.verifyUser
    ], 
    userController.createUser);
router.get('/', [authJWT.verifyToken, authJWT.isAdmin], userController.getUsers);



export default router;