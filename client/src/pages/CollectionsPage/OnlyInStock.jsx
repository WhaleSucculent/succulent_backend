
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Typography } from '@mui/material';

export default function OnlyInStock() {
  return (
    <FormGroup>
      <Typography variant="body" gutterBottom>Availability</Typography>
      <FormControlLabel control={<Switch defaultChecked />} label="Only in Stock" />
      
    </FormGroup>
  );
}