import Router from 'express';
import newPay  from '../controllers/payment-api.js';
import cors from 'cors';

const router  = Router(); 
router.post('/payment-api', newPay); 
router.get('/api/test', (req, res)=> res.json({test: "aa"}))

export default router;