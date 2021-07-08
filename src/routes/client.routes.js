import { Router } from 'express';
import { authJWT }  from './../middlewares/index';
import * as clientsController from './../controllers/clients.controller';
const router = Router();

//routes
router.post('/', [authJWT.verifyToken], clientsController.createClient);

router.get('/', [authJWT.verifyToken], clientsController.getClients);

router.get('/:clientId', [authJWT.verifyToken], clientsController.getCLientById);

router.put('/:clientId', [authJWT.verifyToken, authJWT.isAdmin], clientsController.updateClientById);

router.delete('/:clientId', [authJWT.verifyToken, authJWT.isAdmin], clientsController.deleteClientById);

router.post('/checkIn', [authJWT.verifyToken], clientsController.checkInClient);

router.post('/payment', [authJWT.verifyToken], clientsController.paymentClient);



export default router;