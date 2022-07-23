import { styled } from '@mui/system';

const useStyles = styled(theme => ({
   lineStyle:{
      height: '2vw',
      backgroundColor: 'rgba(130, 170, 182, 255)',
      padding:'2em'
   },
   gridContainer: {
      display: 'flex',
      alignItems: 'center',
      margin:'1em'
   },
   searchInput: {
      border: 'none',
      padding:'.5em .3em',
      backgroundColor: 'rgba(130, 170, 182, 0)',
      margin: '0',
   },
   searchBar: {
      display:'flex',
      justifyContent:'space-between',
      alignItems:'center',
      backgroundColor:'#15588c',
      borderRadius:'5px',
      border:'rgba(130,170,182,0.5) solid 1px'
   },
   searchIcon: {
      margin:'0',
   }


}));

export default useStyles;
