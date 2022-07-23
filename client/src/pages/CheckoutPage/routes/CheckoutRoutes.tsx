import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Confirmation from '../components/confirmation/confirmation';
import Delivery from '../components/delivery/delivery';
import Payment from '../components/payment/payment';
import { CheckoutRoutePath } from './checkout-route-path';

export default function StepRoutes() {

  return (
      <Routes>
        <Route path={ CheckoutRoutePath.Delivery } element={<Delivery />} />
        <Route path={ CheckoutRoutePath.Payment } element={<Payment />} />
        <Route path={ CheckoutRoutePath.Confirmation } element={<Confirmation />} />
        {/* In React Router V6 <Route path> and <Link to> are relative */}
        <Route path="/" element={<Delivery />} />
      </Routes>
  );
}