import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
function PriceMinMax() {
   return (
     <div>
       <Typography variant="body" gutterBottom>
          Price
       </Typography>
       <Stack direction="column">
         <input placeholder="Min" type="text" name="min" id="min" />
         <Typography variant="h6" gutterBottom margin="normal">
          to
       </Typography>
       <input type="text" placeholder="Max" name="max" id="max" />
       <Button variant="outlined">Filter</Button>
       </Stack>
     </div>
   )
 }
 
 export default PriceMinMax