import { Router } from 'express';
import * as authController from './../controllers/auth.controller';
import { verifySignup } from './../middlewares/index';

const router = Router();

router.post('/signup', [
        verifySignup.checkRolesExist,
        verifySignup.verifyUser
    ],authController.signUp);
router.post('/signin', authController.signIn);


export default router;