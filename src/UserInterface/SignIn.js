import React ,{useState} from 'react'
import { makeStyles } from "@material-ui/core"
import {Grid,TextField,Button} from "@mui/material"
import GoogleIcon from '@mui/icons-material/Google';
import {postData} from "../FetchNodeServer"
import FacebookIcon from '@mui/icons-material/Facebook';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useNavigate} from "react-router-dom"
const useStyles = makeStyles({
  root:
  {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    height: '100vh'
  },
  subdiv: {
    width:"60%",
    display: 'flex',
    backgroundColor: '#fff',
    boxShadow: '5px 5px 8px 5px #888888',
    borderRadius: 15
  }
})

export default function SignIn() {
  var theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileno,setMobileno]=useState()
  const navigate=useNavigate()
  const classes = useStyles()

  const handleVerify=async()=>{
    const result=await postData('users/checkmobile',{mobileno:mobileno})
    if(result.result){
    }
    else{
      navigate("/signup",{state:{mobileno:mobileno}})
      // alert('hii')
    }
  }
  return (
    <div className={classes.root}>
      <div className={classes.subdiv}>
        <Grid style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Grid container spacing={2}>
            
              <Grid item xs={6} sm={6}>
                <img src='/login.png' style={ {display:"flex",justifyContent:"center",alignItems:"center",width:"90%",margin:10}}/>
              </Grid>
              <Grid item xs={6} sm={4} style={{padding:20,marginTop:50}}>
               <span  style={{fontWeight:'bolder',fontSize:35}}>Signin/Signup</span>
               <div style={{paddingTop:20}}>Sign up or Sign in to access your orders, special offers, health tips and more!</div>

               <div style={{paddingTop:40,color:'#000',textTransform:'uppercase'}}>
                 Phone Number
               </div>
               <div style={{display:'flex',fontWeight:'bolder'}}>
                <span style={{display:'flex',paddingTop:20}}> +91 | </span>
                 <div style={{ marginLeft:'5px',display:'flex',flexDirection:'row'}}><TextField onChange={(e)=>setMobileno(e.target.value)}   label="Enter your number" variant="standard" /></div>
               </div>
               <div>
               <Button style={{background:"#000",color:'#fff',fontWeight:'bold',width:300,marginTop:20}} variant="contained" component="span" onClick={()=>handleVerify()} >Verify</Button>
               </div>

               <div style={{display:'flex',margin:30}}>
                 <span style={{border:'2px solid black',padding:5}}>
               <GoogleIcon/>  Google
                 </span>
                 <span style={{border:'2px solid black',padding:5,marginLeft:25}}>
               <FacebookIcon/> Facebook
                 </span>
               </div>

              </Grid>
            
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
