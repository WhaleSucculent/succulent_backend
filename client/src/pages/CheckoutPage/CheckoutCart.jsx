import React, { useEffect } from "react";
import {
  TableContainer,
  Container,
  Card,
  Grid,
  Typography,
  TableHead,
  Slide,
  Select,
  MenuItem,
  Button,
  ButtonGroup,
  List,
  ListItem,
} from "@mui/material";
import Divider from '@mui/material/Divider';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import ClearIcon from "@mui/icons-material/Clear";
import { ORDER_DETAILS } from "../../queries/orderDetails";
import { useQuery } from "@apollo/client";
import {useDispatch, useSelector } from "react-redux";
import { addToMyCart, decreaseCartQty, getTotals, removeFromCart } from "./features/cartSlice";
import {} from "react-router-dom";
import Link from "components/Link";


function CheckoutCart() {

const cart= useSelector((state)=>state.cart);
const dispatch = useDispatch()
useEffect(()=>{
dispatch(getTotals());
},[cart,dispatch])

const handleRemoveFromCart =(cartItem)=>{
  dispatch(removeFromCart(cartItem));
}
const handleDecreaseCartQty  =(cartItem)=>{
  dispatch(decreaseCartQty(cartItem))
}
const handleIncreaseCartQty  =(cartItem)=>{
  dispatch(addToMyCart(cartItem))
}

  // //loading data from database
  // const { loading, error,data } = useQuery(ORDER_DETAILS);
  // console.log(data);
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Something went wrong</p>;


  return (
    <div>
       {/* here is shopping cart titlebar */}
      <div>
        <Container
          maxWidth="sm"
          margin="20px,0px"
          display="flex"
          flex-direction="column"
        >
          <Typography
            variant="h4"
            align="center"
            color="textPrimary"
            margin="30px"
          >
            Shopping Cart
          </Typography>
        </Container>
      </div>


{/*  shopping cartitem displays here*/}
<div>            
    {/* if cartItem.lendth ==0 display continue shopping page */}
  {cart.cartItems.length === 0 ?(
     <Grid container spacing={1}  justifyContent="center"
     alignItems="center"  padding={30}>
              <div className="cart-empty">
              <b>your cart feels Sad and Empty <SentimentVeryDissatisfiedIcon/></b>
              <div>
              <div className="start-shopping">

           
              <Link to="/" underline="none">
              <Button variant="contained" size="large"> Start Shopping Now</Button>
 
</Link>
</div>
              </div>
              </div>
              </Grid>
            ):(  
              // if cartItem is not ==0, display shopping cart items.
      <React.Fragment>
        <Slide direction="up" in={true}>
          <Grid container spacing={1}>
            <Grid item md={9} container spacing={1}>
              <TableContainer>
                <Table aria-label="oreders">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" size="small">
                        {" "}
                        Item
                      </TableCell>
                      <TableCell align="center"> Quantity</TableCell>
                      <TableCell align="center"> Price</TableCell>
                      <TableCell align="center"> Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {cart.cartItems?.map((cartItem) => (
                      <TableRow key={cartItem.name}>
                        <TableCell component="th" scope="row" align="center">
                          <img src={cartItem.image[0].imageLink} width={200} height={200} />
                          <br></br>
                          <b size='large'>{cartItem.name}</b>
                        </TableCell>
                        <TableCell align="center">
                        
                     
                        <Button onClick={()=> handleDecreaseCartQty(cartItem)}>-</Button>
                        <div>
                        <p className="count">{cartItem.cartQty}</p>
                        </div>
                        <Button onClick={()=> handleIncreaseCartQty(cartItem)}>+</Button>
                    
                        </TableCell>
                        <TableCell align="center">
                         $ {cartItem.priceList[0].price}
                        </TableCell>
                        <TableCell align="center">
                          <Button onClick={()=>handleRemoveFromCart(cartItem)}>
                            <ClearIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item md={3} xs={12}>
      {/* here display the Subtotal card on the side */}
              <Card>
                <List>
                  <ListItem>
                    <Grid container>
                      <Typography variant="h6" fontSize="20px">
                        <b>Subtotal:</b>
                        <Typography>
                        <span>${cart.cartTotalAmount}</span>
                        </Typography>
                       
                      </Typography>
                     
                    </Grid>
                  </ListItem>
                  <ListItem>
                  <Typography variant="h6" fontSize="20px">
                        <b>Duties & Taxes: </b>
                        <Typography>
                        <span>${cart.cartTotalAmount*0.05}</span>
                        </Typography>
                       
                        
                 
                      </Typography>
                  </ListItem>
                  <ListItem>
                  <Typography variant="h6" fontSize="20px">
                        <b>Shipping:</b>
                        <Typography>
                        <p>To be calculated...</p>
                        </Typography>
                     
                      </Typography>
                  </ListItem>
                  <Divider />
                  <ListItem>
                  <Typography variant="h6" textAlign="left" fontWeight="bold" fontSize="25px">
                        <b>Total:</b>
                        <Typography textAlign="right" fontWeight="bold" fontSize="25px">
                       ${cart.cartTotalAmount*1.05}
                        </Typography>
                       
                        
                 
                      </Typography>
                  </ListItem>
                  <ListItem>
               
                    <Button
                    href="checkout"
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                  
                    >
                      Check Out
                    </Button>
                
                  </ListItem>
                  <ListItem>
               
                    <Button
                      href="/"
                      variant="outlined"
                      fullWidth
                      color="primary"
                      size="large"
                    >
                      Continue Shopping
                    </Button>
                 
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
        </Slide>
      </React.Fragment>
      )}
      </div>
    </div>
  );
}




export default CheckoutCart;
