import { GET_PRODUCTS } from "../../queries/productQueries";
import { useQuery } from "@apollo/client";
import OnlyInStock from './OnlyInStock';
import Grid from '@mui/material/Grid';
import ProductCard from "components/ProductCard";
import PaginationComp from './PaginationComp';
import LineStrip from './LineStrip';
import PriceMinMax from './PriceMinMax';
import SortBy from "./SortBy";
import Stack from '@mui/material/Stack';
import LineResults from "./LineResults";
import CollectionSidebar from './CollectionSidebar';
import CollectionMain from "./CollectionMain";
const CollectionsPage = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
        <LineStrip />
        </Grid>
        
      </Grid>
      
      <Grid container spacing={3}>
        <Grid item md={2}>
          <CollectionSidebar />
        </Grid>

          <Grid item md={10}>
          <Grid container spacing={3}>
        <Grid item xs={12}>
        <LineResults length={data.products.length}/>
        </Grid>
        
      </Grid>
          <Grid container spacing={3}>
          {!loading &&
            !error &&
            data.products.map((product) => (
             <Grid item xs={12} sm={6} md={4} key={product.id}>
                <ProductCard key={product.id} product={product} />
             </Grid>

            ))}
            </Grid>
          </Grid>
          
     </Grid>
    <Stack direction="row" justifyContent="space-between"
  alignItems="center" sx={{marginLeft:'50%', transform:'translateX(-20%)'}}>
    <PaginationComp />
    </Stack>
      <CollectionMain />

    </div>
  );
};

export default CollectionsPage;
