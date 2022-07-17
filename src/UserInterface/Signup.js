import React,{useState} from 'react'
import { makeStyles, TextField } from '@material-ui/core'
import { Grid,Button } from "@mui/material"
import OTPInput, { ResendOTP } from "otp-input-react"


const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    height: '100vh'
  },
  subdiv: {
    display: 'flex',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#fff',
    width:'70%',
    boxShadow: '5px 5px 8px 5px #888888'

  }
})


export default function Signup() {
  const classes = useStyles()
  const [OTP, setOTP] = useState("");
  
  return (
    <div className={classes.root}>
      <div className={classes.subdiv}>
        <Grid style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Grid container spacing={2}>

            <Grid item xs={6}>
              <img src='/login.png' style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "90%", margin: 10 }} />
            </Grid>
            <Grid item xs={6} style={{ padding: 20, marginTop: 50 }}>
              <span style={{ fontWeight: 'bolder', fontSize: 30}}>Create Account</span>
              <div>
                <TextField label="Enter Your Email Id" variant='standard'/>
              </div>
              <div>
                <TextField label="Enter Your First Name" variant='standard'/>
              </div>
              <div>
                <TextField label="Enter Your Last Name" variant='standard'/>
              </div>
              
              <span style={{fontSize:'small',color:'#000',fontWeight:'bold'}}>Verifying Number</span>
              <div>we have to sent 6 digit OTP on <span style={{fontWeight:'bolder'}}>+91-7610279025</span>
              {/* <span style={{color:'red',display:'flex',justfyContent:'right',alignItems:'right'}}>change</span> */}
              </div>
              <div>
             
              <OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false} secure />
              </div>
              <div>waiting for OTP  </div>
              <div><Button style={{background:"#000",color:'#fff',fontWeight:'bold',width:300,marginTop:20}} variant="contained" component="span" >Verify</Button></div>
            </Grid>
          </Grid>
        </Grid>

      </div>
    </div>
  )
}
