import  React,{useState} from "react"
import axios from "axios";
import Name from '../images/name-adornment.svg'
import {InputAdornment} from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import {TextField} from "@mui/material";
import validate from '../components/ui/validate'
import {Button} from "@mui/material";
import { Grid } from "@mui/material";
import {Typography} from "@mui/material";
import address from '../images/address.svg'
import phone from '../images/phone-adornment.svg'
import PhoneAdornment from '../images/phone-adornment.js'
import Email from '../images/email-adornment.js'
import send from '../images/send.svg'
import Layout from "../components/ui/Layout"

function Contact()  {
  const [isHovering, setIsHovering] = useState(false);
  const [errors, setErrors] = useState({});
  const matchesMd=useMediaQuery(theme=>theme.breakpoints.down('md'))
  const matchesXS=useMediaQuery(theme=>theme.breakpoints.down('sm'))
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  const [values,setValues]=useState({name:'',email:'',phone:'',message:''});
  const fields={
    name:{
      helperText:'You must enter a name',
      placeholder:"Devil",
      adornment: <img src={Name} alt='Name'/>
    }
    ,email:{
      helperText:'Invalid Email',
      placeholder:"xyz@gmail.com",
      adornment: (<div style={{width:'2rem',height:'2rem'}}><Email/></div>)
    },phone:{
      helperText:'Invalid Phone No',
      placeholder:"9998887766",
      adornment: (<div style={{width:'2rem',height:'2rem'}}>  <PhoneAdornment/></div>)
    },message:{
      helperText:'You must enter a message',
      placeholder:"Message",
      adornment:null
    }
  }
  const handleSubmit = (e) => {
    
    axios.post('https://mail-sender-2mkn.onrender.com/mail', {
        email:"message.reciever1609@gmail.com",
        subject:`${values.email} ${values.phone}`,
        message:`<html>${values.message}</html>`
    },{headers:{
      'Content-Type':'application/json',
      'Accept':'application/json'
    }}).then(response => {
        console.log('SUCCESS!', response);
      }, error => {
        console.log('FAILED...', error);
      });
  }

return(  <Layout>
    <Grid container justifyContent='space-around' alignItems='center' style={{backgroundColor:"#1e90ff",height:matchesMd?'90rem':'40rem',marginBottom :matchesMd?null:'10rem',marginTop:matchesMd?'8rem':null}}
    direction={matchesMd?'column':'row'}>
      <Grid item style={{height:matchesMd?'50%':'100%',marginTop:matchesXS?'3rem':matchesMd?'-10rem':null}}>
      <Grid container direction='column' justifyContent='space-between' style={{height:'100%'}} alignItems='center'>
        <Grid item style={{backgroundColor:"#0f5191",height:'8rem',width:matchesXS?'20rem':'25rem'
         ,display:'flex',justifyContent:'center',alignItems:'center',marginTop:matchesXS?'-14rem':'-4rem'}}>
      <Typography variant='h4'>Contact Us</Typography>
        </Grid>
        <Grid item>
        <Grid container direction='column'>
         {Object.keys(fields).map(field=>{
          const validateHelper=(event)=>{
            const valid=validate({[field]:event.target.value});
              setErrors({...errors,[field]:!valid[field]})
          }
          return(
            <Grid item>
            <TextField label={field.charAt(0).toUpperCase() + field.slice(1)} 
            onChange={e=>{
              if(errors[field]){
                validateHelper(e)
            } setValues({...values,[field]:e.target.value})}} 
              color="primary" placeholder={fields[field].placeholder}
            onBlur={e=>validateHelper(e)}
            error={errors[field]} helperText={errors[field]&&fields[field].helperText}
            InputProps={{endAdornment:(<InputAdornment position='end'>
              {fields[field].adornment}
            </InputAdornment>)}}
             value={values[field]} multiline={field==='message'} rows={field==='message'?3:undefined}  style={{width:matchesXS?'20rem':'30rem',marginBottom:'1rem',backgroundColor:'#FFF'}} id="filled-basic"  variant="filled"/>
              </Grid>
          )
         })
}
          </Grid>  
      </Grid>
      <Grid item   onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleSubmit}
      disabled={Object.keys(errors).some(error=>errors[error]===true)||Object.keys(errors).length!==4} component={Button}  style={{backgroundColor:isHovering ? '#364b36':(Object.keys(errors).some(error=>errors[error]===true)||Object.keys(errors).length!==4)?"#7c7c7c":"#0f5191",borderRadius:0,height:'8rem',width:matchesXS?'20rem':'25rem'
    ,display:'flex',justifyContent:'center',alignItems:'center',marginBottom:matchesXS?'2rem':'-4rem',textTransform:'none'
    }}>
        <Typography variant='h4'>
          Send Message
        </Typography>
        <img src={send} style={{marginLeft:'2rem',marginTop:'0.5rem'}} alt='send message'/>
      </Grid>
      </Grid>
      </Grid>
      <Grid item>
        <Grid container direction='column' style={{height:'15rem'}} justifyContent='space-between'>
          <Grid item container alignItems='center'>
            <Grid item style={{borderRight:'3px solid #fff'}}>
            <img src={address} alt='address' style={{width:'3rem',height:'3rem' ,marginRight:matchesXS?'1rem':'2rem'}}/>
            </Grid>
            <Grid item style={{marginLeft:'1rem'}}>
              <Typography variant='h2' component="a" href='https://goo.gl/maps/csBtoMbn8aRPqMWGA'
              style={{
                fontSize:matchesXS?'0.9rem':matchesMd?'1.25rem':'1.5rem'
              }}>
                A-5 Darshan Complex ,Ghatlodiya Ahmedabad
              </Typography>
            </Grid>
          </Grid>
          <Grid item container  alignItems='center' style={{borderTop:'2px solid #fff',borderBottom:'2px solid #fff',padding :'1.25rem 0'}}>
            <Grid item style={{borderRight:'3px solid #fff'}} >
            <img src={phone} alt='phone' style={{width:'3rem',height:'3rem',marginRight:matchesXS?'1rem':'2rem'}}/>
            </Grid>
            <Grid item style={{marginLeft:'1rem'}}>
              <Typography  component='a' href='tel:(+91) 9157832159'
              variant='h2'  style={{
                fontSize:matchesXS?'0.9rem':matchesMd?'1.25rem':'1.5rem'
              }}>
                (+91) 9157832159
              </Typography>
            </Grid>
          </Grid>
          <Grid item container  alignItems='center'>
            <Grid item  style={{borderRight:'3px solid #fff'}}>
              <div style={{width:'3rem',height:'2.25rem',marginRight:matchesXS?'1rem':'2rem'}}>
              <Email color='#fff'/>
              </div>
            </Grid>
            <Grid item style={{marginLeft:'1rem'}}>
              <Typography variant='h2'  component='a' href='mailto:varx4coder@gmail.com'
              style={{fontSize:matchesXS?'0.9rem':matchesMd?'1.25rem':'1.5rem'}}>
                varx4coder@gmail.com
              </Typography>
            </Grid>
          </Grid>
      </Grid>
      </Grid>
    </Grid>
  </Layout>
)}

export default Contact;
