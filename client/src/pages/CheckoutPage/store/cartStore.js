import { configureStore } from "@reduxjs/toolkit";
import cartSlice, { getTotals } from "../features/cartSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
});

store.dispatch(getTotals());

export default store.getState(); 