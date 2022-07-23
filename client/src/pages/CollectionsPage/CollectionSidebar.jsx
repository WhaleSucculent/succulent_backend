import Stack from '@mui/material/Stack';
import OnlyInStock from './OnlyInStock';
import PriceMinMax from './PriceMinMax';

function CollectionSidebar() {
  return (
    <Stack direction = "column" alignItems="center" justifyContent="center" sx={{marginTop:'20px'}}>
      <OnlyInStock />
      <hr></hr>
      <PriceMinMax />
    </Stack>
  )
}
export default CollectionSidebar