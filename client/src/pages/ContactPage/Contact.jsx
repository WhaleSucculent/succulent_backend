
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Button, ButtonBase, Card, CardContent, Container, Grid, TextField, Typography } from '@mui/material';
import {toast} from "react-toastify";
import map from "assets/images/map.png";

function Contact() {
    const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('service_1eqyvl2', 'template_lxget4c', form.current, 'hWUlNzsQ_5NWXakPg')
        .then((result) => {
            console.log(result.text);
            toast.success(`Your message has been sent successfully!`,{
                position:"bottom-left"
              });

        }, (error) => {
            console.log(error.text);
            toast.error(`Oops... something went wrong.`,{
                position:"bottom-left"
              });
        });
    };
  return (
    
  <div>
    <Typography variant='h4' align='center' style={{fontFamily: "monospace"}}>
        Contact Us 
  </Typography>
   
        <Card  style={{maxWidth:550 ,margin:"0 auto",padding:"20px 5px"}}>
            <CardContent>
                {/* <Typography gutterBottom variant='h5' style={{fontFamily: "monospace"}}>Contact Us</Typography> */}
                <Typography variant='body1' component="p" style={{fontFamily: "monospace"}}>Send us an email,we will get back to you within 24 hours.</Typography>
            <form ref={form} onSubmit={sendEmail}>
        <Grid container spacing={1}  justifyContent="center" alignItems="center">

            <Grid  xs={10} sm={5} item>
                <TextField label="First Name" placeholder='Enter first name' name="from_firstname" fullWidth/>
 
            </Grid>
            <Grid  xs={10} sm={5} item>
                <TextField label="Last Name" placeholder='Enter last name' name="from_lastname" fullWidth/>
 
            </Grid>
            <Grid item xs={10} >
                <TextField type="email" label="Email" placeholder='Enter Email address'name="user_email" fullWidth required/>
 
            </Grid>
            <Grid item xs={10} >
                <TextField label="Message" multiline rows={5} placeholder='Enter message here' name="message" fullWidth required/>
 
            </Grid>
           
            <Grid xs={10} item>
                <Button type="submit" variant="contained" size='large' value="Send" fullWidth>Submit</Button>
               
            </Grid>
          

                </Grid>
              </form>
             </CardContent>
             
         </Card>
         <br/>
         <Typography gutterBottom variant='h4'  style={{fontFamily: "monospace"}} >Come visit us at our store</Typography>
         <div>
         <Card   style={{maxWidth:750 , maxHeight:750, margin:"30px auto",padding:"20px 5px"}}>
            <CardContent>
         <Grid container spacing={1} justifyContent="center" alignItems="center">
        
         <Grid item>
          <ButtonBase sx={{ width: 228, height: 228 }}>
            <img alt="complex" src={map} />
          </ButtonBase>
        </Grid>
        </Grid>
        </CardContent>
         </Card>
         </div>
   
    </div>
       /* <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="from_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />

    </form> */
  )
}

export default Contact