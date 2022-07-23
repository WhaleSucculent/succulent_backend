import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import {Typography,Button} from "@mui/material";

function Promotion() {

    
    const item = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      px: 5,
    };
    
    const number = {
      fontSize: 24,
      fontFamily: 'default',
      color: 'secondary.main',
      fontWeight: 'medium',
    };
    
    const image = {
      height: 55,
      my: 4,
    };
    
  
      return (
        <Box 
   
          component="section"
          sx={{ display: 'flex', bgcolor: '#FFF0F5', overflow: 'hidden' }}
        >
          <Container
         
            sx={{
              mt: 10,
              mb: 15,
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              component="img"
              //src="https://images.unsplash.com/photo-1511184150666-9bb7d41a88f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80"
              alt="curvy lines"
              sx={{
                pointerEvents: 'none',
                position: 'absolute',
                top: -180,
                opacity: 0.7,
              }}
            />
            <Typography variant="h4" marked="center" component="h2" sx={{ mb: 14 }} fontFamily= "monospace">
           Keep Going, Keep Growing
            </Typography>
            <div>
              <Grid container spacing={5}>
                <Grid item xs={12} md={4}>
                  <Box sx={item}>
                    <Box sx={number}>1.</Box>
                    <Box
                      component="img"
                      src="https://cdn-icons-png.flaticon.com/512/1831/1831669.png"
                      alt="suitcase"
                      sx={image}
                    />
                    <Typography variant="h5" align="center" fontFamily= "monospace">
                      Over 20 products at our best value.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={item}>
                    <Box sx={number}>2.</Box>
                    <Box
                      component="img"
                      src="https://cdn-icons-png.flaticon.com/512/1581/1581725.png"
                      alt="graph"
                      sx={image}
                    />
                    <Typography variant="h5" align="center" fontFamily= "monospace">
                      Find your new favorite as simple as one click.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={item}>
                    <Box sx={number}>3.</Box>
                    <Box
                      component="img"
                      src="https://cdn-icons.flaticon.com/png/512/2839/premium/2839191.png?token=exp=1658295863~hmac=deb815eac075455d17c320d7318f4319"
                      alt="clock"
                      sx={image}
                    />
                    <Typography variant="h5" align="center" fontFamily= "monospace">
                      {'New offers every week. New experiences, new surprises. '}
                     
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </div>
            <Button
              color="secondary"
              size="large"
              variant="contained"
              component="a"
              href="/premium-themes/onepirate/sign-up/"
              sx={{ mt: 8 }}
            >
              Get started
            </Button>
          </Container>
        </Box>
      );
    }
    
   

export default Promotion;
