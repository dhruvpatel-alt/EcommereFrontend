import { createTheme } from '@mui/material/styles';
const grey="#747474"
const green="#1e90ff";
const offBlack="#2A363B";
const red="#E84A5F";
const lightRed="#FF847C";
const tan="#FECEA8";
const darkgreen="#0f5191";

const Theme=createTheme({
    palette: {
        primary: {main:green},
        secondary:{main:darkgreen},
        common:{
            tan:tan,
            lightRed:lightRed,
            red:red,
            offBlack:offBlack,
            white:'#fff'
        }
      },
      typography:{
        h1:{
            fontSize:"3rem",
            fontWeight:700,
            fontStyle:"italic",
            fontFamily:'-apple-system ,BlinkMacSystemFont,Segoe UI, Roboto, Oxygen,Ubuntu, Cantarell, Fira Sans,Droid Sans,Helvetica Neue, sans-serif',
            color:green
        },
        h2:{
            fontFamily:'-apple-system ,BlinkMacSystemFont,Segoe UI, Roboto, Oxygen,Ubuntu, Cantarell, Fira Sans,Droid Sans,Helvetica Neue, sans-serif',
            fontSize:"3rem",
            fontWeight:500 ,
            color:"#fff"    
        },
        h3:{
            fontFamily:'-apple-system ,BlinkMacSystemFont,Segoe UI, Roboto, Oxygen,Ubuntu, Cantarell, Fira Sans,Droid Sans,Helvetica Neue, sans-serif',            fontSize:"2rem",
            fontWeight:300,
            color:green
        },
        h4:{
            fontSize:"3rem",
            color:"#fff"   , 
            fontWeight:700,
            fontFamily:'-apple-system ,BlinkMacSystemFont,Segoe UI, Roboto, Oxygen,Ubuntu, Cantarell, Fira Sans,Droid Sans,Helvetica Neue, sans-serif',
            fontStyle:"italic"
        },
        h5:{
            fontSize:"2rem",
            color:"#fff"   , 
            fontWeight:700,
            fontFamily:'-apple-system ,BlinkMacSystemFont,Segoe UI, Roboto, Oxygen,Ubuntu, Cantarell, Fira Sans,Droid Sans,Helvetica Neue, sans-serif',
            fontStyle:"italic"
        },
        body1:{
            fontFamily:'-apple-system ,BlinkMacSystemFont,Segoe UI, Roboto, Oxygen,Ubuntu, Cantarell, Fira Sans,Droid Sans,Helvetica Neue, sans-serif',
            color:grey,
            fontSize:"1rem"
        },
        body2:{
            fontFamily:"Montserrat",
            color:grey,
            fontSize:"2rem"
        }
      },
});

export default Theme