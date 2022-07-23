import { createSlice } from "@reduxjs/toolkit";
import { parse } from "graphql";
import {toast} from "react-toastify";

 

const cartSlice = createSlice({
  name: "cart",
  initialState:{
    cartItems: localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")):[],
    cartTotalAmount:0,
    cartTotalQty:0
  },
  reducers: {
    addToMyCart(state, action) {

      const itemIndex = state.cartItems.findIndex(
        (item) => item.id=== action.payload.id);

        if(itemIndex >=0){
          state.cartItems[itemIndex].cartQty +=1;
          toast.info(`Increased ${action.payload.name} quantity.`,{
            position:"bottom-left"
          });
        }
        else{
          const tempProduct ={...action.payload,cartQty:1};
          state.cartItems.push(tempProduct);
          toast.success(`${action.payload.name} added successfully!`,{
            position:"bottom-left"
          });

        }

      localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
    },

    removeFromCart(state,action){
      const nextCartItems = state.cartItems.filter(
        cartItem => cartItem.id !== action.payload.id
      )

      state.cartItems =nextCartItems;
      localStorage.setItem("cartItems",JSON.stringify(state.cartItems));

      toast.error(`${action.payload.name} has removed from your cart.`,{
        position:"bottom-left"
      });

    },
    decreaseCartQty(state,action){
      const itemIndex = state.cartItems.findIndex(
        cartItem =>cartItem.id === action.payload.id
      )

      if(state.cartItems[itemIndex].cartQty > 1){
        state.cartItems[itemIndex].cartQty -=1


        toast.info(`Decreased ${action.payload.name} cart quantity`,{
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItems",JSON.stringify(state.cartItems));

    },

    getTotals(state,action){
      let {total,quantity}= state.cartItems.reduce(
        (cartTotal,cartItem)=>{
        const price = cartItem.priceList[0].price;
        const {cartQty} = cartItem  
        const itemTotal = price *cartQty;

        cartTotal.total  += itemTotal;
        cartTotal.quantity += cartQty

        return cartTotal
      },{
        total:0,
        quantity:0
      });
      state.cartTotalQty = quantity;
      state.cartTotalAmount = total
      
    }
   
 
   },
});

export const {removeFromCart, addToMyCart,decreaseCartQty,getTotals} = cartSlice.actions;
export default cartSlice.reducer;
