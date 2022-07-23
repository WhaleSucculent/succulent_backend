import { combineReducers } from '@reduxjs/toolkit';
import { RootState } from './root-state.interface';
import { checkoutSlice } from '../pages/CheckoutPage/store/checkout.slice';


export const rootReducer = combineReducers<RootState>({
  checkout: checkoutSlice.reducer,
});