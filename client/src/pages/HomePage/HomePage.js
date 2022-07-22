import React from "react";
import Carousel from "./Carousel";
import { GET_PRODUCTS } from "../../queries/productQueries";
import { useQuery } from "@apollo/client";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import ProductCard from "components/ProductCard";
import { Container } from "@mui/system";
import Grid from '@mui/material/Grid';
import { Height } from "@mui/icons-material";
import { Typography } from "@mui/material";
import Promotion from "components/Promotion";

function Item(props) {
  const { sx, ...other } = props;
  return (
    <>
      <Box
        sx={{
          p: 1,
          m: 1,
          borderRadius: 2,
          fontSize: "0.875rem",
          fontWeight: "700",
          ...sx,
        }}
        {...other}
      />
    </>
  );
}

Item.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

const HomePage = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <div>
      <Carousel />
      <Typography>
        Featured Products
       
      </Typography>
      <Container>
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", Height:"20px"}}>
          {!loading &&
            !error &&
            data.products.map((product) => (
              <Grid container spacing={2} columns={12}>
              <Item xs ={4} lg={3}>
                <ProductCard key={product.id} product={product} />
              </Item>
              </Grid>
            ))}
           
        </Box>
       
      </Container>
      <Promotion/>
    </div>
    
  );
};

export default HomePage;
