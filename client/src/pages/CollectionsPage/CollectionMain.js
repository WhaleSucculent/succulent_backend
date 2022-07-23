import { grid, styled } from '@mui/system';
import img1 from "../../assets/images/1.jpg"
import Typography from "@mui/material/Typography";
function CollectionMain() {
const Container = styled("div")(() =>({
   backgroundColor: '#7e7d82',
   display: 'flex',
   flexDirection: 'row',
   justifyContent:'center',
   alignItems:'center',
   height:'100%',
   width:'100%',

}));

const Wrapper = styled("div")(({theme}) =>({
   padding:'2em',
   backgroundColor:'#fff',
   display:'grid',
   border: '1px solid pink',
   alignItems:'center',
   justifyContent:'center',
   
   gridTemplateColumns:'repeat(3, 1fr)',
   columnGap:'1em',
   gridTemplateRows:'auto',
   [theme.breakpoints.down('md')]:{
      gridTemplateRows: 'repeat(3, 1fr)',
      gridTemplateColumns: 'auto',
      rowGap:'1em',
   }

   
}));
const Card = styled("div")(({theme}) =>({

   overflow:'hidden',
   "&:hover":{
      transform: 'scale(1.3)',
   },
   img:{
	transform: 'scale(1)',
	transition: '.3s ease-in-out',      }
}));

  return (
    <div>
      <Container>
         <Wrapper>
            <div className = "card1">
               <Typography variant="h4">
                  Succulents
                  </Typography>
                  <Card>
                     <img src={img1} alt="succulents" />
                  </Card>

            </div>
            <div className = "card2">
            <Typography variant="h4">
                  Pots
                  </Typography>
               <img src={img1} alt=""/>
            </div><div className = "card3">
            <Typography variant="h4">
                  Soil
                  </Typography>
               <img src={img1} alt=""/>
            </div>
         </Wrapper>
      </Container>
    </div>
  )
}

export default CollectionMain