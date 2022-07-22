import React from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Grid } from '@mui/material';
function PaginationComp() {
  return (
    <>
    <Grid container spacing={3}>
      <Grid item xs={12}>
      <Stack spacing={3}>
        <Pagination count={10} />
        </Stack>
        </Grid>
      
    </Grid>
    
    </>
  )
}

export default PaginationComp