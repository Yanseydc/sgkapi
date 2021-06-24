import { Router } from 'express';
import { authJWT }  from './../middlewares/index';
import * as clientsController from './../controllers/clients.controller';
const router = Router();

//routes
router.post('/', [authJWT.verifyToken], clientsController.createClient);

router.get('/', clientsController.getClients);

router.get('/:clientId', clientsController.getCLientById);

router.put('/:clientId', authJWT.verifyToken, clientsController.updateClientById);

router.delete('/:clientId', authJWT.verifyToken, clientsController.deleteClientById);

router.post('/checkIn', [authJWT.verifyToken], clientsController.checkInClient);

router.post('/payment', [authJWT.verifyToken], clientsController.paymentClient);



export default router;