import Router from 'express';
import newPay  from '../controllers/payment-api.js';
import cors from 'cors';

const router  = Router(); 
router.post('/payment-api', newPay); 

export default router;