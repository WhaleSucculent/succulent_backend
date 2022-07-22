import Router from 'express';
import newPay  from '../controllers/payment-api.js';
import cors from 'cors';

const router  = Router(); 
router.post('/payment-api', cors(), newPay); 

export default router;