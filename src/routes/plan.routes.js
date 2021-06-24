import { Router } from 'express';
import * as plansController from './../controllers/plans.controller';

const router = Router();

//routes;
router.get('/',  plansController.getPlans);

export default router;