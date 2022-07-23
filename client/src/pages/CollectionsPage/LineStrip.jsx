import SearchIcon from '@mui/icons-material/Search';
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import {useState} from 'react';
import useStyles from './LineStripStyle'

function LineStrip() {
   const classes = useStyles();
   const [search, setSearch] = useState('');
  return (
    <div>
      <div className="container">
         <Stack className={classes.gridContainer} direction="row" alignItem="center" justifyContent="center">
            
         <Typography align='center' variant="h4" gutterBottom sx={{margin:'1.5em 1em'}}>Collection Page</Typography>
        
         </Stack>
         
      </div>
    </div>
  )
}

export default LineStrip