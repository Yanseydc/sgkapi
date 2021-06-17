import { Router } from 'express';
import { verifyToken }  from './../middlewares/index';
import * as clientsController from './../controllers/clients.controller';
const router = Router();

//routes
router.post('/', verifyToken, clientsController.createClient);

router.get('/', clientsController.getClients);

router.get('/:clientId', clientsController.getCLientById);

router.put('/:clientId', clientsController.updateClientById);

router.delete('/:clientId', clientsController.deleteClientById);

export default router;