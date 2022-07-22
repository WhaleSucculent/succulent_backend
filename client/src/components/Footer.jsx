import { Box, Container, Grid, Link } from "@mui/material";
import React from "react";
import {Colors} from '../pages/ProductDetailPage/Themes';

function Footer() {
  return (
    <Box bgcolor={Colors.primary} color="black">
      <Container maxWidth="25px">
        <Grid container padding={10}>
          <Grid item xs={12} sm={4}>
            <Box>
              <Link href="/" color="inherit" fontWeight="bold" fontSize="25px">
                Contact Us
              </Link>
            </Box>
            <Box>
              <p> 774 Gordon Baker Rd</p>
              <p>North York, ON M2H 3B4</p>
              <p>info@whalesucculent.ca</p>
              <p>originalmallard5454@gmail.com</p>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box>
              <Link href="/" color="inherit" fontWeight="bold" fontSize="25px">
                Store Hours
              </Link>
            </Box>
            <Box>
              <p>Mon-Friday : 1pm-6pm</p>
              <p>Sat : 2pm-6pm</p>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box>
              <Link href="/" color="inherit" fontWeight="bold" fontSize="25px">
                Our Services
              </Link>
            </Box>
            <Box>
              <p>Shipping & Return</p>
              <p>Privacy Policy</p>
              <p>Terms of Condition</p>
            </Box>
          </Grid>
        </Grid>
        <Box textAlign="center" pt={{ xs: 5, sm: 2 }} pb={{ xs: 5, sm: 5 }}>
          Whale Succulent &reg; 2022
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
