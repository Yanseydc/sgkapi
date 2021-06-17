import { Router } from 'express';
const router = Router();

//routes
router.get('/', (req, res) => {
    res.json('get users');
});



export default router;