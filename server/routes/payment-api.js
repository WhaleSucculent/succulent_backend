import Router from 'express';
import newPay  from '../controllers/payment-api.js';
import { createNewDelivery, deleteOneDelivery } from '../controllers/delivery.js';
import { createNewAddress, deleteOneAddress } from '../controllers/address.js';
import { createNewPayment, deleteOnePayment } from '../controllers/payment.js';
import { createNewOrder, deleteOneOrder } from '../controllers/order.js';

const router  = Router(); 

router.post('/payment-api', newPay); 
router.post('/createNewDelivery', createNewDelivery);
router.delete('/deleteOneDelivery/:id', deleteOneDelivery);
router.post('/createNewAddress', createNewAddress);
router.delete('/deleteOneAddress/:id', deleteOneAddress);
router.post('/createNewPayment', createNewPayment);
router.delete('/deleteOnePayment/:id', deleteOnePayment);
router.post('/createNewOrder', createNewOrder);
router.delete('/deleteOneOrder/:id', deleteOneOrder);

router.get('/test', (req, res)=> res.json({test: "aa"}));

export default router;