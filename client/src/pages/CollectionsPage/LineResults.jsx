import Stack from '@mui/material/Stack';
import SortBy from './SortBy';
import SearchIcon from '@mui/icons-material/Search';
import Typography from "@mui/material/Typography";
import {useState} from 'react';
import TextField from '@mui/material/TextField';
import { styled } from "@mui/material/styles";
import {InputBase} from '@mui/material';


function LineResults({length}) {

   const Center = styled("div")(()=>({
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   }));

   const Search = styled("div")(({ theme }) => ({
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      justifyContent: "space-between",
   
      backgroundColor: "#f0f0f0",
      color: "black",
   
      marginRight: 10,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    }));
   
    const SearchIconWrapper = styled("div")(({ theme }) => ({
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "black",
    }));
    const StyledInputBase = styled(InputBase)(({ theme }) => ({
      color: "black",
      "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        //   border: 'solid 1px',
        borderRadius: "5px",
   
        [theme.breakpoints.up("sm")]: {
          width: "12ch",
          "&:focus": {
            width: "20ch",
          },
        },
      },
    }));


   const [search, setSearch] = useState('');
  return (
   
    <div>
      <Stack direction="row" alignItem="center" justifyContent="space-between">
      <Center>
      <Typography variant="body" gutterBottom>{length} Results</Typography>
      </Center>

                    
         <Center>
            <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
  
          </Center>
         <Center>
             <span>Sort By:</span>
             <SortBy />
         </Center>

         
      </Stack>
    </div>
  )
}

export default LineResults